import {
  IAuth,
  IChatMessage,
  IChatResponse,
  ModelEndpoint,
  Models,
} from './type';
import { ChatRequestParameters } from './chatRequestParameters';

export class QianfanClient {
  private apiKey: string;
  private secretKey: string;
  private auth: IAuth;
  private baseURL = 'https://aip.baidubce.com';

  private headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  public async createAuthTokenAsync() {
    const url = `${this.baseURL}/oauth/2.0/token?grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.secretKey}`;
    const resp = await fetch(url, {
      headers: this.headers,
    });
    const data = await resp.json();
    if (resp.status === 200) {
      this.auth = data;
      return data;
    } else {
      throw new Error(JSON.stringify(data));
    }
  }

  async chatAsync(
    model: Models = Models.ERNIE_Bot_turbo,
    messages: IChatMessage[],
    callback: (result: IChatResponse) => void,
    parameters?: ChatRequestParameters,
    abortController?: AbortController
  ) {
    const generator = await this.chatAsStreamAsync(
      model,
      messages,
      parameters,
      abortController
    );
    for await (const message of generator) {
      callback(message);
    }
  }

  async *chatAsStreamAsync(
    model: Models = Models.ERNIE_Bot_turbo,
    messages: IChatMessage[],
    parameters?: ChatRequestParameters,
    abortController?: AbortController
  ): AsyncGenerator<IChatResponse> {
    const { expires_in, access_token } = this.auth || {};
    if (!access_token || expires_in < Date.now() / 1000) {
      await this.createAuthTokenAsync();
    }
    const body = JSON.stringify({
      messages,
      stream: true,
      ...parameters,
    });
    const url = `${this.baseURL}/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${ModelEndpoint[model]}?access_token=${this.auth.access_token}`;

    const resp = await fetch(url, {
      method: 'POST',
      body,
      headers: this.headers,
      signal: abortController?.signal,
    });

    if (resp.status === 200) {
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let line: string;
      let data = await reader.read();
      while ((line = decoder.decode(data.value)) !== null && !data.done) {
        data = await reader.read();
        if (line.startsWith('data: ')) {
          const json = line.slice(6);
          try {
            const result = JSON.parse(json) as IChatResponse;
            yield result;
          } catch (error) {
            throw new Error(`Unable to deserialize ${json}`);
          }
        } else if (line.trim() !== '') {
          throw new Error(line);
        }
      }
    } else {
      throw new Error(JSON.stringify(resp));
    }
  }
}

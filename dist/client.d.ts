import { IChatMessage, IChatResponse, Models } from './type';
import { ChatRequestParameters } from './chatRequestParameters';
export declare class QianfanClient {
    private apiKey;
    private secretKey;
    private auth;
    private baseURL;
    private headers;
    constructor(apiKey: string, secretKey: string);
    createAuthTokenAsync(): Promise<any>;
    chatAsync(model: Models, messages: IChatMessage[], callback: (result: IChatResponse) => void, parameters?: ChatRequestParameters, abortController?: AbortController): Promise<void>;
    chatAsStreamAsync(model: Models, messages: IChatMessage[], parameters?: ChatRequestParameters, abortController?: AbortController): AsyncGenerator<IChatResponse>;
}

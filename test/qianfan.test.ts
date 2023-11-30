import { QianfanClient, ChatMessage, Models } from '../dist/qianfan';

describe('Qianfan test', () => {
  const APIKey = 'cPsWfhoExfBoql9Ej67Gt7Ay';
  const SecretKey = 'o2akz8L7OmF3PTA2tMjytadZa1c4Z4G3';

  let client: QianfanClient;
  beforeAll(() => {
    client = new QianfanClient(APIKey, SecretKey);
  });

  test('Use model ChatGLM2_6B_32K', async () => {
    const messages = [ChatMessage.fromUser('中国第一个皇帝是谁？')];
    const generator = await client.chatAsStreamAsync(
      Models.ChatGLM2_6B_32K,
      messages,
      {
        request_timeout: 60000,
        user_id: 'gy',
      }
    );
    let contents = '';
    for await (const message of generator) {
      contents += message.result;
    }
    expect(contents).toContain('秦始皇');
  });

  test('Use model Qianfan_Chinese_Llama_2_7B', async () => {
    const messages = [
      ChatMessage.fromUser(
        '你叫张三，一名5岁男孩，你在金色摇篮幼儿园上学，你的妈妈叫李四，是一名工程师'
      ),
      ChatMessage.fromAssistant('明白'),
      ChatMessage.fromUser('你好小朋友，我是周老师，你在哪上学？'),
    ];
    const generator = await client.chatAsStreamAsync(
      Models.Qianfan_Chinese_Llama_2_7B,
      messages,
      { request_timeout: 60000 }
    );
    let contents = '';
    for await (const message of generator) {
      contents += message.result;
    }
    expect(contents).toContain('金色摇篮幼儿园');
  });

  test('Use model ChatGLM2_6B_32K callback', async () => {
    const messages = [ChatMessage.fromUser('简单介绍下中国！')];
    let contents = '';
    await client.chatAsync(
      Models.ChatGLM2_6B_32K,
      messages,
      (value) => {
        contents += value.result;
      },
      { request_timeout: 60000 }
    );
    expect(contents).toContain('中国');
  });

  // test('Use abort', async () => {
  //   const messages = [ChatMessage.fromUser('中国第一个皇帝是谁？')];
  //   const abort = new AbortController();
  //   await client.createAuthTokenAsync();
  //   const generator = await client.chatAsStreamAsync(
  //     Models.ChatGLM2_6B_32K,
  //     messages,
  //     {
  //       request_timeout: 60000,
  //       user_id: 'gy',
  //     },
  //     abort
  //   );
  //   abort.abort();
  //   let contents = '';
  //   for await (const message of generator) {
  //     contents += message.result;
  //   }
  //   expect(contents).toContain('');
  // });
});

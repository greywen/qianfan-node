**[简体中文](README.md)** | **English**

`qianfan-node-sdk` is an unofficial open-source project that provides a Node.js SDK for the WenXin QianFan API (https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html). It currently supports all models and versions officially supported by the WenXin QianFan API. The upstream documentation can be found at https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Nlks5zkzu.

This project can be used to develop chatbots and virtual assistants that can interact with users using natural language.

## Features

- Provides a Node.js SDK for the WenXin QianFan API.
- Supports both synchronous and asynchronous communication.
- Implements a streaming API for real-time communication.
- Provides a simple and intuitive API for chatbot development.
- Supports ModelVersion, allowing users to switch between different model versions.

## Installation

```
npm install qianfan-node-sdk
```

## Usage

```typescript
const client = new QianfanClient(APIKey, SecretKey);
```


### Example 1: Chat with a virtual assistant using the streaming API and callbacks (ChatGLM2_6B_32K model)

The following example shows how to chat with a virtual assistant using the `ChatAsync` method:

```typescript
const client = new QianfanClient(APIKey, SecretKey);

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
```

### Example 2: Chat with a virtual assistant using the streaming API (Qianfan_Chinese_Llama_2_7B model)
The following example shows how to chat with a virtual assistant using the `ChatAsStreamAsync` method and the Qianfan_Chinese_Llama_2_7B model along with the streaming API:

```typescript
const client = new QianfanClient(APIKey, SecretKey);

const messages = [
  ChatMessage.fromUser('你叫张三，一名5岁男孩，你在金色摇篮幼儿园上学，你的妈妈叫李四，是一名工程师'),
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
```

## License

qianfan-node-sdk is licensed under the MIT License. Please refer to the [LICENSE.txt](LICENSE.txt) file for more information.

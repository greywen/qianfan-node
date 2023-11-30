**[English](README_EN.md)** | **简体中文**

`qianfan-node-sdk`是一个非官方的开源项目，提供 WenXin QianFan API (https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html) 的 Nodejs SDK。现在已支持用户选择官方所支持版本所有模型。上游文档地址：https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Nlks5zkzu

这个项目可以用来开发能够用自然语言与用户交流的聊天机器人和虚拟助手。

## 功能

- 为 WenXin QianFan API 提供 Nodejs SDK。
- 支持同步和异步通信。
- 实现了流 API，以实现实时通信。
- 为聊天机器人开发提供了简单直观的 API。
- 支持 ModelVersion，允许用户切换不同版本模型。

## 安装

```
npm install qianfan-node-sdk
```

## 使用方法

```typescript
QianfanClient client = new QianfanClient(APIKey, SecretKey);
```

### 示例 1：使用流 API 和回调与虚拟助手聊天（ChatGLM2_6B_32K 模型）

以下示例显示了如何使用 `ChatAsync` 方法与虚拟助手聊天：

```typescript
QianfanClient client = new QianfanClient(APIKey, SecretKey);

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

### 示例 2：使用流 API 与虚拟助手聊天（Qianfan_Chinese_Llama_2_7B 模型）

以下示例显示了如何使用 `ChatAsStreamAsync` 方法和 Qianfan_Chinese_Llama_2_7B 模型以及流 API 与虚拟助手聊天：

```typescript
QianfanClient client = new QianfanClient(APIKey, SecretKey);
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
```

## 许可证

qianfan-node-sdk 遵循 MIT 许可证。 请参阅[LICENSE.txt](LICENSE.txt)文件以获取更多信息。

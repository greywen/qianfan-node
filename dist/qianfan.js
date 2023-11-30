(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.qianfan = {}));
})(this, (function (exports) { 'use strict';

    exports.Models = void 0;
    (function (Models) {
        Models["ERNIE_Bot_4"] = "ERNIE-Bot-4";
        Models["ERNIE_Bot_8K"] = "ERNIE-Bot-8K";
        Models["ERNIE_Bot"] = "ERNIE-Bot";
        Models["ERNIE_Bot_turbo"] = "ERNIE-Bot-turbo";
        Models["BLOOMZ_7B"] = "BLOOMZ-7B";
        Models["Qianfan_BLOOMZ_7B_compressed"] = "Qianfan-BLOOMZ-7B-compressed";
        Models["Llama_2_7b_chat"] = "Llama-2-7b-chat";
        Models["Llama_2_13b_chat"] = "Llama-2-13b-chat";
        Models["Llama_2_70b_chat"] = "Llama-2-70b-chat";
        Models["Qianfan_Chinese_Llama_2_7B"] = "Qianfan-Chinese-Llama-2-7B";
        Models["ChatGLM2_6B_32K"] = "ChatGLM2-6B-32K";
        Models["AquilaChat_7B"] = "AquilaChat-7B";
    })(exports.Models || (exports.Models = {}));
    const ModelEndpoint = {
        [exports.Models.ERNIE_Bot_4]: 'completions_pro',
        [exports.Models.ERNIE_Bot_8K]: 'ernie_bot_8k',
        [exports.Models.ERNIE_Bot]: 'completions',
        [exports.Models.ERNIE_Bot_turbo]: 'eb-instant',
        [exports.Models.BLOOMZ_7B]: 'bloomz_7b1',
        [exports.Models.Qianfan_BLOOMZ_7B_compressed]: 'qianfan_bloomz_7b_compressed',
        [exports.Models.Llama_2_7b_chat]: 'llama_2_7b',
        [exports.Models.Llama_2_13b_chat]: 'llama_2_13b',
        [exports.Models.Llama_2_70b_chat]: 'llama_2_70b',
        [exports.Models.Qianfan_Chinese_Llama_2_7B]: 'qianfan_chinese_llama_2_7b',
        [exports.Models.ChatGLM2_6B_32K]: 'chatglm2_6b_32k',
        [exports.Models.AquilaChat_7B]: 'aquilachat_7b',
    };
    exports.MessageRole = void 0;
    (function (MessageRole) {
        MessageRole["user"] = "user";
        MessageRole["assistant"] = "assistant";
    })(exports.MessageRole || (exports.MessageRole = {}));

    class ChatMessage {
        static fromUser(content) {
            return {
                role: exports.MessageRole.user,
                content,
            };
        }
        static fromAssistant(content) {
            return {
                role: exports.MessageRole.assistant,
                content,
            };
        }
    }

    class QianfanClient {
        apiKey;
        secretKey;
        auth;
        baseURL = 'https://aip.baidubce.com';
        headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        constructor(apiKey, secretKey) {
            this.apiKey = apiKey;
            this.secretKey = secretKey;
        }
        async createAuthTokenAsync() {
            const url = `${this.baseURL}/oauth/2.0/token?grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.secretKey}`;
            const resp = await fetch(url, {
                headers: this.headers,
            });
            const data = await resp.json();
            if (resp.status === 200) {
                this.auth = data;
                return data;
            }
            else {
                throw new Error(JSON.stringify(data));
            }
        }
        async chatAsync(model = exports.Models.ERNIE_Bot_turbo, messages, callback, parameters, abortController) {
            const generator = await this.chatAsStreamAsync(model, messages, parameters, abortController);
            for await (const message of generator) {
                callback(message);
            }
        }
        async *chatAsStreamAsync(model = exports.Models.ERNIE_Bot_turbo, messages, parameters, abortController) {
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
                let line;
                let data = await reader.read();
                while ((line = decoder.decode(data.value)) !== null && !data.done) {
                    data = await reader.read();
                    if (line.startsWith('data: ')) {
                        const json = line.slice(6);
                        try {
                            const result = JSON.parse(json);
                            yield result;
                        }
                        catch (error) {
                            throw new Error(`Unable to deserialize ${json}`);
                        }
                    }
                    else if (line.trim() !== '') {
                        throw new Error(line);
                    }
                }
            }
            else {
                throw new Error(JSON.stringify(resp));
            }
        }
    }

    exports.ChatMessage = ChatMessage;
    exports.QianfanClient = QianfanClient;

}));

export declare enum Models {
    ERNIE_Bot_4 = "ERNIE-Bot-4",
    ERNIE_Bot_8K = "ERNIE-Bot-8K",
    ERNIE_Bot = "ERNIE-Bot",
    ERNIE_Bot_turbo = "ERNIE-Bot-turbo",
    BLOOMZ_7B = "BLOOMZ-7B",
    Qianfan_BLOOMZ_7B_compressed = "Qianfan-BLOOMZ-7B-compressed",
    Llama_2_7b_chat = "Llama-2-7b-chat",
    Llama_2_13b_chat = "Llama-2-13b-chat",
    Llama_2_70b_chat = "Llama-2-70b-chat",
    Qianfan_Chinese_Llama_2_7B = "Qianfan-Chinese-Llama-2-7B",
    ChatGLM2_6B_32K = "ChatGLM2-6B-32K",
    AquilaChat_7B = "AquilaChat-7B"
}
export declare const ModelEndpoint: {
    "ERNIE-Bot-4": string;
    "ERNIE-Bot-8K": string;
    "ERNIE-Bot": string;
    "ERNIE-Bot-turbo": string;
    "BLOOMZ-7B": string;
    "Qianfan-BLOOMZ-7B-compressed": string;
    "Llama-2-7b-chat": string;
    "Llama-2-13b-chat": string;
    "Llama-2-70b-chat": string;
    "Qianfan-Chinese-Llama-2-7B": string;
    "ChatGLM2-6B-32K": string;
    "AquilaChat-7B": string;
};
export declare enum MessageRole {
    user = "user",
    assistant = "assistant"
}
export interface IChatMessage {
    role: MessageRole;
    content: string;
}
export interface IChatResponse {
    id: string;
    object: string;
    created: number;
    sentence_id: number;
    is_end: boolean;
    is_truncated: boolean;
    finish_reason: string;
    search_info: object;
    result: string;
    need_clear_history: boolean;
    ban_round: number;
    usage: IUsage;
}
export interface ISearchInfo {
    is_beset: number;
    rewrite_query: string;
    search_results: any;
}
export interface IUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
export interface IAuth {
    refresh_token: string;
    expires_in: number;
    session_key: string;
    access_token: string;
    scope: string;
    session_secret: string;
}

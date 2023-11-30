export enum Models {
  ERNIE_Bot_4 = 'ERNIE-Bot-4',
  ERNIE_Bot_8K = 'ERNIE-Bot-8K',
  ERNIE_Bot = 'ERNIE-Bot',
  ERNIE_Bot_turbo = 'ERNIE-Bot-turbo',
  BLOOMZ_7B = 'BLOOMZ-7B',
  Qianfan_BLOOMZ_7B_compressed = 'Qianfan-BLOOMZ-7B-compressed',
  Llama_2_7b_chat = 'Llama-2-7b-chat',
  Llama_2_13b_chat = 'Llama-2-13b-chat',
  Llama_2_70b_chat = 'Llama-2-70b-chat',
  Qianfan_Chinese_Llama_2_7B = 'Qianfan-Chinese-Llama-2-7B',
  ChatGLM2_6B_32K = 'ChatGLM2-6B-32K',
  AquilaChat_7B = 'AquilaChat-7B',
}

export const ModelEndpoint = {
  [Models.ERNIE_Bot_4]: 'completions_pro',
  [Models.ERNIE_Bot_8K]: 'ernie_bot_8k',
  [Models.ERNIE_Bot]: 'completions',
  [Models.ERNIE_Bot_turbo]: 'eb-instant',
  [Models.BLOOMZ_7B]: 'bloomz_7b1',
  [Models.Qianfan_BLOOMZ_7B_compressed]: 'qianfan_bloomz_7b_compressed',
  [Models.Llama_2_7b_chat]: 'llama_2_7b',
  [Models.Llama_2_13b_chat]: 'llama_2_13b',
  [Models.Llama_2_70b_chat]: 'llama_2_70b',
  [Models.Qianfan_Chinese_Llama_2_7B]: 'qianfan_chinese_llama_2_7b',
  [Models.ChatGLM2_6B_32K]: 'chatglm2_6b_32k',
  [Models.AquilaChat_7B]: 'aquilachat_7b',
};

export enum MessageRole {
  user = 'user',
  assistant = 'assistant',
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

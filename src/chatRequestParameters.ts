export class ChatRequestParameters {
  constructor(
    public temperature?: number,
    public top_p?: number,
    public penalty_socre?: number,
    public user_id?: string,
    public request_timeout?: number
  ) {
    this.temperature = temperature || 0.8;
    this.top_p = top_p || 0.7;
    this.penalty_socre = penalty_socre || 1;
    this.user_id = user_id || null;
    this.request_timeout = request_timeout || 6000;
  }
}

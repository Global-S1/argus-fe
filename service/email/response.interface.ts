export interface IEmailSuccessResponse {
  success: boolean;
  messages: string;
}

export interface IEmailErrorResponse {
  message: string;
  code: number;
  response: string;
}

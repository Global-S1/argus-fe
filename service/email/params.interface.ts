export interface IEmailParams {
  name: string;
  lastname: string;
  company: string;
  to: string;
  text: string;
}

export interface IEmailAPIParams {
  to: string;
  subject: string;
  userInfo: string;
  argusInfo: string;
}

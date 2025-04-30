export interface IEmailParams {
  to: string
  name: string
  company?: string
  phone?: string
  message?: string
  service?: string
  [key: string]: any
}

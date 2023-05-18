export interface Application {
  email: string
  inn: string
  purchaseNumber: string
  law: string
  type: string
  sum: string
  period: string
  advance: string
  bank: string
  bank_sum: string
}

export interface MQApplicationMessage {
  from: string
  to: string
  subject: string
  body: string
}

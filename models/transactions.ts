export interface Transaction extends TransactionObject {
  id: number
}

export interface TransactionObject {
  name: string
  type: string
  date: string
  amount: string
  notes: string
  // [key: string]: string
}

export interface Expense extends ExpenseObject {
  id: number
}

export interface ExpenseObject {
  name: string
  type: string
  frequency: string
  date: string
  expected: string
  notes: string
}

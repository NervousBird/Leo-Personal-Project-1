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
  // [key: string]: string
}

export interface ExpenseFull extends Expense {
  actual: string
  difference: string
}

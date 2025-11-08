export interface Incomes {
  id: number
  name: string
  expected: string
  actual: string
  difference: string
  notes: string
}

export interface Category_Income {
  id: number
  name: string
  type: string
  income_id: number
  tansaction_id: number
}

export interface Income {
  id: number
  name: string
  category_id: string
  date: string
  expected: number
  actual: number
  difference: number
  notes: number
}

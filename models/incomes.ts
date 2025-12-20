export interface Income extends IncomeObject {
  id: number
}

export interface IncomeObject {
  name: string
  type: string
  frequency: string
  date: string
  expected: string
  notes: string
  // [key: string]: string
}

export interface IncomeFull extends Income {
  actual: string
  difference: string
}

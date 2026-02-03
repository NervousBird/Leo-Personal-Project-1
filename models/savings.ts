export interface Savings extends SavingsObject {
  id: number
}

export interface SavingsObject {
  name: string
  amount: string
  frequency: string
  startingDate: string
  notes: string
}

export interface Saving extends SavingObject {
  id: number
}

export interface SavingObject {
  name: string
  target: string
  targetDate: string
}

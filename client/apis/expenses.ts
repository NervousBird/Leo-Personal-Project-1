import request from 'superagent'
import { Expense, ExpenseObject } from '../../models/expenses'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getExpenses(): Promise<Expense[]> {
  const response = await request.get(`${rootURL}/expenses`)
  return response.body as Expense[]
}

export async function addExpense(data: ExpenseObject) {
  await request.post(`${rootURL}/expenses`).send(data)
}

export async function updateExpense(data: Expense) {
  await request.patch(`${rootURL}/expenses`).send(data)
}

export async function deleteExpense(id: Expense) {
  await request.delete(`${rootURL}/expenses`).send(id)
}

import request from 'superagent'
import { Income, IncomeObject } from '../../models/incomes'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getIncomes(): Promise<Income[]> {
  const response = await request.get(`${rootURL}/incomes`)
  return response.body as Income[]
}

export async function addIncome(data: IncomeObject) {
  await request.post(`${rootURL}/incomes`).send(data)
}

export async function updateIncome(data: Income) {
  await request.patch(`${rootURL}/incomes`).send(data)
}

export async function deleteIncome(id: Income) {
  await request.delete(`${rootURL}/incomes`).send(id)
}

export async function addBulkIncome(data: IncomeObject[]) {
  await request.post(`${rootURL}/incomes/bulk`).send(data)
}

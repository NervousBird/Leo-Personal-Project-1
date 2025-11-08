import request from 'superagent'
import { Income } from '../../models/incomes'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getIncomes(): Promise<Income[]> {
  const response = await request.get(`${rootURL}/incomes`)
  console.log(response.body)
  return response.body as Income[]
}

import request from 'superagent'
import { Transaction, TransactionObject } from '../../models/transactions'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getTransactions(): Promise<Transaction[]> {
  const response = await request.get(`${rootURL}/transactions`)
  return response.body as Transaction[]
}

export async function addTransaction(data: TransactionObject) {
  await request.post(`${rootURL}/transactions`).send(data)
}

export async function updateTransaction(data: Transaction) {
  await request.patch(`${rootURL}/transactions`).send(data)
}

export async function deleteTransaction(id: Transaction) {
  await request.delete(`${rootURL}/transactions`).send(id)
}

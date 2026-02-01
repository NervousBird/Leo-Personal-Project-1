import request from 'superagent'
import { Savings, SavingsObject, Saving, SavingObject } from '../../models/savings.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllSavings(): Promise<Savings[]> {
  const response = await request.get(`${rootURL}/savings/savings`)
  return response.body as Savings[]
}

export async function addSavings(data: SavingsObject) {
  await request.post(`${rootURL}/savings/savings`).send(data)
}

export async function updateSavings(data: Savings) {
  await request.patch(`${rootURL}/savings/savings`).send(data)
}

export async function deleteSavings(id: Savings) {
  await request.delete(`${rootURL}/savings/savings`).send(id)
}

export async function addBulkSavings(data: SavingsObject[]) {
  await request.post(`${rootURL}/savings/savings/bulk`).send(data)
}

// Saving

export async function getSaving(): Promise<Saving[]> {
  const response = await request.get(`${rootURL}/savings/saving`)
  return response.body as Saving[]
}

export async function addSaving(data: SavingObject) {
  await request.post(`${rootURL}/savings/saving`).send(data)
}

export async function updateSaving(data: Saving) {
  await request.patch(`${rootURL}/savings/saving`).send(data)
}

export async function deleteSaving(id: Saving) {
  await request.delete(`${rootURL}/savings/saving`).send(id)
}

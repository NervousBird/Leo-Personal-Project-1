import connection from './connection.ts'
import { Income, IncomeObject } from '../../models/incomes.ts'

export async function getAllIncomes(db = connection): Promise<Income[]> {
  return db('incomes').select()
}

export async function addIncome(data: IncomeObject, db = connection) {
  console.log('db')
  return db('incomes').insert(data)
}

export async function updateIncome(data: Income, db = connection) {
  return db('incomes').where('id', data.id).update(data)
}

export async function deleteIncome(id: number, db = connection) {
  return db('incomes').where('id', id).delete()
}

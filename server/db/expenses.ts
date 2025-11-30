import connection from './connection.ts'
import { Expense, ExpenseObject } from '../../models/expenses.ts'

export async function getAllExpenses(db = connection): Promise<Expense[]> {
  return db('expenses').select()
}

export async function addExpense(data: ExpenseObject, db = connection) {
  return db('expenses').insert(data)
}

export async function updateExpense(data: Expense, db = connection) {
  return db('expenses').where('id', data.id).update(data)
}

export async function deleteExpense(id: number, db = connection) {
  return db('expenses').where('id', id).delete()
}

export async function addBulkExpense(data: ExpenseObject[], db = connection) {
  return db('expenses').insert(data)
}

import connection from './connection.ts'
import { Transaction, TransactionObject } from '../../models/transactions.ts'

export async function getAllTransactions(
  db = connection,
): Promise<Transaction[]> {
  return db('transactions').select()
}

export async function addTransaction(data: TransactionObject, db = connection) {
  return db('transactions').insert(data)
}

export async function updateTransaction(data: Transaction, db = connection) {
  return db('transactions').where('id', data.id).update(data)
}

export async function deleteTransaction(id: number, db = connection) {
  return db('transactions').where('id', id).delete()
}

import connection from './connection.ts'
import { Savings, SavingsObject, Saving, SavingObject } from '../../models/savings.ts'

const savingsColumns = [
  'id',
  'name',
  'amount',
  'frequency',
  'starting_date as startingDate',
  'notes',
]

export async function getAllSavings(db = connection): Promise<Savings[]> {
  return db('savings').select(...savingsColumns)
}

export async function addSavings(data: SavingsObject, db = connection) {
  return db('savings').insert({
    name: data.name,
    amount: data.amount,
    frequency: data.frequency,
    starting_date: data.startingDate,
    notes: data.notes,
  })
}

export async function updateSavings(data: Savings, db = connection) {
  return db('savings').where('id', data.id).update({
    name: data.name,
    amount: data.amount,
    frequency: data.frequency,
    starting_date: data.startingDate,
    notes: data.notes,
  })
}

export async function deleteSavings(id: number, db = connection) {
  return db('savings').where('id', id).delete()
}

export async function addBulkSavings(data: SavingsObject[], db = connection) {
  return db('savings').insert(data)
}

// For the Summaries
export async function getAllSaving(db = connection): Promise<Saving[]> {
  return db('saving').select()
}

export async function addSaving(data: SavingObject, db = connection) {
  return db('saving').insert(data)
}

export async function updateSaving(data: Saving, db = connection) {
  return db('saving').where('id', data.id).update(data)
}

export async function deleteSaving(id: number, db = connection) {
  return db('saving').where('id', id).delete()
}

export async function addBulkSaving(data: SavingObject[], db = connection) {
  return db('saving').insert(data)
}

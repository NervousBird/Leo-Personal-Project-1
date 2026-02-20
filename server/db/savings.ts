import connection from './connection.ts'
import { Savings, SavingsObject, SavingsBulkObject, Saving, SavingObject } from '../../models/savings.ts'

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

export async function addBulkSavings(data: SavingsBulkObject[], db = connection) {
  return db('savings').insert(data)
}

const savingColumns = [
  "id",
  "name",
  "target",
  "target_date as targetDate"
]

// For the Summaries
export async function getAllSaving(db = connection): Promise<Saving[]> {
  return db('saving').select(...savingColumns)
}

export async function getSavingByName(name: string, db = connection): Promise<Saving> {
  const saving = await db('saving').where('name', name).first().select(...savingColumns)
  console.log(name, saving)
  return saving
}

export async function addSaving(data: SavingObject, db = connection) {
  return db('saving').insert({
    name: data.name,
    target: data.target,
    target_date: data.targetDate,
  })
}

export async function updateSaving(data: Saving, db = connection) {
  return db('saving').where('name', data.name).update({
    target: data.target,
    target_date: data.targetDate
  })
}

export async function deleteSaving(id: number, db = connection) {
  return db('saving').where('id', id).delete()
}

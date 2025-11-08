import connection from './connection.ts'
import { Income } from '../../models/incomes.ts'

export async function getAllIncomes(db = connection): Promise<Income[]> {
  return db('incomes').select()
}

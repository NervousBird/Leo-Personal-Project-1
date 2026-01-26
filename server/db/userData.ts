import connection from './connection.ts'
import { UserDate } from '../../models/userData.ts'

export async function getUserData(db = connection): Promise<UserData> {
  return db('user_data').first().select()
}

export async function updateUserData(data: UserData, db = connection) {
  return db('user_data').update(data)
}

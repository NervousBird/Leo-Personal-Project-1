import connection from './connection.ts'
import { UserData } from '../../models/userData.ts'

export async function getUserData(db = connection): Promise<UserData> {
  return db('user_data').first().select()
}

export async function updateUserData(data: UserData, db = connection) {
  return db('user_data').update({
    id: data.id,
    colors: data.colors,
    borders: data.borders,
    dates_range: data.datesRange,
    fonts: data.fonts,
    leaving_point: data.leavingPoint,
    user_id: data.userId,
  })
}

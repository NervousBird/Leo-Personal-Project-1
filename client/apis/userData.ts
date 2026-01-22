import request from 'superagent'
import { UserDate, UserDataObject } from '../../models/userData.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getUserData(): Promise<UserDataObject>{
  const response = await request.get(`${rootURL}/user_data`)
  return response.body
}

export async function updateUserData(data: UserData) {
  await request.patch(`${rootURL}/user_data`).send(data)
}

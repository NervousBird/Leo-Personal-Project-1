import request from 'superagent'
import { UserData } from '../../models/userData.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getUserData(): Promise<UserData> {
  const response = await request.get(`${rootURL}/userData`)
  return response.body
}

export async function updateUserData(data: UserData) {
  await request.patch(`${rootURL}/userData`).send(data)
}

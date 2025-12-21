import request from 'superagent'
import { User, UserObject } from '../../models/users'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getUserId(id: number): Promise<number>{
  const response = await request.get(`${rootURL}/users/${id}`)
  return response.body as number
}

export async function addUser(data: UserObject) {
  await request.post(`${rootURL}/users`).send(data)
}

export async function deleteUser(id: User) {
  await request.delete(`${rootURL}/users`).send(id)
}

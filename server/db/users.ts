import connection from './connection.ts'


export async function getUserById(id: number, db = connection): Promise<> {
  return db('users').where('id', id).select()
}

export async function addUser(data: any, db = connection) {
  return db('users').insert(data)
}

export async function deleteUser(id: number, db = connection) {
  return db('users').where('id', id).delete()
}

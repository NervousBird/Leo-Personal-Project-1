export interface User extends UserObject {
  id: number
}

export interface UserObject {
  name: string
  email: string
  sub: string
}

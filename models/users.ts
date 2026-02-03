export interface User extends UserObject {
  id: number
}

export interface UserObject {
  colors: string
  borders: string
  fonts: string
  dates_range: string
  leaving_point: string
  userId: number
}

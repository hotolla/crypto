export interface IUser {
  name?: string | null,
  id?: number | null,
  email: string | null,
  password: string | null,
  confirmPassword?: string | null,
}

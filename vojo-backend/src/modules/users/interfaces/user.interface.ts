import { Document } from 'mongoose'

export interface IUser extends Document {
  readonly email: string
  readonly cellphone: string
  firstName: string
  lastName: string
  password: string
  isActive: boolean
}
import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  email: { type: String, trim: true, lowercase: true, unique: true },
  cellphone: { type: String, trim: true, unique: true },
  firstName: { type: String, trim: true, lowercase: true },
  lastName: { type: String, trim: true, lowercase: true },
  password: { type: String, trim: true },
}, { timestamps: true, collection: 'users' })
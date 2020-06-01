import * as bcrypt from 'bcrypt'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'

import { IUser } from '@/modules/users/interfaces/user.interface'

import { JwtPayload } from './interfaces/payload.interface'
import { LoginUserDto } from './dtos/user-login.dto'
import { RegisterUserDto } from './dtos/user-register.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService
  ) { }

  private readonly saltRounds = parseInt(process.env.BCRYPT_ROUNDS)

  async createUser(data: RegisterUserDto): Promise<IUser> {
    const { email, cellphone } = data

    let user = await this.userModel.findOne({ $or: [{ email }, { cellphone }] }).exec()
    if (user) throw new HttpException('E-mail ou telefone já cadastrado.', HttpStatus.BAD_REQUEST)

    const hashedPassword = bcrypt.hashSync(data.password, this.saltRounds)

    user = new this.userModel({
      email: data.email,
      cellphone: data.cellphone,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword
    })

    try {
      user = await user.save()
      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async signinUser(data: LoginUserDto): Promise<string> {
    const user = await this.userModel.findOne({ $or: [{ email: data.username }, { cellphone: data.username }] }).exec()
    if (!user) throw new HttpException('Login inválido.', HttpStatus.BAD_REQUEST)

    const validatePassword = await bcrypt.compare(data.password, user.password || '')
    if (!validatePassword) throw new HttpException('Login inválido.', HttpStatus.BAD_REQUEST)

    const payload: JwtPayload = { id: user._id, permission: 'USER' }
    const accessToken = await this.jwtService.sign(payload)

    return accessToken
  }
}

import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserSchema } from '@/modules/users/schemas/user.schema'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }

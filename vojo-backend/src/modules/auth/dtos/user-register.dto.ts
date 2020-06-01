import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, IsPhoneNumber, MinLength, IsAlpha } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly firstName: string

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly lastName: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  @IsPhoneNumber(null)
  readonly cellphone: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "Senha deve ter pelo menos 6 caracteres." })
  readonly password: string
}
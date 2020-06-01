import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  readonly username: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string
}

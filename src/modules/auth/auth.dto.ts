import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minLength: 8,
    minUppercase: 1,
  })
  password: string
}

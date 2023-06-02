import { Transform, TransformFnParams } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
} from 'class-validator'

export class UserDto {
  @IsOptional()
  @IsUUID()
  id?: string

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

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  userName: string

  @IsNotEmpty()
  @Length(4, 5)
  @IsString() 
  role: string
}

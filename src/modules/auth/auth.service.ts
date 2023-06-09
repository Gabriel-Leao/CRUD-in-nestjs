import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { AuthDto } from './auth.dto'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(data: AuthDto, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    })
    try {
      if (user) {
        const { password } = data
        const correctPassword = bcrypt.compareSync(password, user.password)

        if (correctPassword) {
          req.session.user = {
            id: user.id,
            userName: user.userName,
            role: user.role,
            email: user.email,
          }

          return { message: 'You have been successfully logged in.' }
        } else {
          throw new HttpException(
            'User or password incorrect',
            HttpStatus.UNAUTHORIZED
          )
        }
      } else {
        throw new HttpException(
          'User or password incorrect',
          HttpStatus.UNAUTHORIZED
        )
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}

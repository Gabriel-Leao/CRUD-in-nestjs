import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/database/prisma.service'
import { AuthDto } from './auth.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(data: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    })
    try {
      if (user) {
        const { password } = data
        const correctPassword = bcrypt.compareSync(password, user.password)

        if (correctPassword) {
          return {
            access_token: await this.jwtService.signAsync({
              userName: user.userName,
            }),
          }
        } else {
          throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED)
        }
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}

import { Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'
import { PrismaService } from 'src/database/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: UserDto) {
    const email = await this.prisma.user.findUnique({
      where: { email: user.email },
    })

    try {
      if (email) {
        throw new Error('Email already exists')
      } else {
        const { userName, email, password } = user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const data = {
          email,
          userName,
          password: hash,
        }
        await this.prisma.user.create({
          data,
        })
        return { message: 'User has been created successfully' }
      }
    } catch (error) {
      return { error: error.message }
    }
  }
}

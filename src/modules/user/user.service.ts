import { Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'
import { PrismaService } from 'src/database/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
        userName: true,
        id: true,
      },
    })
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        userName: true,
      },
    })

    try {
      if (user) {
        return user
      } else {
        throw new Error('User dot not exists')
      }
    } catch (error) {
      return { error: error.message }
    }
  }

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

  async update(id: string, data: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    try {
      if (user) {
        const { userName, email, password } = data
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        await this.prisma.user.update({
          data: {
            email,
            userName,
            password: hash,
          },
          where: { id },
        })
        return { message: 'User has been updated successfully' }
      } else {
        throw new Error('User do not exists')
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    try {
      if (user) {
        await this.prisma.user.delete({
          where: { id },
        })
        return { message: 'User has been deleted successfully' }
      } else {
        throw new Error('User do not exists')
      }
    } catch (error) {
      return { error: error.message }
    }
  }
}

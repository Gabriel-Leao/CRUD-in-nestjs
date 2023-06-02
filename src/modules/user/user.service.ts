import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
        role: true,
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
        role: true,
        id: true,
      },
    })

    try {
      if (user) {
        return user
      } else {
        throw new HttpException('User do not exists', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async create(user: UserDto) {
    const email = await this.prisma.user.findUnique({
      where: { email: user.email },
    })

    try {
      if (!email) {
        const userName = await this.prisma.user.findUnique({
          where: { userName: user.userName },
        })

        if (userName) {
          throw new HttpException(
            'userName already in use',
            HttpStatus.CONFLICT
          )
        } else {
          const { userName, email, password, role } = user
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync(password, salt)
          await this.prisma.user.create({
            data: {
              email,
              userName,
              password: hash,
              role,
            },
          })
          return { message: 'User has been created successfully' }
        }
      } else {
        throw new HttpException('email already in use', HttpStatus.CONFLICT)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
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
        throw new HttpException('User do not exists', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
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
        throw new HttpException('User do not exists', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}

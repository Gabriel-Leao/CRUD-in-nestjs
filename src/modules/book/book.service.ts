import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { BookDTO } from './book.dto'

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.book.findMany()
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    })

    try {
      if (book) {
        return book
      } else {
        throw new Error('Book does not exists')
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  async create(data: BookDTO) {
    const book = await this.prisma.book.findFirst({
      where: {
        barCode: data.barCode,
      },
    })
    try {
      if (book) {
        throw new Error('Book already exists')
      } else {
        await this.prisma.book.create({
          data,
        })
        return { message: 'Book has been added successfully' }
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  async update(id: string, data: BookDTO) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    })

    try {
      if (book) {
        await this.prisma.book.update({
          data,
          where: { id },
        })
        return { message: 'Book has been updated successfully' }
      } else {
        throw new Error('Book does not exists')
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  async delete(id: string) {
    const book = this.prisma.book.findUnique({
      where: { id },
    })

    try {
      if (book) {
        await this.prisma.book.delete({
          where: { id },
        })
        return { message: 'Book has been deleted successfully' }
      } else {
        throw new Error('Book does not exists')
      }
    } catch (error) {
      return { error: error.message }
    }
  }
}

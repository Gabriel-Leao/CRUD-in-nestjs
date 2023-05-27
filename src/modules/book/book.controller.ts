import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BookService } from './book.service'
import { BookDTO } from './book.dto'
import { Public } from '../auth/auth.decorator'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Public()
  @Get()
  async findAll() {
    return this.bookService.findAll()
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id)
  }

  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return this.bookService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id)
  }
}

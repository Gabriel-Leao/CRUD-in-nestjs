import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { BookService } from './book.service'
import { BookDTO } from './book.dto'
import { Public } from '../auth/auth.decorator'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get()
  async findAll() {
    return this.bookService.findAll()
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id)
  }

  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data)
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return this.bookService.update(id, data)
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id)
  }
}

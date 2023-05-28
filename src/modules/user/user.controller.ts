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
import { UserService } from './user.service'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Post()
  async create(@Body() user: UserDto) {
    return this.userService.create(user)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserDto) {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}

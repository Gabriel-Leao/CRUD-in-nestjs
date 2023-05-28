import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'

import * as bcrypt from 'bcrypt'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

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
}

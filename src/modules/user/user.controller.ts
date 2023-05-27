import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'

import * as bcrypt from 'bcrypt'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserDto) {
    return this.userService.create(user)
  }
}

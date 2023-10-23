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
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import { Role } from '../auth/role/role.decorator'
import { RoleGuard } from '../auth/role/role.guard'
import { Public } from '../auth/auth.decorator'

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

  @Role('admin')
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() user: UserDto) {
    return this.userService.create(user)
  }

  @Role('admin')
  @UseGuards(RoleGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserDto) {
    return this.userService.update(id, data)
  }

  @Role('admin')
  @UseGuards(RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}

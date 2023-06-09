import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'
import { Public } from './auth.decorator'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() user: AuthDto, @Req() req: Request) {
    return this.authService.login(user, req)
  }
}

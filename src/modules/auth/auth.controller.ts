import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: AuthDto) {
    return this.authService.login(user)
  }
}

import { Controller, Get, Res } from '@nestjs/common'
import { Public } from './modules/auth/auth.decorator'

@Controller()
export class AppController {
  @Public()
  @Get()
  index(@Res() res) {
    res.redirect('/book')
  }
}

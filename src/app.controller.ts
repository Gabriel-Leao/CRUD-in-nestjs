import { Controller, Get, Res } from '@nestjs/common'
import { Public } from './modules/auth/auth.decorator'
import { Response } from 'express'

@Controller()
export class AppController {
  @Public()
  @Get()
  index(@Res() res: Response) {
    res.redirect('/book')
  }
}

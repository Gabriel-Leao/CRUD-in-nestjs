import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    user: {
      id: string
      userName: string
      role: string
      email: string
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true },
    })
  )
  const port = process.env.PORT
  await app.listen(port)
}
bootstrap()

import { Module } from '@nestjs/common'
import { BookModule } from './modules/book/book.module'
import { PrismaService } from './database/prisma.service'
import { AppController } from './app.controller'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './modules/auth/auth.guard'

@Module({
  imports: [BookModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

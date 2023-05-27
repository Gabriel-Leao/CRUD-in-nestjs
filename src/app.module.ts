import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { PrismaService } from './database/prisma.service';
import { AppController } from './app.controller';

@Module({
  imports: [BookModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

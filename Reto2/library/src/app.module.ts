import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUri } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    AuthModule,
    UsersModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

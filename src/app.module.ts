import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_NAME,
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
      },
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

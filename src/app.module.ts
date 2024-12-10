import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
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

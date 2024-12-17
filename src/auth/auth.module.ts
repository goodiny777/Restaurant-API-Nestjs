import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User', schema: UserSchema
  }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }

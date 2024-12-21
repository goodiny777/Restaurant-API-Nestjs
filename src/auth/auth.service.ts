import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignupDTO } from './dto/signup.dto.';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) { }

    async signUp(signUpDTO: SignupDTO): Promise<User> {
        const { email, name, password } = signUpDTO;

        const user = await this.userModel.create({
            name, email, password
        });

        return user;

    }
}

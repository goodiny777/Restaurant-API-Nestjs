import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignupDTO } from './dto/signup.dto.';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto.';
import { AuthUtlis } from './authUtils/authUtils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDTO: SignupDTO): Promise<User> {
        const { email, name, password } = signUpDTO;

        const hashedPassword = bcrypt.hash(password, 10);

        try {
            const user = await this.userModel.create({
                name, email, hashedPassword
            });

            return user;
        } catch (error) {
            if (error.code == 11000) {
                throw new ConflictException('Duplicate email');
            }
        }
    }

    async login(loginDTO: LoginDTO): Promise<{ token: string }> {
        const { email, password } = loginDTO;

        const user = await this.userModel.findOne({ email }).select('+password');

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatches = bcrypt.compare(password, user.password);

        if (!isPasswordMatches) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = await AuthUtlis.assignJWT(user.id, this.jwtService);

        return { token };
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto.';
import { User } from './schema/user.schema';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() signUpDTO: SignupDTO): Promise<User> {
        return this.authService.signUp(signUpDTO);
    }
}

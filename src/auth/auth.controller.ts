import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto.';
import { User } from './schema/user.schema';
import { LoginDTO } from './dto/login.dto.';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() signUpDTO: SignupDTO): Promise<User> {
        return this.authService.signUp(signUpDTO);
    }

    @Get('/login')
    login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
        return this.authService.login(loginDTO);
    }

}

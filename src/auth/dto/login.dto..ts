import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter valid email' })
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
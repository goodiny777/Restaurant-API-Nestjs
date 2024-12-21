import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class SignupDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter valid email' })
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    readonly password: string;
}
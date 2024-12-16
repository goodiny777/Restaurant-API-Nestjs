import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../schemas/restaurant.schema";

export class CreateRestaurantDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsPhoneNumber('US')
    readonly phone: string;
    @IsNotEmpty()
    @IsString()
    readonly address: string;
    @IsNotEmpty()
    @IsEnum(Category, { message: 'Please input correct Category' })
    readonly category: Category;
}
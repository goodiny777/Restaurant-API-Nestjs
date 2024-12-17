import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator/types/decorator/decorators";
import { Category } from "../schemas/restaurant.schema";

export class UpdateRestaurantDTO {
    @IsString()
    @IsOptional()
    readonly name: string;
    @IsString()
    @IsOptional()
    readonly description: string;
    @IsEmail()
    @IsOptional()
    readonly email: string;
    @IsPhoneNumber('US')
    @IsOptional()
    readonly phone: string;
    @IsString()
    @IsOptional()
    readonly address: string;
    @IsEnum(Category, { message: 'Please input correct Category' })
    @IsOptional()
    readonly category: Category;
}
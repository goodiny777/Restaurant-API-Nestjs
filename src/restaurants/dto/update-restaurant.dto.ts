import { IsEmail, IsEmpty, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../schemas/restaurant.schema";
import { User } from "../../auth/schema/user.schema";

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
    @IsEmpty({ message: 'You cannot provice user ID.' })
    readonly user: User;
}
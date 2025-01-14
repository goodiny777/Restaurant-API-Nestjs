import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../schemas/restaurant.schema";
import { User } from "../../auth/schema/user.schema";

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

    @IsEmpty({ message: 'You cannot provice user ID.' })
    readonly user: User;
}
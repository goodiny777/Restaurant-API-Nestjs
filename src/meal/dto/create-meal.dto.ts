
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsEmpty } from 'class-validator';
import { Category } from '../schema/meal.schema';
import { User } from '../../auth/schema/user.schema';

//write CreateMealDto class
export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category)
    readonly category: Category;

    @IsNotEmpty()
    @IsString()
    readonly image: string;

    @IsNotEmpty()
    @IsString()
    readonly restaurant: string;

    @IsEmpty({ message: 'You cannot provide user ID.' })
    readonly user: User
}
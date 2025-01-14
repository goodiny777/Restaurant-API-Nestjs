
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Category } from '../schema/meal.schema';

//write CreateMealDto class
export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    readonly descriptiom: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsEnum(Category)
    readonly category: Category;

    @IsString()
    readonly image: string;
}
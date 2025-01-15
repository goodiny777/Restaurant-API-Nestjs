
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsEmpty, IsOptional } from 'class-validator';
import { Category } from '../schema/meal.schema';
import { User } from '../../auth/schema/user.schema';

//write UpdateMealDto class
export class UpdateMealDto {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category)
    readonly category: Category;

    @IsOptional()
    @IsString()
    readonly image: string;

    @IsOptional()
    @IsString()
    readonly restaurant: string;

    @IsEmpty({ message: 'You cannot provide user ID.' })
    readonly user: User
}
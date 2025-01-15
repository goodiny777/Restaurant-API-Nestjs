import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Meal } from './schema/meal.schema';
import { MealService } from './meal.service';
import { UpdateMealDto } from './dto/update-meal.dt';
import { AuthGuard } from '@nestjs/passport';

@Controller('meal')
export class MealController {

    constructor(private mealService: MealService) { }

    @Get()
    getAllMeals(): Promise<Meal[]> {
        return this.mealService.findAll();
    }

    @Get('restaurant/:id')
    getMealsByRestaurant(@Param('id') id: string): Promise<Meal[]> {
        return this.mealService.findByRestaurant(id);
    }

    @Get(':id')
    getMeal(@Param('id') id: string): Promise<Meal> {
        return this.mealService.findById(id);
    }

    @Post()
    createMeal(
        @Body() mealDto: CreateMealDto,
        @CurrentUser() user): Promise<Meal> {
        return this.mealService.create(mealDto, user);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateMeal(
        @Body() mealDto: UpdateMealDto,
        @Param('id') id: string,
        @CurrentUser() user
    ): Promise<Meal> {
        return this.mealService.update(id, mealDto, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteMeal(
        @Param('id') id: string,
        @CurrentUser() user
    ): Promise<{ deleted: boolean }> {
        return this.mealService.delete(id, user);
    }
}

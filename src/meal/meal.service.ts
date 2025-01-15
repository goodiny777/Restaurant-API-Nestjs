import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from './schema/meal.schema';
import * as mongoose from 'mongoose';
import { Restaurant } from '../restaurants/schemas/restaurant.schema';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class MealService {

    constructor(
        @InjectModel(Meal.name)
        private mealModel: mongoose.Model<Meal>,
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>,
    ) { }


    //create meal
    async create(mealDto: Meal, user: User): Promise<Meal> {

        const data = Object.assign(mealDto, { user: user._id });

        const meal = await this.mealModel.create(data);

        //save meal id to restaurant
        const restaurant = await this.restaurantModel.findById(mealDto.restaurant);

        if (!restaurant) {
            throw new Error('Restaurant not found');
        }
        //check ownership of the restaurant
        if (restaurant.user.toString() !== user._id.toString()) {
            throw new Error('You are not authorized to add meal to this restaurant');
        }

        restaurant.menu.push(meal);

        await restaurant.save();

        return meal;
    }

    //update meal
    async update(id: string, mealDto: Meal, user: User): Promise<Meal> {

        const meal = await this.findById(id);

        if (meal.user.toString() !== user._id.toString()) {
            throw new ForbiddenException('You are not authorized to update this meal');
        }

        await this.mealModel.findByIdAndUpdate(id, mealDto, {
            new: true,
            runValidators: true,
        });

        return meal;
    }

    //delete meal
    async delete(id: string, user: User): Promise<{ deleted: boolean }> {

        const meal = await this.findById(id);

        if (meal.user.toString() !== user._id.toString()) {
            throw new ForbiddenException('You are not authorized to delete this meal');
        }

        const res = await this.mealModel.findByIdAndDelete(id);
        if (res) { return { deleted: true } };
        return { deleted: false };
    }

    //find all meals
    async findAll(): Promise<Meal[]> {
        return await this.mealModel.find();
    }

    //find meals by restaurant
    async findByRestaurant(restaurantId: string): Promise<Meal[]> {
        return await this.mealModel.find({ restaurant: restaurantId });
    }

    //find meal by id
    async findById(id: string): Promise<Meal> {
        const isValid = mongoose.isValidObjectId(id);

        if (!isValid) {
            throw new BadRequestException('Invalid id');
        }

        const meal = await this.mealModel.findById(id);

        if (!meal) {
            throw new BadRequestException('Meal not found');
        }

        return meal;
    }
}

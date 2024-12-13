import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import mongoose from 'mongoose';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>
    ) { }

    async findAll(): Promise<Restaurant[]> {
        const restaurants = await this.restaurantModel.find();
        return restaurants;
    }

    async create(restaurant: Restaurant): Promise<Restaurant> {
        const result = await this.restaurantModel.create(restaurant);
        return result;
    }

    async findById(id: string): Promise<Restaurant> {
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new NotFoundException('Resturant not found');
        }
        return restaurant;
    }
}

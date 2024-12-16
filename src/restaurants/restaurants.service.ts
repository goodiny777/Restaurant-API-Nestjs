import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>
    ) { }

    async findAll(query: Query): Promise<Restaurant[]> {

        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);


        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $oprions: 'i',
            }
        } : {};

        const restaurants = await this.restaurantModel
            .find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);

        return restaurants;
    }

    async create(restaurant: Restaurant): Promise<Restaurant> {
        const result = await this.restaurantModel.create(restaurant);
        return result;
    }

    async findById(id: string): Promise<Restaurant> {
        const isValid = await mongoose.isValidObjectId(id);

        if (!isValid) {
            new BadRequestException('Wrong item id.')
        }

        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new NotFoundException('Resturant not found');
        }
        return restaurant;
    }

    async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
        return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Restaurant> {
        return await this.restaurantModel.findByIdAndDelete(id);
    }
}

import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto.';
import { UpdateRestaurantDTO } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private restaurantsService: RestaurantsService) {

    }

    @Get()
    async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]> {
        return this.restaurantsService.findAll(query);
    }

    @Post()
    async addRestaurant(@Body() restaurant: CreateRestaurantDTO): Promise<Restaurant> {
        return this.restaurantsService.create(restaurant);
    }

    @Get(':id')
    async getRestaurant(
        @Param('id') id: string
    ): Promise<Restaurant> {
        return this.restaurantsService.findById(id);
    }

    @Put(':id')
    async updateRestaurant(
        @Param('id') id: string,
        @Body() restaurant: UpdateRestaurantDTO,
    ): Promise<Restaurant> {
        //check if exists before update
        this.restaurantsService.findById(id);

        return this.restaurantsService.updateById(id, restaurant);
    }

    @Delete(':id')
    async deleteRestaurant(
        @Param('id') id: string
    ): Promise<{ deleted: Boolean }> {
        //check if exists before update
        this.restaurantsService.findById(id);

        const restaurant = this.restaurantsService.deleteById(id);

        if (restaurant) {
            return {
                deleted: true
            };
        }
    }
};

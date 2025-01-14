import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto.';
import { UpdateRestaurantDTO } from './dto/update-restaurant.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schema/user.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private restaurantsService: RestaurantsService) {

    }

    @Get()

    async getAllRestaurants(
        @Query() query: ExpressQuery
    ): Promise<Restaurant[]> {
        return this.restaurantsService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('admin, user')
    async addRestaurant(
        @Body() restaurant: CreateRestaurantDTO,
        @CurrentUser() user: User
    ): Promise<Restaurant> {
        return this.restaurantsService.create(restaurant, user);
    }

    @Get(':id')
    async getRestaurant(
        @Param('id') id: string
    ): Promise<Restaurant> {
        return this.restaurantsService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateRestaurant(
        @Param('id') id: string,
        @Body() restaurant: UpdateRestaurantDTO,
        @CurrentUser() user: User
    ): Promise<Restaurant> {
        //check if exists before update
        const res = await this.restaurantsService.findById(id);
        if (res.user.toString() !== user._id.toString()) {
            throw new Error('You are not authorized to update this restaurant');
        }
        return this.restaurantsService.updateById(id, restaurant);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteRestaurant(
        @Param('id') id: string,
        @CurrentUser() user: User
    ): Promise<{ deleted: Boolean }> {
        //check if exists before update
        this.restaurantsService.findById(id);

        const restaurant = await this.restaurantsService.deleteById(id);

        if (restaurant.user.toString() !== user._id.toString()) {
            throw new Error('You are not authorized to update this restaurant');
        }
        if (restaurant) {
            return {
                deleted: true
            };
        }
    }
};

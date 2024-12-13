import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto.';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private restaurantsService: RestaurantsService) {

    }

    @Get()
    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.restaurantsService.findAll();
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
};

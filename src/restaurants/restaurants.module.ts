import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from './schemas/restaurant.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{
            name: 'Restaurant', schema: RestaurantSchema
        }])],
    controllers: [RestaurantsController],
    providers: [RestaurantsService],
    exports: [MongooseModule]
})
export class RestaurantModule { };
import { Module, Res } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from './schema/meal.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [
    AuthModule,
    RestaurantModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }])],
  controllers: [MealController],
  providers: [MealService]
})
export class MealModule { }

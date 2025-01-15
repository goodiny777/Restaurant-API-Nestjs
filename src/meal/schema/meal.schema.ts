import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Restaurant } from "../../restaurants/schemas/restaurant.schema";
import { User } from "../../auth/schema/user.schema";

export enum Category {
    SOUPS = 'soups',
    SALADS = 'salads',
    SANDWICHES = 'sandwiches',
    PASTA = 'pasta',
}

@Schema({ timestamps: true })
export class Meal {
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop()
    price: number;
    @Prop()
    category: Category;
    @Prop()
    image: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
    restaurant: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const MealSchema = SchemaFactory.createForClass(Meal);


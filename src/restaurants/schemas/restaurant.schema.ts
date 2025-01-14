import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/schema/user.schema";

export enum Category {
    FAST_FOOD = 'Fast Food',
    CAFE = 'Cafe',
    FINE_DINNING = 'Fine Dinning'
};

@Schema()
export class Restaurant {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    category: Category;

    @Prop()
    images?: object[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

};

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
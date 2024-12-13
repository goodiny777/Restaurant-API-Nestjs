import { Category } from "../schemas/restaurant.schema";

export class CreateRestaurantDTO {
    readonly name: string;
    readonly description: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly category: Category;
}
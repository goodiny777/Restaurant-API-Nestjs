import { Category } from "../schemas/restaurant.schema";

export class UpdateRestaurantDTO {
    readonly name: string;
    readonly description: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly category: Category;
}
import { Request } from "express";

export interface IFood {
    id: number;
    name: string;
    count: number;
    price: number;
    description?: string;
    img?: string;
    id_category: number;
    category_name: string;
}

export interface IFoodCategory {
    id: number;
    name: string;
}

export interface IFoodRequest extends Request {
    foodId: number;
}
import { Request, Response, NextFunction } from 'express';
import { IFood } from '../interfaces/order.interfaces';

function isValidFoodItem(item: any): item is IFood {
    return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'number' &&
        typeof item.name === 'string' &&
        typeof item.count === 'number' &&
        typeof item.price === 'number' &&
        // typeof item?.description === 'string' &&
        // typeof item?.img === 'string' &&
        typeof item.id_category === 'number' &&
        typeof item.category_name === 'string'
        // Add other properties as needed
    );
}

function isValidFoodItems(items: any): items is IFood[] {
    return Array.isArray(items) && items.every(isValidFoodItem);
}

export const validateFoodItems = (req: Request, res: Response, next: NextFunction): any => {
    const foodItems = req.body.foodItems;

    if (!Array.isArray(foodItems)) {
        return res.status(400).json({ message: 'foodItems must be an array' });
    }

    if (!isValidFoodItems(foodItems)) {
        return res.status(400).json({ message: 'Invalid food items data' });
    }

    next();
};

/* Контроллер: работа с HTTP (валидация, преобразование данных) */
import { Request, Response } from "express";
// import { IFood } from "../interfaces/food.interfaces";
import { FoodRepository } from '../repositories/food.repository';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

export class FoodController {
    constructor(private foodRepository: FoodRepository) { }

    // Methods
    public async getAllFood(_req: Request, res: Response): Promise<any> {

        try {
            const food_items = this.foodRepository.getAllFood();

            return res.status(200).json({
                count: (await food_items).length,
                foodItems: (await food_items)
            });

        } catch (error) {
            console.error('Ошибка при получении списка продуктов:', error);
            return res.status(500).json({ message: 'Ошибка сервера.' });
        }
    }

    public async getAllFoodCategories(_req: Request, res: Response): Promise<any> {
        try {
            const food_categories = this.foodRepository.getAllFoodCategories();

            return res.status(200).json({
                count: (await food_categories).length,
                foodCategories: (await food_categories)
            });

        } catch (error) {
            console.error('Ошибка при получении списка категорий продуктов:', error);
            return res.status(500).json({ message: 'Ошибка сервера.' });
        }
    }

    public async findById(req: Request, res: Response): Promise<any> {
        const foodId: number = parseInt(req.params.id);

        if (!foodId) {
            return res.status(400).json({ message: 'Food ID is required' });
        }

        if (isNaN(foodId)) {
            return res.status(400).json({ message: 'Food ID must be a number' });
        }

        try {
            const food_item = await this.foodRepository.findById(foodId);

            if (!food_item) {
                return res.status(404).json({ message: 'Food item not found' });
            }

            return res.status(200).json(food_item);

        } catch (error) {
            console.error('Ошибка при получении данных о продукте:', error);
            res.status(500).json({ message: 'Ошибка сервера.' });
        }
    }

    public async findByName(req: Request, res: Response): Promise<any> {
        const foodName: string = req.params.name;

        if (!foodName) {
            return res.status(400).json({ message: 'Food name is required' });
        }

        try {
            const food_items = await this.foodRepository.findByName(foodName);

            return res.status(200).json({
                count: food_items.length,
                food_items: food_items
            });
        }
        catch (error) {
            console.error('Ошибка при получении данных о продукте:', error);
            res.status(500).json({ message: 'Ошибка сервера.' });
        }
    }
}
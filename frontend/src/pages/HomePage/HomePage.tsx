import { useEffect, useState } from 'react';
// import PageLayout from '../../components/PageLayout/PageLayout';
import styles from './HomePage.module.css';
import FormMessageBlock from '../../components/FormMessageBlock/FormMessageBlock';
import Button from '../../components/Button/Button';
import FoodCard from '../../components/FoodCard/FoodCard';
import { useCart } from '../../context/CartContext/CartContext';
import ModalMessage from '../../components/ModalMessage/ModalMessage';
import PageLayout from '../../components/PageLayout/PageLayout';
import { SERVICE_FOOD } from '../../routes/routes';
import FullScreenLoading from '../../components/FullScreenLoading/FullScreenLoading';

interface FoodItem {
    id: number;
    name: string;
    count: number;
    price: number;
    description: string;
    img: string;
    id_category: number;
    category_name: string;
}

interface Category {
    id: number;
    name: string;
}

function HomePage() {
    const [foodItems, setFoodItems] = useState<FoodItem[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const { cart, addToCart } = useCart();
    const [warn, setWarn] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(SERVICE_FOOD.FIND_ALL);
                if (!response.ok) {
                    throw new Error('Не удалось загрузить список продуктов. Попробуйте позже');
                }
                const data = await response.json();

                if (Array.isArray(data.foodItems)) {
                    setFoodItems(data.foodItems);
                } else {
                    throw new Error('Data received is not an array');
                }
            } catch (err) {

                if (err instanceof Error && err.message === 'Failed to fetch') {
                    setError('Не удалось загрузить данные. Сервер недоступен. Попробуйте позже.');
                }
                setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
                setFoodItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(SERVICE_FOOD.FIND_CATEGORY_ALL);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data.foodCategories);
            } catch (err) {
                console.error('Error fetching categories:', err);
                if (err instanceof Error && err.message === 'Failed to fetch') {
                    setError('Не удалось загрузить данные. Сервер недоступен. Попробуйте позже.');
                }
            }
        };

        fetchData();
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
    };

    const handleAddToCart = (productId: number, quantity: number) => {
        const foodItem = foodItems?.find((item) => item.id === productId);
        if (!foodItem) {
            console.error(`Food item with id ${productId} not found`);
            return;
        }

        const existingCartItem = cart.find((item) => item.productId === productId);
        const currentQuantityInCart = existingCartItem ? existingCartItem.quantity : 0;
        const totalQuantity = currentQuantityInCart + quantity;

        if (totalQuantity > foodItem.count) {
            setWarn(`Вы не можете добавить продукт "${foodItem.name}" больше чем ${foodItem.count} позиций.`);
            // setError(`Нельзя добавить больше ${foodItem.count} ${foodItem.name}`);
            return;
        }
        setWarn(null);
        setError(null);
        addToCart(productId, quantity);
    };

    const handleCloseWarn = () => {
        setWarn(null);
    };

    const filteredFoodItems = selectedCategory
        ? foodItems?.filter((item) => item.id_category === selectedCategory)
        : foodItems;

    if (isLoading) {
        return <FullScreenLoading isLoading={true} />;
    }

    if (error) {
        return (
            <PageLayout>
                <FormMessageBlock message={error} type='error' />
            </PageLayout>
        );
    }

    if (!foodItems) {
        return <FullScreenLoading isLoading={true} />;
    }

    return (
        <>
            <div className={styles.categoryButtons}>
                <Button
                    className={`${styles.categoryButton} ${selectedCategory === null ? styles.active : ''}`}
                    onClick={() => handleCategoryClick(null)}
                >
                    Все
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
            {/* <PageLayout> */}
            {warn && <ModalMessage message={warn} type='warning' onClose={handleCloseWarn} />}
            {/* {warn && <FormMessageBlock message={warn} type='warning' onClose={handleCloseWarn} />} */}
            <div className={styles.foodGrid}>
                {filteredFoodItems?.map((item) => (
                    <FoodCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        count={item.count}
                        category_name={item.category_name}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
            {/* </PageLayout> */}
        </>
    );
}

export default HomePage;

import barskaya from '../assets/barskaya.jpg';
import santiago from '../assets/santiago.jpg';
import kuba from '../assets/santiago.jpg';
import batista_shrimp from '../assets/batista_shrimp.jpg';
import sanches from '../assets/sanches.jpg';
import pineapple from '../assets/pineapple.jpg';
import coke from '../assets/coke.jpg';
import orange from '../assets/orange.jpg';
import garlic from '../assets/garlic.jpg';
import pomidor from '../assets/pomidor.jpg';
import cheese from '../assets/cheese.jpg';

export const getImgSrc = (foodName: string): any => {

    switch (foodName) {
        case "БАРСКАЯ":
            // return "src/assets/barskaya.jpg"; 
            return barskaya;
        case "САНТЬЯГО":
            // return "src/assets/santiago.jpg";
            return santiago;
        case "КУБА":
            // return "src/assets/kuba.jpg";
            return kuba;
        case "БАТИСТА С КРЕВЕТКАМИ":
            // return "src/assets/batista_shrimp.jpg";
            return batista_shrimp;
        case "САНЧЕС":
            // return "src/assets/sanches.jpg";
            return sanches;
        case "Сок Ананас":
            // return "src/assets/pineapple.jpg";
            return pineapple;
        case "Кола Добрый":
            // return "src/assets/coke.jpg";
            return coke;
        case "Напиток Добрый Апельсин":
            // return "src/assets/orange.jpg";
            return orange;
        case "Чесночный":
            // return "src/assets/garlic.jpg";
            return garlic;
        case "Томатный":
            // return "src/assets/pomidor.jpg";
            return pomidor;
        case "Сырный":
            // return "src/assets/cheese.jpg";
            return cheese;
        default:
            return "src/assets/default.jpg"; // Replace with a default image path
    }
};

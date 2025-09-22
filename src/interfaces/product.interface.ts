
export interface Product {
    id?:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    image:       string;
    rating:      Rating;
}

export interface cartProduct {
    id: string;
    title: string;    
    price: number;    
    quantity: number;
    image: string;
}

export enum Category {
    electronics = "electronics",
    jewelery = "jewelery",
    men_s_clothing = "men's clothing",
    women_s_clothing = "women's clothing",
}

export interface Rating {
    rate:  number;
    count: number;
}


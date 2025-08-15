import { Product } from "./product.interface";

export interface Cart {    
    items?: CartItem[];    
    totalItems: number;
    setCartItems: (newCartItems: CartItem[]) => void;
    setTotalItems: (newTotal: number) => void;
    clearCart: () => void;
}

export interface CartItem {
    id: string;
    productId: string;
    title: string;
    price: number;
    quantity: number;
    product?: Product
}
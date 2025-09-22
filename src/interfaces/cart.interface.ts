import { cartProduct, Product } from "./product.interface";

export interface State {
    cart: CartItem[];    
    setCart: (cart: CartItem[]) => void;
    getTotalItems: () => number;
    getOrderSummary: () => {
        subTotal: number;
        tax: number;
        total: number;
        totalItems: number;
    };

    addProductToCart: (product: cartProduct) => void;
    updateProductQuantity: (product: CartItem, quantity: number) => void;
    removeProduct: (product: CartItem) => void;

    clearCart: () => void;
}

export interface CartItem {
    id?: string;
    productId: string;
    title: string;
    price: number;
    quantity: number;
    product?: Product
}
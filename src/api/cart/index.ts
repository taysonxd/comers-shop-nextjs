import { env } from "@/config/env";
import { fetchWithSession } from "../helper";
import { CartItem } from "@/interfaces/cart.interface";

export const getShoppingCart = ( userId: string | null ): Promise<CartItem[]> => {        
    console.log(`${env.BACKEND_URL}/api/cart${ userId ? `?userId=${userId}` : '' }`);
    
    const cartItems = fetch(`${env.BACKEND_URL}/api/cart${ userId ? `?userId=${userId}` : '' }`, {
        method: 'GET',
    }).then(res => res.json())

    return cartItems
}

export const updateQuantityCartItem = ( itemId: string, quantity: number ): Promise<any> => {

    const body = {        
        id: itemId,
        quantity
    };        
        
    const itemCart = fetchWithSession(`${env.BACKEND_URL}/api/cart`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

    return itemCart
}

export const addItemCart = ( productId: number, quantity: number ): Promise<any> => {

    const body = {        
        productId,
        quantity
    };
        
    const itemCart = fetchWithSession(`${env.BACKEND_URL}/api/cart`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

    return itemCart
}

export const deleteItemCart = async (id: string): Promise<boolean> => {
    
    const response = await fetchWithSession(`${env.BACKEND_URL}/api/cart/${id}`, {
        method: 'DELETE',        
        headers: {
            'Content-Type': 'application/json'
        }
    })    
    
    return response.ok
}
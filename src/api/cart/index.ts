import { env } from "@/config/env";
import { fetchWithSession } from "../helper";
import { CartItem } from "@/interfaces/cart.interface";

export const getShoppingCart = async ( userId: string | null ): Promise<CartItem[]> => {        
        
    const response = await fetch(`${env.BACKEND_URL}/api/cart${ userId ? `?userId=${userId}` : '' }`, {
        method: 'GET',
    }).then(res => res.json());
                                        
    if (!response.success)
        throw new Error(response.message);

    return response.data;
}

export const updateQuantityCartItem = async ( itemId: string, quantity: number ): Promise<any> => {

    const body = {        
        id: itemId,
        quantity
    };        
        
    const response = await fetchWithSession(`${env.BACKEND_URL}/api/cart`, {
        method: 'PUT',        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(res => res.json());
                
    if (!response.success)
        throw new Error(response.message);

    return response.data;
}

export const addItemCart = async ( productId: number, quantity: number ): Promise<any> => {

    const body = {        
        productId,
        quantity
    };
        
    const response = await fetchWithSession(`${env.BACKEND_URL}/api/cart`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
        
    if (!response.success)
        throw new Error(response.message);

    return response.data;
}

export const deleteItemCart = async (id: string): Promise<boolean> => {
    
    const response = await fetchWithSession(`${env.BACKEND_URL}/api/cart/${id}`, {
        method: 'DELETE',        
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
                
    if (!response.success)
        throw new Error(response.message);

    return response.data;
}
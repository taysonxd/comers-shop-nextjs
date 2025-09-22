'use server'

import { CartItem } from '@/interfaces/cart.interface';
import * as api from '../../api';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const getUserSessionServer = async () => {
    const session = await getServerSession(authOptions);
             
    return session?.user;
}

export const getCartItems = async ():Promise<CartItem[]> => {    

    const userId = ( await getUserSessionServer() as any)?.id ?? null;
                
    if( !userId )
        return [];

    try {
        const cartItems = api.getShoppingCart( userId );
                
        return cartItems
    } catch(error) {
        console.error(error);
        return [];
    }
}

export const updateCartItems = async (itemId: string, quantity: number = 1) => {    
    try {
                
        const cartItem = await api.updateQuantityCartItem(itemId, quantity)
    
        return cartItem
    } catch(error) {
        console.error(error);
        return null;
    }
}

export const setProductToCart = async (productId: number, quantity: number = 1) => {    
    try {                
        const cartItem = await api.addItemCart(productId, quantity)
                
        return cartItem;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export const removeProductFromCart = async (id: string) => {
    try {
        return await api.deleteItemCart(id);            
    } catch(error) {
        console.error(error);
        return null;
    }
}

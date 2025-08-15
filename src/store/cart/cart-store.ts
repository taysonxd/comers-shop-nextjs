import { Cart, CartItem } from '@/interfaces/cart.interface'
import { create } from 'zustand'

export const useCartStore = create<Cart>((set) => ({    
    items: [],
    totalItems: 0,
    setCartItems: (newCartItems: CartItem[]) => set(() => ({ items: newCartItems })),
    setTotalItems: (newTotal: number) => set(() => ({ totalItems: newTotal })),
    clearCart: () => set(() => ({ items: [] }))    
}))
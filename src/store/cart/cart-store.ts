import { State, CartItem } from '@/interfaces/cart.interface';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            setCart: (newCartItems: CartItem[]) => set(() => ({ cart: newCartItems })),
            getTotalItems: () => {
                const { cart } = get()

                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            getOrderSummary: () => {
                const { cart, getTotalItems } = get();

                const subTotal = cart?.reduce((total, item) => (item.quantity * item.price) + total, 0);
                const tax = subTotal * 0.15;
                const total = subTotal + tax;

                return { 
                    subTotal,
                    tax,
                    total,
                    totalItems: getTotalItems()
                }
            },
            addProductToCart: (product: CartItem) => {
                const { cart } = get();

                const productInCart = cart?.some(item => item.id === product.id)

                if( !productInCart)
                    return set({ cart: [ ...cart, product ] });

                const updatedPrducts = cart.map(item => {
                    if( item.id === product.id)
                        return { ...item, quantity: item.quantity + product.quantity };

                    return item
                });

                set({ cart: updatedPrducts });
            },
            updateProductQuantity: (product: CartItem) => {
                const { cart } = get()

                const productsUpdated = cart?.map(item => {
                    if( item.id === product.id )
                        return { ...item, quantity: item.quantity + product.quantity }

                    return item
                })

                set({ cart: productsUpdated})
            },
            removeProduct: (product: CartItem) => {
                const { cart } = get()

                const cartUpdated = cart?.filter(item => item.id !== product.id);

                set({ cart: cartUpdated});
            },
            clearCart: () => {
                set({ cart: [] });
            }
        }
    ),
    {
        name: 'sopping-cart'
    })
)
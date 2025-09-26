'use client'

import { CartItem } from "@/interfaces/cart.interface"
import { useCartStore } from "@/store/cart/cart-store"
import Image from "next/image"
import { QuantitySelector } from "../../product/quantity-selector/QuantitySelector"
import { removeProductFromCart, updateCartItems } from "@/cart/actions/actions"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IoCardOutline, IoCartOutline } from "react-icons/io5"
import clsx from "clsx"

export const OrderItemsList = () => {

    const router = useRouter();

    const cartItemsStore = useCartStore(state => state.cart);
    const { setCart, getTotalItems } = useCartStore();

    const onUpdateCartItem = async (itemId: string, quantity: number) => {
                
        const cartItem = await updateCartItems(itemId, quantity!);
                
        if( !cartItem ) return;   
                
        const updatedCartItems = cartItemsStore?.map(item => {
            if( item.id === cartItem.id ) return cartItem;
            return item;
        });

        setCart( updatedCartItems );        
        router.refresh();
    }
     
    const removeItemFromCart = async (itemId: string) => {
        const cartItem = await removeProductFromCart(itemId!);
                
        if( !cartItem ) return;   
                
        const updatedCartItems = cartItemsStore?.filter(item => item.id !== itemId);

        setCart( updatedCartItems );        
        router.refresh();
    }

    return (
        <div className='flex flex-col mt-5'>
                      
            {/* Items */}
            {
                cartItemsStore.map(({product, quantity, id}) => (
                    <div key={product!.id} className='flex mb-5'>
                        <div className="w-[150px]">
                            <Image
                                src={product!.image}
                                alt={product!.title}
                                width={100}
                                height={100}                            
                                style={{
                                    width: '100px',
                                    height: '100px' 
                                }}                                
                            />
                        </div>

                        <div className="flex w-full flex-col">
                            <p className="font-semibold">{ product!.title }</p>
                            <p>${ product!.price } * { quantity }</p>
                            <p className='font-bold'>Subtotal: ${ Number(product!.price) * quantity }</p>
                        </div>
                    </div>
                ))            
            }
        </div>
    )
}

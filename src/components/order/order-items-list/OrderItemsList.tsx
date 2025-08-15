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

    const cartItemsStore = useCartStore(state => state.items) ?? [];
    const { setCartItems, setTotalItems } = useCartStore();

    const onUpdateCartItem = async (itemId: string, quantity: number) => {
                
        const cartItem = await updateCartItems(itemId, quantity!);
                
        if( !cartItem ) return;   
                
        const updatedCartItems = cartItemsStore?.map(item => {
            if( item.id === cartItem.id ) return cartItem;
            return item;
        });

        setCartItems( updatedCartItems )
        setTotalItems( updatedCartItems.reduce((prevValue, currentValue) => prevValue + currentValue.quantity , 0) );
        router.refresh();
    }
     
    const removeItemFromCart = async (itemId: string) => {
        const cartItem = await removeProductFromCart(itemId!);
                
        if( !cartItem ) return;   
                
        const updatedCartItems = cartItemsStore?.filter(item => item.id !== itemId);

        setCartItems( updatedCartItems );
        setTotalItems( updatedCartItems.reduce((prevValue, currentValue) => prevValue + currentValue.quantity , 0) );
        router.refresh();
    }

    return (
        <div className='flex flex-col mt-5'>
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true
                }
              )}
            >
              <IoCardOutline size={25} />
              <span className='ml-2'>Pagada</span>              
            </div>
          
            {/* Items */}
            {
                cartItemsStore.map(({product, quantity, id}) => (
                    <div key={product!.id} className='flex my-1'>
                        <Image
                            src={product!.image}
                            alt={product!.title}
                            width={100}
                            height={100}
                            style={{
                            width: '100px',
                            height: '100px' 
                            }}
                            className='mr-5 rounded'
                        />

                        <div>
                            <p>{ product!.title }</p>
                            <p>${ product!.price } * { quantity }</p>
                            <p className='font-bold'>Subtotal: ${ Number(product!.price) * quantity }</p>
                        </div>
                    </div>
                ))            
            }
        </div>
    )
}

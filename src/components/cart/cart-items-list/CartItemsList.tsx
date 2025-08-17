'use client'

import { CartItem } from "@/interfaces/cart.interface"
import { useCartStore } from "@/store/cart/cart-store"
import Image from "next/image"
import { QuantitySelector } from "../../product/quantity-selector/QuantitySelector"
import { removeProductFromCart, updateCartItems } from "@/cart/actions/actions"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IoCartOutline } from "react-icons/io5"

export const CartItemsList = () => {

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

    if( !cartItemsStore.length )
        return (
            <div className="flex flex-col items-center justify-center">
                <IoCartOutline size={80} />                
                <span className='text-xl'>Agrega articulos a tu carrito</span>
                <Link href="/" className='underline mb-5 text-3xl'>
                    Ir a productos
                </Link>
            </div> 
        );
        
    return (
        <div className='flex flex-col mt-5'>
            <span className='text-xl'>Agregar mas articulos</span>
            <Link href="/" className='underline mb-5'>
              Continúa comprando
            </Link>
          
            {/* Items */}
            {
                cartItemsStore.map(({product, quantity, id}) => (
                    <div key={product!.id} className='flex mb-5 p-3 shadow-lg rounded'>                    
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

                        <div className="flex w-full flex-col justify-between">
                            <div>
                                <p>{ product!.title }</p>
                                <p>${ product!.price }</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <QuantitySelector quantity={ quantity } onChangeQuantity={ quantity => onUpdateCartItem(id, quantity)} />
                                <button className='underline cursor-pointer' onClick={() => removeItemFromCart(id) }>
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                ))            
            }
        </div>
    )
}

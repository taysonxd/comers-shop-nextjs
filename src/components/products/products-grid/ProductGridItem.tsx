'use client'

import { setProductToCart } from '@/cart/actions/actions'
import { Product } from '@/interfaces/product.interface'
import { useCartStore } from '@/store/cart/cart-store'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { redirect, useRouter } from 'next/navigation'
import { IoCartOutline, IoStarSharp } from 'react-icons/io5'

interface Props {
    product: Product
}

export const ProductGridItem = ({ product }: Props) => {

    const { status } = useSession();
    const router = useRouter();
        
    const cartItems = useCartStore(state => state.items) ?? []
    const { setCartItems, setTotalItems } = useCartStore();    
    
    const onAddToCart = async () => {
                
        if (status === 'unauthenticated')
            redirect('/api/auth/signin');

        const cartItem = await setProductToCart(product.id!);
                
        if( !cartItem ) return;   
        
        const updatedCartItems = [ cartItem, ...cartItems?.filter(item => item.id !== cartItem.id ) ];
        
        setCartItems( updatedCartItems )
        setTotalItems( updatedCartItems.reduce((prevValue, currentValue) => prevValue + currentValue.quantity , 0) );        
        router.refresh();
    }
        
    return (
        <div className='flex flex-col rounded-md overflow-hidden fade-in items-center'>
            <Image
                src={product.image}
                alt="Product image"
                className='w-full object-fill rounded'
                style={{
                    width: 350,
                    height: 350
                }}
                width={550}
                height={550}                
            />            

            <div className="flex justify-between">

                <div className='p-4 flex flex-col'>
                    <span className='font-bold'>
                        { product.title }
                    </span>
                    <span className='font-light text-xs mb-2'>
                        { product.description }
                    </span>
                    <div className='flex items-center'>
                        <span className='font-bold'>${ Number(product.price).toFixed(2) }</span>
                        <div className='flex ml-2'>
                            {
                                Array.from({ length: product.rating.rate }, (_, i) => ++i ).map(rate => (
                                    <span key={rate}>
                                        <IoStarSharp className='text-blue-500' />
                                    </span>
                                ))
                            }                        
                        </div>
                        <span className='font-semibold ml-1'>
                            ({ product.rating.count })
                        </span>
                        <button
                            onClick={ onAddToCart }
                            className="ml-auto flex gap-1 items-center border-1 border-blue-300 bg-blue-600 p-1 rounded cursor-pointer text-white hover:bg-transparent hover:text-black hover:border-black transition-all"
                        >
                            <span className='flex'>
                                Añadir
                            </span>
                            <span className="cursor-pointer font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">   
                                <IoCartOutline size={20} />
                            </span>                    
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

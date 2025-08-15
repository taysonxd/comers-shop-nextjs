'use client'

import { setProductToCart } from '@/cart/actions/actions'
import { Product } from '@/interfaces/product.interface'
import { useCartStore } from '@/store/cart/cart-store'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { IoAddCircleOutline, IoStarOutline, IoStarSharp, IoTrashOutline } from 'react-icons/io5'

interface Props {
    product: Product
}

export const ProductGridItem = ({ product }: Props) => {

    const router = useRouter();
        
    const cartItems = useCartStore(state => state.items) ?? []
    const { setCartItems, setTotalItems } = useCartStore();    
    
    const onAddToCart = async () => {
        const cartItem = await setProductToCart(product.id!);
                
        if( !cartItem ) return;   
        
        const updatedCartItems = [ cartItem, ...cartItems?.filter(item => item.id !== cartItem.id ) ];
        setCartItems( updatedCartItems )
        setTotalItems( updatedCartItems.reduce((prevValue, currentValue) => prevValue + currentValue.quantity , 0) );
        router.refresh();
    }
        
    return (
        <div className='rounded-md overflow-hidden fade-in'>            
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
                    </div>
                </div>

                <div className="flex items-center">
                    <span>
                        <button
                            onClick={ onAddToCart }
                            className="cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <IoAddCircleOutline size={30} />
                        </button>                    
                    </span>
                </div>
            </div>

        </div>
    )
}

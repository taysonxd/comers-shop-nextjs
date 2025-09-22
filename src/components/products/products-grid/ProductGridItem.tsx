'use client'

import { AddToCartButton } from '@/components'
import { Product } from '@/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'

import { IoCartOutline, IoStarSharp } from 'react-icons/io5'

interface Props {
    product: Product
}

export const ProductGridItem = ({ product }: Props) => {

    return (
        <div className='flex flex-col rounded-md overflow-hidden fade-in items-center hover:shadow-2xl transition duration-500 ease-in-out'>
            <Link href={`/product/${product.id}`}>
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
            </Link>

            <div className="flex p-4 flex-col justify-between h-[180px]">

                <Link className='hover:text-blue-500' href={`/product/${product.id}`}>                    
                    <span className='font-bold text-ellipsis line-clamp-2'>
                        { product.title }
                    </span>
                </Link>
                <span className='font-light text-xs mb-2 text-ellipsis line-clamp-3'>
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
                    <AddToCartButton
                        product={product}
                        className="ml-auto flex gap-1 items-center border-1 border-blue-300 bg-blue-600 p-1 rounded cursor-pointer text-white hover:bg-transparent hover:text-black hover:border-black transition duration-500"
                    >
                        <span className='flex'>
                            Añadir
                        </span>
                        <span className="cursor-pointer font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">   
                            <IoCartOutline size={20} />
                        </span>                    
                    </AddToCartButton>
                </div>                
            </div>

        </div>
    )
}

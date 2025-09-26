'use client'

import { useCartStore } from "@/store/cart/cart-store"
import Image from "next/image"
import Link from "next/link"
import { IoCartOutline } from "react-icons/io5"

export const CheckoutItemsList = () => {

    const { cart } = useCartStore();

    if( !cart.length )
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
            <span className='text-xl'>Editar articulos del carrito</span>
            <Link href="/cart" className='underline mb-5'>
              Editar carrito
            </Link>
          
            {/* Items */}
            {
                cart.map(({productId, product, quantity, id}) => (
                    <div key={productId} className='flex mb-5'>
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

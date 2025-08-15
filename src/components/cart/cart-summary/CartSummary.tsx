'use client'

import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link"
import { useEffect, useState } from "react";

export const CartSummary = () => {
    const cartItemsStore = useCartStore(state => state.items ?? []);
    const totalItems = useCartStore(state => state.totalItems) ?? 0;
    const [ subTotal, setSubtotal ] = useState(0);

    useEffect(() => {        
        setSubtotal( cartItemsStore.reduce((prevValue, currentValue) => prevValue + ( currentValue.quantity * Number(currentValue.product!.price)), 0) );
    }, [cartItemsStore]);    
        
    return (
        <>
            <h2 className='text-2xl mb-2'>Resumen de la orden</h2>

            <div className='grid grid-cols-2'>
                <span>No. Productos</span>
                <span className='text-right'>{ totalItems } articulos</span>

                <span>Subtotal</span>
                <span className='text-right'>$ { subTotal.toFixed(2) } </span>
                
                <span>Impuestos (15%)</span>
                <span className='text-right'>$ { (subTotal * 0.15).toFixed(2) }</span>

                <span className='mt-5 text-2xl'>Total</span>
                <span className='mt-5 text-2xl text-right'>$ { ( subTotal + (subTotal * 0.15) ).toFixed(2) }</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
            {
                !totalItems
                    ? (<button className="w-full bg-gray-300 text-center rounded text-1xl py-2" >Checkout</button>)
                    : (<Link className="flex btn-primary justify-center" href="/checkout" >
                        Checkout
                        </Link>
                    )
            }   
            </div>
        </>
    )
}

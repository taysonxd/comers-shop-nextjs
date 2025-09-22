'use client'

import { getCartItems } from "@/cart/actions/actions"
import { titleFont } from "@/config/fonts"
import { CartItem } from "@/interfaces/cart.interface"
import { Category } from "@/interfaces/product.interface"
import { useUiStore } from "@/store"
import { useCartStore } from "@/store/cart/cart-store"

import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

interface Props {    
    cartItems: CartItem[]    
}

const categories: Record<keyof typeof Category, string> = {
    'electronics': 'Electrónicos',
    'jewelery': 'Joyeria',
    'men_s_clothing': 'Hombres',
    'women_s_clothing': 'Mujeres'
}

export const TopMenu = ({ cartItems = [] }: Props) => {
        
    const { setCart } = useCartStore();
    const totalItems = useCartStore(state => state.getTotalItems());
    
    const { openSideMenu } = useUiStore();            
    const [loaded, setLoaded] = useState(false)
    
    useEffect(() => {                        
        setCart(cartItems);  
        setLoaded(true);
    }, [cartItems, setCart]);
        
    return (
        <nav className="fixed bg-white top-0 z-10 flex px-5 justify-between items-center w-full">
            <div>
                <Link href="/">
                    <span className={`${ titleFont.className} antialiased font-bold`}>Comers</span>
                    <span> | Shop</span>
                </Link>
            </div>

            <div className="hidden sm:block">
            {
                Object.entries(categories).map(category =>(
                    <Link
                        key={category[0]}
                        className="capitalize m-2 p-2 rounded-md transition-all hover:bg-gray-100" href={`/category/${category[0]}`}
                    >
                        { category[1] }
                    </Link>
                ))
            }                
            </div>

            <div className="flex items-center">
                
                <Link href={ (loaded && totalItems > 0 ) ? "/cart" : '/empty' }>
                    <div className="relative">
                        {
                            (loaded && totalItems > 0) && (
                                <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                    { totalItems }
                                </span>
                            )                                
                        }
                        <IoCartOutline className="h-5 w-5"/>
                    </div>
                </Link>

                <button onClick={ openSideMenu } className="m-2 p-2 mx-3 rounded-md transition-all hover:bg-gray-100">
                    Menú
                </button>
            </div>
        </nav>
    )
}

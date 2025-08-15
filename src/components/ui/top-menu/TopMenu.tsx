'use client'

import { getCartItems } from "@/cart/actions/actions"
import { titleFont } from "@/config/fonts"
import { CartItem } from "@/interfaces/cart.interface"
import { Category } from "@/interfaces/product.interface"
import { useUiStore } from "@/store"
import { useCartStore } from "@/store/cart/cart-store"

import Link from "next/link"
import { useEffect } from "react"
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
    
    const totalItems = useCartStore(state => state.totalItems ?? 0);
    const { setCartItems, setTotalItems } = useCartStore();
    
    const { openSideMenu } = useUiStore();            

    useEffect(() => {
        const totalQuantity = cartItems.reduce((prevValue, currentValue) => prevValue + currentValue.quantity , 0);
        
        setTotalItems(totalQuantity);
        setCartItems(cartItems);  
    }, [cartItems, totalItems, setCartItems, setTotalItems]);
        
    return (
        <nav className="flex px-5 justify-between items-center w-full">

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
                
                <Link href="/cart">
                    <div className="relative">
                        {
                            !!totalItems && (
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

'use client'

import { setProductToCart } from '@/cart/actions/actions';
import { Product } from '@/interfaces/product.interface';
import { useCartStore } from '@/store';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

interface Props {
  children: React.ReactNode;
  product: Product;
  quantity?: number;
  className: React.StyleHTMLAttributes<HTMLButtonElement>["className"];
}

export const AddToCartButton = ({ children, product, quantity = 1, className }: Props) => {

  const cartItems = useCartStore(state => state.cart) ?? []
  const { setCart } = useCartStore()
  const router = useRouter()
  const { status } = useSession()
    
  const onAddToCart = async () => {
                
    if (status === 'unauthenticated')
      redirect('/api/auth/signin');
    
    const cartItem = await setProductToCart(product.id!, quantity);
        
    if( !cartItem ) return;   
        
    const updatedCartItems = [ cartItem, ...cartItems?.filter(item => item.id !== cartItem.id ) ];
    
    setCart( updatedCartItems )        
    router.refresh();
  }

  return (
    <button
      onClick={ onAddToCart }
      className={className}      
    >
    {
      children
    }
    </button>    
  )
}

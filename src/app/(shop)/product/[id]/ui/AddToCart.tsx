'use client'

import { AddToCartButton, QuantitySelector } from '@/components'
import type { Product } from '@/interfaces/product.interface'
import React, { useState } from 'react'

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {
  
  const [quantity, setQuantity] = useState(1);
  
  return (
    <>      
      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onChangeQuantity={setQuantity} />

      {/* Button */}
      <AddToCartButton product={product} quantity={quantity} className="btn-primary my-5">
        Agregar la carrito
      </AddToCartButton>      
    </>
  );
}

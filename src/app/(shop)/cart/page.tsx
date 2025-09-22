import Link from 'next/link';
import { Title } from '../../../components/ui/title/Title';

import { CartItemsList, CartSummary, QuantitySelector } from '@/components';

export default function() {

  return (
    <div className="flex justify-center items-center px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />
    
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          
          {/* Items */}
          <CartItemsList />          

          {/* Checkout - Resumen de las ordenes */}          
            <CartSummary />
        </div>
      </div>
    </div>
  );
}

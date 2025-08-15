import Link from 'next/link';
import { Title } from '../../../components/ui/title/Title';

import Image from 'next/image';
import { CheckoutItemsList, CheckoutSummary } from '@/components';


export default function() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          
          {/* Items */}
          <CheckoutItemsList />          

          {/* Checkout - Resumen de las ordenes */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <CheckoutSummary />
          </div>

        </div>
      </div>
    </div>
  );
}

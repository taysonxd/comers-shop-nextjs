import Link from 'next/link';

import Image from 'next/image';
import { OrderItemsList, Title, OrderSummary } from '@/components';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function({ params }: Props) {

  const { id } = await params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* Items */}
          <OrderItemsList />

          {/* Checkout - Resumen de las ordenes */}
          <div className='bg-white rounded-xl shadow-xl p-7'>            
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

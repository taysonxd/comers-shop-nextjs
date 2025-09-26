
import { OrderItemsList, Title, OrderSummary } from '@/components';
import { redirect } from 'next/navigation';
import { getOrderById } from '@/actions';
import { OrderStatus } from '@/components/order/order-status/OrderStatus';

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function({ params }: Props) {

  const { id } = await params;
  const { data: { order }, success }: any = await getOrderById(id);
    
  if( !success )
    redirect('/');
    
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          <div className='flex flex-col mt-5'>          
            <OrderStatus isPaid={order.isPaid} /> 

            {/* Items */}
            <OrderItemsList items={order.OrderItem} />
          </div>

          {/* Checkout - Resumen de las ordenes */}
          <div className='bg-white rounded-xl shadow-xl p-7'>            
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}

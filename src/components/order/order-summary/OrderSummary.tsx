"use client";

import { useAddressStore } from "@/store";
import { useCartStore } from "@/store/cart/cart-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoCardOutline } from "react-icons/io5";
import { OrderStatus } from "../order-status/OrderStatus";
import { currencyFormat } from "@/utils/currencyFormat";

interface Props {
  order: {
      id: string;
      subTotal: number;
      tax: number;
      total: number;
      itemsInOrder: number;
      isPaid: boolean;
      createdAt: Date;
      OrderAddress: Address;
      OrderItem: {
          id: string;
          productId: string;
          quantity: number;
          size: string;
          price: number;
          image: string;
      }[]
  };
}

export const OrderSummary = ({ order }: Props) => {
    const { data: session } = useSession();
  console.log(order);
  
    const cartItemsStore = useCartStore((state) => state.cart);
    const {
      firstName,
      lastName,
      address,
      address2,
      city,
      countryId,
      phone,
      postalCode
    } = useAddressStore( state => state.address );
    const { getTotalItems } = useCartStore();
    const [subTotal, setSubtotal] = useState(0);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setSubtotal(
          cartItemsStore.reduce(
            (prevValue, currentValue) => prevValue + currentValue.quantity * Number(currentValue.product!.price), 0
          )
        );
        setLoaded(true);
    }, [cartItemsStore]);
        
    return (
        <>
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>

            <div className="mb-10">
                <p className="text-xl">
                  { firstName } {lastName }
                </p>
                <p>{ address }</p>
                <p>{ address2 }</p>
                <p>{ city }, { countryId }</p>
                <p>{ postalCode }</p>
                <p>{ phone }</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order.subTotal === 1
                  ? "1 artículo"
                  : `${order.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>

              <span>Impuestos</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order.total)}
              </span>
            </div>

            <div className='mt-5 mb-2 w-full'>
            {order.isPaid ? (
              <OrderStatus isPaid={order.isPaid} />
            ) : (
              <>Boton</>
              // <PayPalButton orderId={order!.id} amount={order!.total} />
            )}
            </div>
        </>
    );
};

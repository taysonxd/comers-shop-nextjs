"use client";

import { useCartStore } from "@/store/cart/cart-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCardOutline } from "react-icons/io5";

export const OrderSummary = () => {
    const { data: session } = useSession();

    const cartItemsStore = useCartStore((state) => state.items ?? []);
    const totalItems = useCartStore((state) => state.totalItems) ?? 0;
    const [subTotal, setSubtotal] = useState(0);

    useEffect(() => {
        setSubtotal(
        cartItemsStore.reduce(
            (prevValue, currentValue) =>
            prevValue +
            currentValue.quantity * Number(currentValue.product!.price),
            0
        )
        );
    }, [cartItemsStore]);

    return (
        <>
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>

            <div className="mb-10">
                <p className="text-xl">{ session?.user?.name }</p>
                <p>+1 123 456 789</p>
                <p>Av. Calle 200</p>
                <p>Cdad. Montenegro</p>
                <p>Cordoba</p>
                <p>652965</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">{totalItems} articulos</span>

                <span>Subtotal</span>
                <span className='text-right'>$ { subTotal.toFixed(2) } </span>

                <span>Impuestos (15%)</span>
                <span className='text-right'>$ { (subTotal * 0.15).toFixed(2) }</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className='mt-5 text-2xl text-right'>$ { ( subTotal + (subTotal * 0.15) ).toFixed(2) }</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true
                  }
                )}
              >
                <IoCardOutline size={25} />
                <span className='ml-2'>Pagada</span>              
              </div>
            </div>
        </>
    );
};

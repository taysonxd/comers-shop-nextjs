"use client";

import { useCartStore } from "@/store/cart/cart-store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CheckoutSummary = () => {
    const { data: session } = useSession();

    const { cart } = useCartStore();
    const totalItems = useCartStore((state) => state.getTotalItems());
    const [subTotal, setSubtotal] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setSubtotal(
            cart.reduce(
            (prevValue, currentValue) =>
            prevValue +
            currentValue.quantity * Number(currentValue.product!.price),
            0
        ));
        setLoaded(true);
    }, [cart]);

    if( !loaded )
        return (<></>);

    return (
        <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
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

            <div className="mt-5 mb-2 w-full">
                {/* Disclaimer */}
                <p className="mb-5">
                    <span className="tx-xs">
                        Al hacer click en &quot;Confirmar orden&quot; aceptar nuestros{" "}
                        <Link href="/" className="underline">
                            términos y condiciones
                        </Link>{" "}
                        y{" "}
                        <Link className="underline" href="#">
                            políticas de privacidad
                        </Link>
                    </span>
                </p>
                <Link className="flex btn-primary justify-center" href="/orders/253">
                    Confirmar orden
                </Link>
            </div>
        </div>
    );
};

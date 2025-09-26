"use client";

import { placeOrder } from "@/actions";
import { ProductToOrder } from "@/interfaces";
import { useAddressStore } from "@/store";
import { useCartStore } from "@/store/cart/cart-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const CheckoutSummary = () => {
    
    const router = useRouter();
    const { cart } = useCartStore();
    const { subTotal, tax, total, totalItems } = useCartStore(
        useShallow((state) => state.getOrderSummary())
    );
    const clearCart = useCartStore(state => state.clearCart);
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
    
    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoaded(true);
    }, []);

    const onPlaceOrder = async() => {
        setErrorMessage('');
        setIsPlacingOrder(true);

        const productsToOrder = cart.map(item => ({
            id: item.productId,
            quantity: item.quantity,
        })) as ProductToOrder[];
        
        const storedAddress = {
            firstName,
            lastName,
            address,
            address2,
            city,
            countryId,
            phone,
            postalCode
        };
        const resp = await placeOrder(storedAddress, productsToOrder);
                
        if( !resp.success ) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }
        
        setIsPlacingOrder(false);
        clearCart();
        router.replace(`/orders/${ resp.data?.order.id }`);
    }

    if (!loaded) return (<p>Cargando...</p>);

    return (
        <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
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
                <span className="text-red-500">{ errorMessage }</span>
                <button
                    disabled={isPlacingOrder}
                    onClick={onPlaceOrder}
                    className={clsx({
                        "btn-primary": !isPlacingOrder,
                        "btn-disabled": isPlacingOrder,
                    })}
                >
                    Confirmar orden
                </button>
            </div>
        </div>
    );
};

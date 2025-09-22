'use client'

import { destroyBackendSession } from '@/auth/actions/auth-actions';
import { useCartStore } from '@/store/cart/cart-store';
import { signIn, signOut, useSession } from 'next-auth/react'
import { CiLogout } from 'react-icons/ci'
import { IoLogOut, IoShieldOutline } from 'react-icons/io5';

export const LogoutButton = () => {

    const { status } = useSession();
    const { clearCart } = useCartStore();
    
    const onLogoutSession = async () => {
        await destroyBackendSession();
        clearCart();
        signOut();
    }

    if( status === 'loading')
        return (
            <button className="px-4 py-3 cursor-pointer flex items-center space-x-4 rounded-md text-gray-500 group">
                <IoShieldOutline size={25} />
                <span className="group-hover:text-gray-800 font-semibold text-xl">...Espere</span>
            </button>
        )

    if( status === 'unauthenticated')
        return (
            <button
                onClick={() => signIn()}
                className="px-4 py-3 cursor-pointer flex items-center space-x-2 rounded-md text-gray-500 group"
            >
                <IoLogOut size={25} />
                <span className="group-hover:text-gray-800 font-semibold text-xl">Ingresar</span>
            </button>
        )

    return (
        <button
            onClick={onLogoutSession}
            className="px-4 py-3 cursor-pointer flex items-center space-x-2 rounded-md text-gray-500 group"
        >
            <CiLogout size={25} />
            <span className="group-hover:text-gray-800 font-semibold text-xl">Salir</span>
        </button>
    )
}

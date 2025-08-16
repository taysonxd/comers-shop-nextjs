'use client'

import { destroyBackendSession } from '@/app/actions/auth/auth-actions';
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
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <IoShieldOutline />
                <span className="group-hover:text-gray-700">...Espere</span>
            </button>
        )

    if( status === 'unauthenticated')
        return (
            <button
                onClick={() => signIn()}
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            >
                <IoLogOut />
                <span className="group-hover:text-gray-700">Ingresar</span>
            </button>
        )

    return (
        <button
            onClick={onLogoutSession}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        >
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    )
}

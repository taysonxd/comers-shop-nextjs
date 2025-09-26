'use server'

import { fetchOrderById } from "@/services/orders";
import { getServerSession } from "next-auth";

export const getOrderById = async(id: string) => {

    const session = await getServerSession();        
    const userSession = session?.user;

    if( !userSession )
        return {
            ok: false,
            message: 'No hay sesión activa'
        };

    return await fetchOrderById(id);        
};
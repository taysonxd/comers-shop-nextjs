'use server'

import { Address, ProductToOrder } from "@/interfaces"
import { storeOrder } from "@/services/orders";
import { getServerSession } from "next-auth";

export const placeOrder = async (address: Address, products: ProductToOrder[]) => {

    const session = await getServerSession();        
    const userSession = session?.user;

    if( !userSession )
        return {
            ok: false,
            message: 'No hay sesión activa'
        };

    return await storeOrder(address, products);
}
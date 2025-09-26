'use server'

import { Address } from "@/interfaces"
import { upsertUserAddress } from "@/services/users";

export const setUserAddress = async(address: Address, userId: string) => {
    try {                
        const newAddress= await upsertUserAddress(address, userId);

        return {
            ok: true,
            data: newAddress
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al almacenar los datos'
        };
    }
}

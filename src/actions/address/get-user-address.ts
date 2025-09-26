'use server'

import prisma from "@/lib/prisma";
import { findUserAddress } from "@/services/users";

export const getUserAddress = async(userId: string) => {
    try {
        const newAddress= await findUserAddress(userId);
                
        return {
            ok: true,
            data: newAddress
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Ha ocurrido un error',
            data: {}
        }
    }
}
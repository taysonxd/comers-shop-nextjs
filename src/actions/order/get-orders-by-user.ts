'use server'

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getOrdersByUser = async() => {

    const session = await getServerSession();

    if( !session?.user )
        return {
            ok: false,
            message: 'No hay sesión activa'
        };

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });

    return {
        ok: true,
        data: orders
    }
};
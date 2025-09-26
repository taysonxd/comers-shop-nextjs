'use server'

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getPaginatedOrders = async() => {

    const session = await getServerSession();

    if( session?.user.role !== 'admin' )
        return {
            ok: false,
            message: 'No hay sesión activa'
        };

    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: 'desc'
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
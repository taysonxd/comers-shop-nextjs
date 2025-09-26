import { env } from "@/config/env";
import { fetchWithSession } from "../helper";
import { Address, ProductToOrder } from "@/interfaces";

export const fetchOrderById = async (orderId: string) => {

    const response = await fetchWithSession(`${env.BACKEND_URL}/api/orders/${orderId}`, {
        method: 'GET',        
    });
        
    if (!response.success)
        throw new Error(response.message);

    return response;
}

export const storeOrder = async (address: Address, productsToOrder: ProductToOrder[]) => {

    const body = {
        address,
        products: productsToOrder
    }
        
    const response = await fetchWithSession(`${env.BACKEND_URL}/api/orders`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.success)
        throw new Error(response.message);

    return response;   
}
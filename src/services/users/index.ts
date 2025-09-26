import { Address } from "@/interfaces";
import { fetchWithSession } from "../helper";
import { env } from "@/config/env";

export const findUserAddress = async (userId: string) => {

    const response = await fetchWithSession(`${env.BACKEND_URL}/api/users/address/${userId}`, {
        method: 'GET'
    });
        
    if( !response.success )
        throw new Error(response.message);

    return response.data
}

export const upsertUserAddress = async(address: Address, userId: string): Promise<Address> => {
    
    const body = { ...address, userId };
        
    const response = await fetchWithSession(`${env.BACKEND_URL}/api/users/address`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
        
    if (!response.success)
        throw new Error(response.message);

    return response.data;
}
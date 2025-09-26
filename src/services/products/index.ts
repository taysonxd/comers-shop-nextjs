import { env } from "@/config/env";
import { fetchWithSession } from "../helper";
import { Product } from "@/interfaces/product.interface";

export const getProducts = async(queryParams: {
    category?: string;
    query?: string;
    page?: string;
    priceMin?: string;
    priceMax?: string;
    orderBy?: string;
}): Promise<any> => {
    
    const params = new URLSearchParams(queryParams);
        
    const response = await fetch(`${env.BACKEND_URL}/api/products${ !params.toString() ? '' : `?${params.toString()}` }`, {
        method: 'GET',                
    }).then(res => res.json());
                
    if (!response.success)
        throw new Error(response.message);

    return response.data;
}

export const getProductById = async(id: string): Promise<Product> => {

    const response = await fetch(`${env.BACKEND_URL}/api/products/${id}`,{
        method: 'GET'
    }).then(res => res.json());

    if (!response.success)
        throw new Error(response.message);
    
    return response.data
}

export const storeProduct = async({ title, price, description, category, image, rating }: Product): Promise<Product> => {

    const body = { title, price, description, category, image, rating };
    
    const response = await fetchWithSession(`${env.BACKEND_URL}/api/products`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
        
    if (!response.success)
        throw new Error(response.message);

    return response.data;
}
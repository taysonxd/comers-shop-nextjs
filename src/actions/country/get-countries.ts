import { fetchWithSession } from "@/services/helper";
import { env } from "@/config/env";
import { Country } from "@/interfaces/country.interface";

type funcReturn = {
    ok: boolean;
    message?: string;
    countries: Country[];
}

export const getCountries = async (): Promise<funcReturn> => {    
    try {
        
        const { data } = await fetchWithSession(`${env.BACKEND_URL}/api/countries`, {
            method: 'GET'
        });

        return {
            ok: true,
            countries: data
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'No se pudo obtener los paises',
            countries: []
        }
    }
}
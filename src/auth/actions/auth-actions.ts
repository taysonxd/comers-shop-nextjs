'use server';

import { fetchWithSession } from '@/api/helper';
import { env } from '@/config/env';
import { cookies } from 'next/headers';

export async function destroyBackendSession() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const response = await fetchWithSession(`${env.BACKEND_URL}/api/auth/signOut`, {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json',
            "Cookie": `access_token=${accessToken}`,
        }
    });
        
    if (!response.ok)
        throw new Error(response.message);

    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    return true;  
}
'use server';

import { fetchWithSession } from '@/api/helper';
import { env } from '@/config/env';
import { cookies } from 'next/headers';

export async function destroyBackendSession() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    const response = await fetchWithSession(`${env.BACKEND_URL}/api/auth/signOut`, {
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json',
            "Cookie": `refresh-token=${refreshToken}`,
        }
    }).then(res => res.json());
            
    if (!response.success)
        throw new Error(response.message);

    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    return response.data;
  
}
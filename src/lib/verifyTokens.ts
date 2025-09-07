import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getValidAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;
    
  if (!accessToken && !refreshToken) return null;   
  
  const isExpired = checkIfExpired(accessToken!);
    
  if (!isExpired) return accessToken!;
  
  const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh_access_token`, {
    method: 'POST',
    headers: {
      "Cookie": `refresh_token=${refreshToken}`,      
    },
    cache: 'no-store',
  });

  if (!res.ok)
    throw new Error("Token cannot be created");    

  const { accessToken: newAccess, refresToken: newRefresh } = await res.json();

  cookieStore.set('access_token', newAccess, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
  });

  cookieStore.set('refresh_token', newRefresh, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
  });

  return newAccess;
}

function checkIfExpired(token: string): boolean {
  try {
    const payload = jwt.decode(token) as { exp: number };        
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
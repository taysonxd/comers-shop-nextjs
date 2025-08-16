import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getValidAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;
    
  if (!accessToken && !refreshToken) return null;   
  
  const isExpired = checkIfExpired(accessToken!);

  if (!isExpired) return accessToken!;
  
  const res = await fetch(`${process.env.AUTH_API}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const { access_token, refresh_token: newRefresh } = await res.json();

  cookieStore.set('access_token', access_token, {
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

  return access_token;
}

function checkIfExpired(token: string): boolean {
  try {
    const payload = jwt.decode(token) as { exp: number };
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
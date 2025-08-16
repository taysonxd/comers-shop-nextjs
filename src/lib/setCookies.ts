
export const dynamic = 'force-dynamic';

import { env } from '@/config/env';
import { cookies } from 'next/headers';

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const isProd = env.NODE_ENV === 'production';
  const domain = isProd ? env.NEXTAUTH_URL : undefined;

  const options = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' as const : 'lax' as const,
    path: '/',
    domain,
  };

  const cookieStore = await cookies();
  cookieStore.set('access_token', accessToken, options);
  cookieStore.set('refresh_token', refreshToken, options);
}

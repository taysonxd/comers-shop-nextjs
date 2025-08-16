import { getValidAccessToken } from "@/lib/verifyTokens";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function fetchWithSession(url: string, options: RequestInit = {}): Promise<any> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  
  const token = await getValidAccessToken();
                
  if (!token)
      return new NextResponse('Unauthorized', { status: 401 });

  return await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      "Cookie": `access-token=${accessToken}`,
      ...options.headers,      
    },
  });
}
import { getValidAccessToken } from "@/lib/verifyTokens";
import { cookies } from "next/headers";

export async function fetchWithSession(url: string, options: RequestInit = {}): Promise<any> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  
  const token = await getValidAccessToken();
                                
  if (!token)
    throw new Error("Unauthorized");      
  
  const result = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      "Cookie": `access_token=${accessToken}`,
      ...options.headers,      
    },
  });

  const data = await result.json();
  return data;
}
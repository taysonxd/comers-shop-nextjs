import { getValidAccessToken } from "@/lib/verifyTokens";

export async function fetchWithSession(url: string, options: RequestInit = {}): Promise<any> {
  
  const token = await getValidAccessToken();
                                
  if (!token)
    throw new Error("Unauthorized");
  
  const result = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      "Cookie": `access_token=${token}`,
      ...options.headers,      
    },
  });

  const data = await result.json();
  return data;
}
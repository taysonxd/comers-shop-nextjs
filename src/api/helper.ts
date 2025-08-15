import { cookies } from "next/headers";

export async function fetchWithSession(url: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const sessionToken = process.env.NODE_ENV === "production"
        ? cookieStore.get("__Secure-next-auth.session-token")?.value
        : cookieStore.get("next-auth.session-token")?.value;
        
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Cookie": `next-auth.session-token=${sessionToken}`,
      },
    });
  }
import { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/config/env";
import { setAuthCookies } from "@/lib/setCookies";

export const authOptions = {    
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
      }),
      // ...add more providers here
    ],  
    session: {
      strategy: 'jwt' as SessionStrategy,
    },    
    callbacks: {
      async jwt({ token, account }: { token: any, account: any }) {
        
        if (account?.id_token) {
          
          const response = await fetch(`${env.BACKEND_URL}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ idToken: account.id_token }),
          }).then(res => res.json());

          const { data } = response;
                    
          if (data.accessToken && data.refreshToken) {
            setAuthCookies(data.accessToken, data.refreshToken);
            token.id = data.user.id;
          }
        }                    
                
        return token;
      },
      async session({ session, token }: { session: any, token:any }) {
                
        if( session && session.user ) {                    
          session.user.id = token.id;
        }
        return session;
      },      
    }
  }
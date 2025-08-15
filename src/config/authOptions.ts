import { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
// import { SigninWithEmailPassword } from "@/auth/actions/auth-actions";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Correo electronico", type: "text", placeholder: "usuario@email.com" },
          password: { label: "Contraseña", type: "password" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          // const user = await SigninWithEmailPassword(credentials!.email, credentials!.password);
  
          // if (user) {
          //   // Any object returned will be saved in `user` property of the JWT
          //   return user;
          // }
          
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          return null;
        }
      })
      // ...add more providers here
    ],
  
    session: {
      strategy: "database" as SessionStrategy,
      maxAge: 30 * 24 * 60 * 60,
    },
    cookies: {
      sessionToken: {
        name: process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
        options: {
          httpOnly: true,
          sameSite: "lax" as any,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        },
      },
    },
    callbacks: {
      //  TODO Releer advertencia de TS para entenderla
      async signin({ user, account, profile, email ,credentials }: { user: any, account: any, profile?: any, email?: any ,credentials?: any }) {
        return true;
      },     
  
      async session({ session, user }: { session: any, user: any }) {
              
        if( session && session.user ) {
          session.user.role = user.role || 'no-role';
          session.user.id = user.id;
        }
  
        return session
      }
    }
  }
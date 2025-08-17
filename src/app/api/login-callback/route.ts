// app/api/auth/post-login/route.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const cookieStore = await cookies();

  if (token?.accessToken && token?.refreshToken) {
    cookieStore.set("access_token", token.accessToken as string, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60, // 1h
    });

    cookieStore.set("refresh_token", token.refreshToken as string, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 30, // 30d
    });
  }

  // 👇 redirige usando NextResponse
  return NextResponse.redirect(new URL("/", req.url));
}

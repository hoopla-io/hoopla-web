import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt"; // Import NextAuth's JWT helper
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

// Create the intl middleware instance
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  // Define admin routes that require authentication
  const adminRoutes = ["/admin/send-email"]; // Add more admin routes as needed

  // Check if the current route is under a language prefix and matches an admin route
  const isAdminRoute = adminRoutes.some((route) =>
    path.match(new RegExp(`^/(uz|en|ru)${route}$`))
  );

  if (isAdminRoute) {
    // Check if the user has a valid session using the NextAuth JWT
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log({ token });

    // If no token is found, redirect to the sign-in page
    if (!token) {
      console.log(req.url);
      const signInUrl = new URL(`/en/auth/signin`, req.url);
      signInUrl.searchParams.set("callbackUrl", req.url); // Pass the current URL for redirection after login
      return NextResponse.redirect(signInUrl);
    }
  }

  // Proceed with the intl middleware for other cases
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/",
    "/(uz|en|ru)/:path*", // Include language-prefixed routes
    "/(uz|en|ru)/admin/:path*", // Specifically handle admin routes
  ],
};

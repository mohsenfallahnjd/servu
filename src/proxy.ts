import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const proxyConfig = {
  matcher: ["/dashboard/:path*", "/vehicles/:path*", "/login", "/register"],
};

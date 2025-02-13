import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
    const whitelistedRoutes = ["/login", "/register", "/api"];
    const staticAssets = ["/_next", "/static", "/favicon.ico"];
    const isStaticAsset = staticAssets.some(route => req.nextUrl.pathname.startsWith(route));
    const isWhitelistedRoute = whitelistedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

    if (isStaticAsset || isWhitelistedRoute) {
        return NextResponse.next();
    }

    const token = req.cookies.get("token");
    if (!token) {
        console.log("[BASIC] No token found.");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const response = await fetch("http://localhost:3000/api/checktoken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (data.message === "Token is valid") {
        console.log("[API] Token is valid.");
        return NextResponse.next();
    } else {
        console.log("[API] Token is invalid.");
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

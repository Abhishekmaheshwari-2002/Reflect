import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/collection(.*)",
    "/journal(.*)",
])

//shield and bot detection - arcjet 
const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
    ],
});


const clerk = clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();


    if (!userId && isProtectedRoute(req)) {
        return redirectToSignIn();
    }

    return NextResponse.next();


});

export default createMiddleware(aj, clerk);

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
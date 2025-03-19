import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in',
    '/sign-up',
    '/Home'
])

const isPublicApiRoute = createRouteMatcher([
    '/api/videos',
])


export default clerkMiddleware(async (auth, req) => {
    const {userId} = await auth();
    const currentUrl = new URL(req.url);

    const isAccessingDashboard = currentUrl.pathname === "/Home"
    const isApiRequest = currentUrl.pathname.startsWith("/api")


    if(userId && isPublicRoute(req) && !isAccessingDashboard){
        return NextResponse.redirect(new URL("/Home", req.url))
    }

    //not logged in
    if(!userId){
        if(!isPublicRoute(req) && !isPublicApiRoute(req)){
            return NextResponse.redirect(new URL("sign-in", req.url))
        }

        if(isApiRequest && !isPublicApiRoute(req)){
            return NextResponse.redirect(new URL("sign-in", req.url))
        }
            
    }

    return NextResponse.next()
} )

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
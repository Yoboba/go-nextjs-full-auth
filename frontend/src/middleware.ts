import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from '@/lib/cookies'
import { isRoute, routes } from '@/constants/routes'

export function middleware(request: NextRequest) {
    const jwt = getCookie("jwt")

    if (request.nextUrl.pathname === routes.SIGN_IN) {
        if (jwt !== undefined) {
            console.log("can't sign-in if already signed in")
            return NextResponse.redirect(new URL(routes.ROOT, request.url))
        } else {
            return NextResponse.next()
        }
    }
    console.log(request.nextUrl.pathname)
    console.log(isRoute(request.nextUrl.pathname))
}
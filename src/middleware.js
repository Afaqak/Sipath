import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth(
    function middleware(request) {
        console.log(request.nextauth.token.user, ":token")
        if (request.nextUrl.pathname.startsWith('/tutor') && !request.nextauth.token.user?.isTutor) {
            return NextResponse.rewrite(
                new URL(
                    '/denied', request.url))
        }
    }, {
    callbacks: {
        authorized: ({ req, token }) => !!token
    }
}
)


export const config = {
    matcher: ['/tutor/:path*']
}






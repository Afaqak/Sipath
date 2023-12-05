import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth({
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
}, function middleware(request) {

    if (request.nextUrl.pathname.startsWith('/tutor/new-course') && !request.nextauth.token.user?.isTutor) {
        return NextResponse.rewrite(
            new URL(
                '/denied', request.url))
    }
    if (request.nextUrl.pathname.startsWith('/tutor/new-quiz') && !request.nextauth.token.user?.isTutor) {
        return NextResponse.rewrite(
            new URL(
                '/denied', request.url))
    }

}, {

}
)


export const config = {
    matcher: []
}






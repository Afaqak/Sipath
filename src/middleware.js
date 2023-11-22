import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth(
    function middleware(request) {
        console.log(request.nextauth.token.user, ":token")
        if (request.nextUrl.pathname.startsWith('/tutor/new-course')  && !request.nextauth.token.user?.isTutor) {
            return NextResponse.rewrite(
                new URL(
                    '/denied', request.url))
        }
        if (request.nextUrl.pathname.startsWith('/tutor/new-quiz')  && !request.nextauth.token.user?.isTutor) {
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
    matcher: ['/chat',
    '/tutor/new-course','/tutor/new-quiz','/user/new-post','/user/new-video','/my-profile','/on-boarding/:path*']
}






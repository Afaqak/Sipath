// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';


// export default withAuth( function middleware(request) {
//     console.log(request.nextUrl,"{auth-token}")

//     if (request.nextUrl.pathname.startsWith('/tutor/new-course') && !request.nextauth.token.user?.isTutor) {
//         return NextResponse.rewrite(
//             new URL(
//                 '/denied', request.url))
//     }
//     if (request.nextUrl.pathname.startsWith('/tutor/new-quiz') && !request.nextauth.token.user?.isTutor) {
//         return NextResponse.rewrite(
//             new URL(
//                 '/denied', request.url))
//     }
// }, {

// }
// )


// export const config = {
//     matcher: ['/user/:path*']
// }






import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        console.log(req.nextauth?.token?.token, "next-url")
        console.log(req.nextUrl, "next-url")
        // const token = await getToken({ req });
        const isAuth = !!req.nextauth?.token?.token;
        const isAuthPage =
            req.nextUrl.pathname.startsWith("/sign-in") ||
            req.nextUrl.pathname.startsWith("/sign-up");

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        if (req.nextUrl.pathname.startsWith('/user') && !req.nextauth?.token?.token) {
            return NextResponse.rewrite(
                new URL(
                    '/sign-in', req.url))
        }



        if (req.nextUrl.pathname.startsWith('/tutor/new-course') && !req.nextauth?.token?.user?.isTutor && req.nextauth?.token?.token) {
            return NextResponse.rewrite(
                new URL(
                    '/denied', req.url))
        }
        if (req.nextUrl.pathname.startsWith('/tutor/new-quiz') && !req.nextauth?.token?.user?.isTutor && req.nextauth?.token?.token) {
            return NextResponse.rewrite(
                new URL(
                    '/denied', req.url))
        }


        if (!isAuth) {
            console.log(req.nextUrl.pathname)
            if (req.nextUrl.pathname === 'sign-up') {
                return NextResponse.rewrite(
                    new URL('/sign-up', req.url)
                )
            }
            else if (req.nextUrl.pathname === 'sign-in') {
                return NextResponse.rewrite(
                    new URL(`/sign-in`, req.url)
                );
            }

        }

    },
    {
        callbacks: {
            authorized() {
                // This is a work-around for handling redirect on auth pages.
                // We return true here so that the middleware function above
                // is always called.
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        "/tutor/new-course",
        "/tutor/new-podcast",
        "/tutor/new-quiz",
        "/user/:path*",
        "/sign-in",
        "/sign-up",
    ],
};
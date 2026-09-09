import {NextRequest,NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function proxy(req:NextRequest) {

    const {pathname}= req.nextUrl;
    const publicRoutes = ["/login", "/register", "/api/auth"];
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    const token=await getToken({req,secret:process.env.NEXT_AUTH_SECRET});
    console.log("token------>",token);
    console.log("req--->",req.url)
    if(!token){
        const loginUrl=new URL("/login",req.url);
        loginUrl.searchParams.set("callbackUrl",req.url);
        return NextResponse.redirect(loginUrl);
    }
return NextResponse.next();

}

export const config={
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
}
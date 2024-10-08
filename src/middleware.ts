import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: ['/site', '/api/uploadthing'],

    async beforeAuth(auth, req){},
    async afterAuth(auth, req){
      //rewrite for domains 
      const url = req.nextUrl
      const searchParams = url.searchParams.toString()
      let hostname = req.headers 
      
      const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}`:'' }`

      //if subdomain exists
      const customSubDomain = hostname.get('host')
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0]
   
      //sub domain exists? if yes > send user to [domain]/ [pathid] along with search params so whatever we
      // created in [domain] will lead 
      if (customSubDomain) {
        return NextResponse.rewrite(
          new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
        )
      }
        //if user access url then will direct to sign-in url 
      if (url.pathname === '/sign-in' || url.pathname === '/sign-up'){
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
      }
      
      //if the user trying to access website url / /site then yes will bring it 
      if (
        url.pathname === '/' ||
        (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
      ){
        return NextResponse.rewrite(new URL('/site', req.url))
      }
        //user access agency and dashboard then will lead them to it 
      if (
        url.pathname.startsWith('/agency') ||
        url.pathname.startsWith('/subaccount')
      ) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
      }
    },

})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
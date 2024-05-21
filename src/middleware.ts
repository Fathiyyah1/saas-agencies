import { authMiddleware } from "@clerk/nextjs/server";

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
    }

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
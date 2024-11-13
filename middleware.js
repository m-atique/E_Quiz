// export { default } from "next-auth/middleware"

import { withAuth } from "next-auth/middleware"

export default withAuth({
//   Matches the pages config in `[...nextauth]`
  pages: {
    signIn:"/auth/signin",
    
  },
  matcher: [
    // Match all requests EXCEPT those for static files or public folder
    '/((?!_next|favicon.ico|.*\\.(jpg|jpeg|png|gif|css|js|svg|woff|woff2|eot|ttf|otf|mp4|webm|json|fonts|assets|public)).*)',
  ]
})
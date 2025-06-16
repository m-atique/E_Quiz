import { withAuth } from "next-auth/middleware"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

const authOptions = {

  providers: [
    CredentialsProvider({

      name: 'Credentials',

      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

       

        if (!credentials || !credentials.username || !credentials.password)
          return null


        
        const result =  await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/api/user/login`,
          {uname:credentials.username,
            password: credentials.password }
        )

      
   
        if (result?.data.message =='Login Successfully') {
          const user = result.data
        //console.log("user", user);
       
          return user
        }else  if (result?.data.message == "Username or password not matched") {
          throw new Error("Wrong  Password");

        }else  if (result?.data.message == "invalid user") {
          throw new Error("Invalid User");
        }
        else{
          return null
        }

       
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user){ 
       token.role = user.utype
       token.token = user.token
      token.name = user.uname
      token.rank = user.rank
       
      }  
      return token
    },
    session({ session, token }) {
      session.user.token = token.token
      session.user.role = token.role                           
     session.user.name = token.name
      session.user.rank = token.rank

      return session
    },
    
  },



  pages: {
    signIn:'auth/signin',
    // signOut: "/auth/signout"
  },

  secret: process.env.NEXTAUTH_SECRET
}

export { authOptions }
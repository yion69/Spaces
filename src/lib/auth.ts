import NextAuth, { DefaultUser, getServerSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import "dotenv/config"
import { redirect } from "next/navigation"
import UserModel from "@/app/models/user-model"
import connectDb_Users from "@/app/api/account/dbConnect"
import bcrypt from "bcrypt"

interface User extends DefaultUser {
  user_username: string;
  user_email: string;
  user_avatar?: string;
};

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Sign in",
        credentials: {
            email: {
                label: "Email",
                type : "email",
                placeholder: "example@gmail.com"
            },
            password: {
                label: "Password",
                type: "password"
            }
        },
        async authorize(credentials, req) {
            const { email, password } = credentials as {
                email:string,
                password:string,    
            };

            if(!credentials || !credentials.email || !credentials.password) { return null };
            
            try {
                await connectDb_Users();
                const user = await UserModel.findOne({user_email: email});
                
                if(!user) { return null };

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.user_password
                );

                if(!passwordMatch) { return null }; 

                const userFetch = await fetch(`http://localhost:3000/api/account?email=${email}`, {
                    method: "GET",
                });
                const response = await userFetch.json();
                const { body } = response;

                return {
                    email: body.user_email, 
                    name: body.user_username, 
                    id: body._id, 
                    avatar: body.user_avatar
                };

            } catch (error) {
                console.log(error);
            }
            return null;
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,     
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.picture = user.avatar,
        token.email = user.email || undefined;
        token.name = user.name || undefined;
      }
      return token;
    },

    async session({ session, token }) {
        if(token.email) { session.user = {
            email: token.email,
            name: token.name,
            avatar: token.picture || undefined
        }};

        return session;
    }
  }
}
export async function loginIsRequiredServer() {
    const session = await getServerSession(authOptions);
    if(!session) { return redirect("/") };
}

export default NextAuth(authOptions)
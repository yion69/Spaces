import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import "dotenv/config"
import { redirect } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export const authOptions = {
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
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

            if(!credentials || !credentials.email || !credentials.password) { return null }
 
            if (user) { return user } else { return null }
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,     
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    })
  ]
}
export async function loginIsRequiredServer() {
    const session = await getServerSession(authOptions);
    if(!session) { return redirect("/") };
}

export async function logOut () {
    await signOut({callbackUrl: "/login"});
}
// export async function loginIsRequiredClient() {
//     if(typeof window !== "undefined") { 
//         const session = useSession();
//         const router = useRouter();
        
//         if(!session) { router.push("/") };
//     }
// }

export default NextAuth(authOptions)
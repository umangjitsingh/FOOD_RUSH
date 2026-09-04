import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "@/app/(BACK)/models/user.model"
import bcrypt from "bcrypt"


export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({

            credentials: {
                email: {name: "Email", type: "email"},
                password: {name: "Password", type: "password"},
            },
            async authorize(credentials) {
                const {email, password} = credentials;
                if (!email || !password) {
                    throw new Error("Missing required fields");
                }
                const user = await User.findOne({email});
                if (!user) {
                    throw new Error("User not found");
                }
                const isPasswordValid = await bcrypt.compare(password as string, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin'
    },
    session: {
        strategy: "jwt",
        maxAge: 47 * 24 * 60 * 60,
    },
    secret: process.env.NEXT_AUTH_SECRET,
})
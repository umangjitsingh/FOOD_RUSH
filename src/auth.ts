import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "@/app/(BACK)/models/user.model"
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";
import connectDb from "@/app/(BACK)/config/db";


export const {handlers, signIn, signOut, auth} = NextAuth({
    trustHost: true,
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
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if (account?.provider === "google") {
                try {
                    await connectDb();
                    let dbUser = await User.findOne({email: user?.email});
                    if (!dbUser) {
                        dbUser = await User.create({
                            name: user?.name,
                            email: user?.email,
                            image: user?.image,
                            password: "" // Google users don't have passwords
                        })
                    }
                    user.id = dbUser._id.toString();
                    user.role = dbUser.role;
                } catch (error) {
                    console.error("Error in Google signIn callback:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({token, user,trigger}) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            if(trigger === "update") {
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
        },

    },
    pages: {
        signIn: '/auth/signin'
    },
    session: {
        strategy: "jwt",
        maxAge: 47 * 24 * 60 * 60,
    },
    secret: process.env.NEXT_AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
})
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' }
      },
      authorize(credentials) {
        if (
          credentials?.username === 'admin' &&
          credentials.password === 'admin'
        ) {
          return { id: '1', name: 'admin' };
        }

        return null;
      }
    })
  ]
} satisfies NextAuthOptions

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}



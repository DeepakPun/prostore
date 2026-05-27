import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        })

        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password)

          if (isMatch) {
            let name = user.name
            if (name === 'NO_NAME' && user.email) {
              name = user.email.split('@')[0]
              prisma.user.update({
                where: { id: user.id },
                data: { name },
              }).catch(err => console.error("Failed to update name:", err))
            }

            return {
              id: user.id,
              name: name,
              email: user.email,
              role: user.role,
            }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, trigger, token, user }: any) {
      if (session.user && token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.name = token.name
      }

      if (trigger === 'update' && user?.name) {
        session.user.name = user.name
      }

      return session
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role
        token.name = user.name
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }

      // console.log(token)

      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

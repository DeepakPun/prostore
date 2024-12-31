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
				if (credentials == null) return null

				// Find user in database
				const user = await prisma.user.findFirst({
					where: { email: credentials.email as string },
				})

				if (user && user.password) {
					const isMatch = compareSync(
						credentials.password as string,
						user.password
					)

					// if passwords match, return the user object
					if (isMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						}
					}
				}

				// If user does not exist or passwords do not match, return null
				return null
			},
		}),
	],
	callbacks: {
		async session({ session, user, trigger, token }: any) {
			// set the user id from token
			session.user.id = token.sub
			session.user.role = token.role
			session.user.name = token.name

			console.log(token)

			// if there is an update, set the user name
			if (trigger === 'update') {
				session.user.name = user.name
			}
			return session
		},

		async jwt({ token, user, trigger, session }: any) {
			// Assign user fields to token
			if (user) {
				token.id = user.id
				token.role = user.role

				// if user has no name, then user the email
				if (user.name === 'NO_NAME') {
					token.name = user.email!.split('@')[0].capitalize()

					// update the database to reflect token name
					await prisma.user.update({
						where: { id: user.id },
						data: { name: token.name },
					})
				}
			}

			return token
		},
	},
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

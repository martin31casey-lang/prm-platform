import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  trustHost: true,
  providers: [
    GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
        name: "Acceso Staff",
        credentials: {
          username: { label: "Usuario", type: "text" },
          password: { label: "Contraseña", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials?.username || !credentials?.password) return null;

            // 1. Buscamos el usuario en la DB (Staff o Admin)
            const user = await db.user.findUnique({
                where: { username: credentials.username as string },
                include: { professional: true }
            });

            // 2. Validación simple para la demo (en prod usar bcrypt)
            if (user && user.password === credentials.password) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            }

            // Fallback para simulación de paciente si falla el staff
            if (credentials.username === "test" && credentials.password === "test") {
                return {
                    id: "test-user-id",
                    name: "Paciente de Prueba",
                    email: "test@prm.com",
                    image: "https://i.pravatar.cc/150?u=mock"
                };
            }

            return null;
        }
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub || "test-user-id",
        role: token.role as string,
      },
    }),
  },
} satisfies NextAuthConfig;

import { saltAndHashPassword } from "@/helpers/functions/password";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db";
import { users } from "@/db/schema/users.schema";
import { accounts } from "@/db/schema/account.schema";
import { sessions } from "@/db/schema/sessions.schema";
import { verificationTokens } from "@/db/schema/verification-token.schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const pwHash = saltAndHashPassword(credentials.password as string);

        // user = await getUserFromDb(credentials.password, pwHash);

        user = {};

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});

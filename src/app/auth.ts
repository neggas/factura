import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const pwHash = saltAndHashPassword(credentials.password);

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

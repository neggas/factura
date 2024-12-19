import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import loginValidationSchema from "./helpers/formvalidations/login-form-validation";
import bcrypt from "bcrypt";
import { getUserFromDb } from "./helpers/functions/auth";
import { AdapterUser } from "next-auth/adapters";

const errors = {
  username: "",
  password: "",
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Connexion",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const validateData = await loginValidationSchema.validate(
            credentials
          );

          const user = await getUserFromDb(validateData.username);

          if (!user) {
            errors.username = "This username is not registered";
          }

          const isPasswordCorrect = await bcrypt.compare(
            validateData.password,
            user.password
          );

          if (!isPasswordCorrect) {
            errors.password = "Invalid password";
          }

          if (errors.username || errors.password) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt", // Utilisation de JWT pour les sessions
  },
  pages: {
    signIn: "/auth/login", // Redirection en cas d'authentification échouée
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        } as AdapterUser;
      }
      return session;
    },
  },
});

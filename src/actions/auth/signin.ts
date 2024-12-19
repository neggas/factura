"use server";

import { signIn as signInAuth } from "@/auth";
import { UserSession } from "@/helpers/constant/types";
import { LoginType } from "@/helpers/formtypes/loginTypes";
import {
  createServerAction,
  ServerActionError,
} from "@/helpers/server-actions";
import { CredentialsSignin } from "next-auth";

export const signIn = createServerAction(async (credentials: LoginType) => {
  try {
    const response: UserSession = await signInAuth("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    return response;
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      const error = {
        username: "Aucun compte associé à ce nom d'utilisateur.",
        password: "Mot de passe incorrect. Veuillez réessayer.",
      };
      throw new ServerActionError(JSON.stringify(error));
    }

    throw new ServerActionError("Une erreur inattendue est survenue.");
  }
});

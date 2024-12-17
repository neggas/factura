"use server";

import { LoginType } from "@/helpers/formtypes/loginTypes";

export const signIn = async (credentials: LoginType) => {
  console.log(credentials);
};

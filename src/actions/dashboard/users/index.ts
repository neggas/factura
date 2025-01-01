"use server";

import { users } from "@/db/schema/users.schema";
import db from "@/db";
import {
  createServerAction,
  ServerActionError,
} from "@/helpers/server-actions";
import { not, eq } from "drizzle-orm";
import { auth } from "@/auth";

export const getUsers = createServerAction(async () => {
  try {
    const currentUser = await auth();

    if (!currentUser) {
      throw new ServerActionError("Vous n'avez pas les droits suffisants.");
    }
    const fetchedUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        created_at: users.created_at,
      })
      .from(users)
      .where(not(eq(users.id, currentUser!.user!.id as string)));

    return fetchedUsers;
  } catch {
    throw new ServerActionError("Une erreur inattendue est survenue.");
  }
});

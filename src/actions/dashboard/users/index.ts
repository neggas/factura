"use server";

import { users } from "@/db/schema/users.schema";
import db from "@/db";
import {
  createServerAction,
  ServerActionError,
} from "@/helpers/server-actions";
import { not, eq } from "drizzle-orm";
import { auth } from "@/auth";
import bcrypt from "bcrypt";
import { CreateUserType } from "@/helpers/formtypes/userFormTypes";
import { User } from "next-auth";

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

export const createUserAction = createServerAction(
  async (user: CreateUserType) => {
    try {
      const currentUser = await auth();
      const decodedUser = currentUser?.user as User & {
        role: "admin" | "drop";
      };
      if (decodedUser?.role !== "admin") {
        console.log(decodedUser);
        throw new ServerActionError("Vous n'avez pas les droits suffisants.");
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await db.insert(users).values({
        name: user.fullname,
        email: user.email,
        password: hashedPassword,
        role: "drop",
      });

      return newUser;
    } catch (error) {
      if (error instanceof ServerActionError) {
        throw new ServerActionError(error.message);
      }
      throw new ServerActionError("Une erreur inattendue est survenue.");
    }
  }
);

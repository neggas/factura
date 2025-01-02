import db from "@/db";
import { users } from "@/db/schema/users.schema";
import { eq } from "drizzle-orm";

export const getUserFromDb = async (
  username: string
): Promise<{
  id: string;
  name: string;
  email: string | null;
  password: string;
  role: "admin" | "drop";
}> => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.name, username))
    .limit(1);

  return {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    password: user?.password,
    role: user?.role as "admin" | "drop",
  };
};

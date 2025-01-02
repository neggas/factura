import { DRIZZLE_ORTHODATA } from "@/helpers/constant/database-orthodata";
import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const UserRole = pgEnum("role", ["admin", "drop"]);
export const users = pgTable("user", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image"),
  role: UserRole("role").default("drop"),
  ...DRIZZLE_ORTHODATA,
});

import { pgTable, varchar, integer } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { users } from "./users.schema";
import { DRIZZLE_ORTHODATA } from "@/helpers/constant/database-orthodata";

export const accounts = pgTable("account", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  userId: varchar("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type").$type<AdapterAccountType>().notNull(),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("providerAccountId").notNull(),
  refresh_token: varchar("refresh_token"),
  access_token: varchar("access_token"),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type"),
  scope: varchar("scope"),
  id_token: varchar("id_token"),
  session_state: varchar("session_state"),

  ...DRIZZLE_ORTHODATA,
});

import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { DRIZZLE_ORTHODATA } from "@/helpers/constant/database-orthodata";

export const sessions = pgTable("session", {
  sessionToken: varchar("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),

  ...DRIZZLE_ORTHODATA,
});

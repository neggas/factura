import { DRIZZLE_ORTHODATA } from "@/helpers/constant/database-orthodata";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable("verificationToken", {
  identifier: varchar("identifier").notNull(),
  token: varchar("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),

  ...DRIZZLE_ORTHODATA,
});

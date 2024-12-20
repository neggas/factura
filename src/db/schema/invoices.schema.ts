import { DRIZZLE_ORTHODATA } from "@/helpers/constant/database-orthodata";
import {
  pgTable,
  varchar,
  date,
  decimal,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";

export const InvoiceStatus = pgEnum("status", ["paid", "pending", "lost"]);

export const invoices = pgTable("invoices", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 255 }).notNull(),
  comment: text("comment"),
  invoice: varchar("invoice", { length: 255 }).notNull(), // File path or name of the invoice
  dueDate: date("due_date").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  rib: varchar("rib", { length: 255 }).notNull(),
  bank: varchar("bank", { length: 255 }).notNull(),
  dropName: varchar("drop_name", { length: 255 }).notNull(),
  status: InvoiceStatus().default("pending").notNull(),

  ...DRIZZLE_ORTHODATA,
});

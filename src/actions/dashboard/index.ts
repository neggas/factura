"use server";

import { invoices } from "@/db/schema/invoices.schema";
import db from "@/db";
import { validateInvoice } from "@/helpers/formvalidations/invoice-form-validator";
import { CreateInvoiceType } from "@/helpers/formtypes/createInvoiceType";
import {
  createServerAction,
  ServerActionError,
} from "@/helpers/server-actions";
import { eq } from "drizzle-orm";
export const getInvoices = async () => {
  const fetchedInvoices = await db.select().from(invoices);
  return fetchedInvoices;
};
export const createInvoice = createServerAction(
  async (invoiceData: CreateInvoiceType) => {
    try {
      const isValidForm = await validateInvoice(invoiceData);
      if (!isValidForm) {
        throw new ServerActionError("Bad request exception");
      }

      const newInvoice = await db
        .insert(invoices)
        .values(invoiceData)
        .returning();
      return newInvoice;
    } catch {
      throw new ServerActionError("Une erreur inattendue est survenue.");
    }
  }
);

export const updateInvoiceStatus = createServerAction(
  async (invoiceId: string, status: "paid" | "lost" | "pending") => {
    const updatedInvoice = await db
      .update(invoices)
      .set({ status })
      .where(eq(invoices.id, invoiceId))
      .returning();
    return updatedInvoice[0];
  }
);

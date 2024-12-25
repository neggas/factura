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

export const deleteInvoice = createServerAction(async (invoiceId: string) => {
  const deletedInvoice = await db
    .delete(invoices)
    .where(eq(invoices.id, invoiceId))
    .returning();
  return deletedInvoice[0];
});

export const getInvoiceById = createServerAction(async (invoiceId: string) => {
  const invoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId));
  return invoice[0];
});

export const updateInvoice = createServerAction(
  async (invoiceId: string, invoiceData: CreateInvoiceType) => {
    const updatedInvoice = await db
      .update(invoices)
      .set(invoiceData)
      .where(eq(invoices.id, invoiceId))
      .returning();
    return updatedInvoice[0];
  }
);

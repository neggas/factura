"use server";

import { invoices } from "@/db/schema/invoices.schema";
import db from "@/db";
import { CreateInvoiceType } from "@/helpers/formtypes/createInvoiceType";
import { validateInvoice } from "@/helpers/formvalidations/invoice-form-validator";

export const getInvoices = async () => {
  const fetchedInvoices = await db.select().from(invoices);
  return fetchedInvoices;
};
export const createInvoice = async (invoiceData: CreateInvoiceType) => {
  const isValidForm = await validateInvoice(invoiceData);
  if (!isValidForm) {
    return { error: "Invalid form data" };
  }
  const newInvoice = await db.insert(invoices).values(invoiceData).returning();
  return newInvoice;
};

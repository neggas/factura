"use server";

import { invoices } from "@/db/schema/invoices.schema";
import db from "@/db";
import { CreateInvoiceDto } from "@/helpers/constant/types";
import { validateInvoice } from "@/helpers/formvalidations/invoice-form-validator";

export const getInvoices = async () => {
  const fetchedInvoices = await db.select().from(invoices);
  return fetchedInvoices;
};
export const createInvoice = async (invoiceData: CreateInvoiceDto) => {
  const isValidForm = await validateInvoice(invoiceData);
  if (!isValidForm) {
    return { error: "Invalid form data" };
  }
};

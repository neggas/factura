"use server";

import { invoices } from "@/db/schema/invoices.schema";
import db from "@/db";
import { validateInvoice } from "@/helpers/formvalidations/invoice-form-validator";
import { CreateInvoiceType } from "@/helpers/formtypes/createInvoiceType";
import {
  createServerAction,
  ServerActionError,
} from "@/helpers/server-actions";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { InvoiceType } from "@/helpers/datatable/invoicesColumnsHelper";
import { UserSession } from "@/helpers/constant/types";
export const getInvoices = async () => {
  const currentUser = await auth();
  const currentUserSession = currentUser as UserSession;

  let fetchedInvoices: InvoiceType[] = [];
  if (currentUserSession?.user?.role !== "admin") {
    fetchedInvoices = await db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, currentUserSession?.user?.id));
  } else {
    fetchedInvoices = await db.select().from(invoices);
  }

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

export const getDashboardStats = createServerAction(async () => {
  try {
    const queryResponse = await db
      .select({ sum: sql<number>`cast(SUM(${invoices.amount}) as int)` })
      .from(invoices)
      .where(eq(invoices.status, "lost"));

    const queryResponsePaid = await db
      .select({ sum: sql<number>`cast(SUM(${invoices.amount}) as int)` })
      .from(invoices)
      .where(eq(invoices.status, "paid"));

    const queryResponsePending = await db
      .select({ sum: sql<number>`cast(SUM(${invoices.amount}) as int)` })
      .from(invoices)
      .where(eq(invoices.status, "pending"));

    const closestDueInvoices = await db
      .select()
      .from(invoices)
      .where(
        sql`${invoices.dueDate} >= CURRENT_DATE AND ${invoices.status} = 'pending'`
      )
      .orderBy(invoices.dueDate)
      .limit(5);

    const totalInvoiceLost = queryResponse[0].sum;
    const totalInvoicePending = queryResponsePending[0].sum;
    const totalInvoicePaid = queryResponsePaid[0].sum;

    return {
      totalInvoiceLost,
      totalInvoicePaid,
      totalInvoicePending,
      closestDueInvoices,
    };
  } catch {
    throw new ServerActionError("Une erreur inattendue est survenue.");
  }
});

"use server";

import { sendTelegramMessage } from "@/telegram";
import { getInvoiceById } from "../invoices/invoiceActions";
import { frenchDateFormat } from "@/helpers/date";

export const sendTlgInvoiceNotification = async (id: string) => {
  try {
    const invoice = await getInvoiceById(id);
    if (!invoice.success) {
      throw new Error("Invoice not found");
    }

    const { dueDate, dropName, rib, comment } = invoice.value;
    const invoicePath = invoice.value.invoice;

    const message = `
    Facture: ${invoicePath}

Date d'échéance : ${frenchDateFormat(dueDate)}
RIB : ${rib}
Nom du drop : ${dropName}
Commentaire : ${comment}
`;
    const response = await sendTelegramMessage(message);
    return response;
  } catch (error) {
    console.error("Error sending Telegram invoice notification:", error);
    throw error;
  }
};

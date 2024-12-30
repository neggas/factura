"use server";

import { sendTelegramMessage } from "@/telegram";
import { frenchDateFormat } from "@/helpers/date";

export interface TlgNotificationDataType {
  dueDate: string;
  invoice: string;
  dropName: string;
  rib: string;
  comment: string;
}

export const sendTlgInvoiceNotification = async ({
  dueDate,
  dropName,
  rib,
  invoice,
  comment,
}: TlgNotificationDataType) => {
  try {
    const message = `
    Facture: ${invoice}

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

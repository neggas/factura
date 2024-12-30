import { getInvoices } from "@/actions/dashboard";
import { inngest } from "./client";
import {
  sendTlgInvoiceNotification,
  TlgNotificationDataType,
} from "@/actions/dashboard/notifications/notificationsActions";

export const ingestNotifyForInvoiceDueToBePaid = inngest.createFunction(
  { id: "notify-for-invoice-due-to-be-paid" },
  { cron: "TZ=Europe/Paris 0 3 * * *" },
  async ({ step }) => {
    try {
      const invoices = await getInvoices();

      const today = new Date();
      const datesToCheck = [1, 2, 3].map((days) => {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + days);
        return futureDate.toISOString().split("T")[0];
      });

      const dueInvoices = invoices.filter((invoice) =>
        datesToCheck.includes(
          new Date(invoice.dueDate).toISOString().split("T")[0]
        )
      );

      if (dueInvoices.length === 0) {
        console.log("No due invoices found");
        return;
      }

      const events = dueInvoices.map((invoice) => ({
        name: "factura/notify.invoice.due",
        data: {
          invoice_id: invoice.id,
          amount: invoice.amount,
          dueDate: invoice.dueDate,
          invoice: invoice.invoice,
          dropName: invoice.dropName,
          rib: invoice.rib,
          comment: invoice.comment,
        },
      }));

      await step.sendEvent("send-due-invoice-events", events);
    } catch (error) {
      console.error("Error in notify-for-invoice-due-to-be-paid:", error);
    }
  }
);

export const sendDueInvoiceNotification = inngest.createFunction(
  { id: "send-due-invoice-notification" },
  { event: "factura/notify.invoice.due" },
  async ({ event }) => {
    try {
      const { invoice_id, dueDate, invoice, dropName, rib, comment } =
        event.data;

      await sendTlgInvoiceNotification({
        dropName,
        dueDate,
        invoice,
        rib,
        comment,
      } as TlgNotificationDataType);

      console.log(`Notification sent for invoice ${invoice_id}`);
    } catch (error) {
      console.error("Error sending notification for invoice:", error);
    }
  }
);

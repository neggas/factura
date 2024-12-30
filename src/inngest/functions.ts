import { getInvoices } from "@/actions/dashboard";
import { inngest } from "./client";
import { sendTlgInvoiceNotification } from "@/actions/dashboard/notifications/notificationsActions";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const ingestNotifyForInvoiceDueToBePaid = inngest.createFunction(
  { id: "notify-for-invoice-due-to-be-paid" },
  { cron: "TZ=Europe/Paris 0 3 * * *" },

  async ({ step }) => {
    const invoices = await getInvoices();

    const today = new Date();
    const datesToCheck = [1, 2, 3].map((days) => {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + days);
      return futureDate.toISOString().split("T")[0];
    });

    const dueInvoices = invoices.filter((invoice) =>
      datesToCheck.includes(invoice.dueDate)
    );

    if (dueInvoices.length > 0) {
      const events = dueInvoices.map((invoice) => ({
        name: "factura/notify.invoice.due",
        data: {
          invoice_id: invoice.id,
          amount: invoice.amount,
          dueDate: invoice.dueDate,
          invoice: invoice.invoice,
          dropName: invoice.dropName,
        },
      }));

      await step.sendEvent("send-invoice-notifications", events);
    }
  }
);

// Function to handle the notification for each due invoice
export const sendInvoiceNotification = inngest.createFunction(
  { id: "send-invoice-notification" },
  { event: "factura/notify.invoice.due" },
  async ({ event }) => {
    const { invoice_id } = event.data;
    try {
      await sendTlgInvoiceNotification(invoice_id);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send notification for invoice");
    }
  }
);

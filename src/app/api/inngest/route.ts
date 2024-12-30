import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  ingestNotifyForInvoiceDueToBePaid,
  sendDueInvoiceNotification,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [ingestNotifyForInvoiceDueToBePaid, sendDueInvoiceNotification],
});

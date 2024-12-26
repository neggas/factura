import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  ingestNotifyForInvoiceDueToBePaid,
  sendInvoiceNotification,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [ingestNotifyForInvoiceDueToBePaid, sendInvoiceNotification],
});

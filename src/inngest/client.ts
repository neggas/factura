import { Inngest } from "inngest";
export const inngest = new Inngest({
  id: "factura",
  env: process.env.INNGEST_EVENT_KEY,
});

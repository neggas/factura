import { FileUploadFileChangeDetails } from "@chakra-ui/react";

export const createInvoiceInitialValue = {
  email: "",
  comment: "",
  invoice: null,
  dueDate: "",
  amount: "",
  rib: "",
  bank: "",
  dropName: "",
};

export type CreateInvoiceType = {
  email: string;
  comment: string;
  invoice: FileUploadFileChangeDetails | null;
  dueDate: string;
  amount: string;
  rib: string;
  bank: string;
  dropName: string;
};

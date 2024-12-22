export const createInvoiceInitialValue = {
  email: "",
  comment: "",
  invoice: "",
  dueDate: "",
  amount: "",
  rib: "",
  bank: "",
  dropName: "",
};

export type CreateInvoiceType = {
  email: string;
  comment: string | null;
  invoice: string;
  dueDate: string;
  amount: string;
  rib: string;
  bank: string;
  dropName: string;
};

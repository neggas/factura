export const createInvoiceInitialValue = {
  email: "",
  comment: "",
  invoice: "",
  dueDate: "",
  amount: "",
  rib: "",
  bank: "",
  drop: {
    label: "",
    value: "",
  },
};

export type CreateInvoiceType = {
  email: string;
  comment: string | null;
  invoice: string;
  dueDate: string;
  amount: string;
  rib: string;
  bank: string;
  drop: {
    label: string;
    value: string;
  };
};

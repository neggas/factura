import { InvoiceType } from "@/helpers/datatable/invoicesColumnsHelper";
import { createSelectors } from "@/helpers/store";
import { create } from "zustand";

interface InvoiceState {
  invoices: InvoiceType[];
  setInvoices: (invoices: InvoiceType[]) => void;
  updateInvoice: (id: string, invoice: InvoiceType) => void;
}

const InvoiceStore = create<InvoiceState>((set) => ({
  invoices: [],
  setInvoices: (invoices) => set({ invoices }),
  updateInvoice: (id, invoice) =>
    set((state) => ({
      invoices: state.invoices.map((inv) => (inv.id === id ? invoice : inv)),
    })),
}));

export const useInvoiceStore = createSelectors(InvoiceStore);

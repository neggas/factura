import { InvoiceType } from "@/helpers/datatable/invoicesColumnsHelper";
import { createSelectors } from "@/helpers/store";
import { create } from "zustand";

interface InvoiceState {
  invoices: InvoiceType[];
  setInvoices: (invoices: InvoiceType[]) => void;
  updateInvoice: (id: string, invoice: InvoiceType) => void;
  deleteInvoice: (id: string) => void;
}

const InvoiceStore = create<InvoiceState>((set) => ({
  invoices: [],
  setInvoices: (invoices) => set({ invoices }),
  updateInvoice: (id, invoice) =>
    set((state) => ({
      invoices: state.invoices.map((inv) => (inv.id === id ? invoice : inv)),
    })),
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((inv) => inv.id !== id),
    })),
}));

export const useInvoiceStore = createSelectors(InvoiceStore);

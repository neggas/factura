import { InvoiceType } from "@/helpers/datatable/invoicesColumnsHelper";
import { createSelectors } from "@/helpers/store";
import { create } from "zustand";

interface InvoiceState {
  invoices: InvoiceType[];
  setInvoices: (invoices: InvoiceType[]) => void;
  updateInvoice: (id: string, invoice: InvoiceType) => void;
  deleteInvoice: (id: string) => void;
  getInvoiceById: (id: string) => InvoiceType | undefined;
}

const InvoiceStore = create<InvoiceState>((set, get) => ({
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
  getInvoiceById: (id) => {
    const state = get();
    return state.invoices.find((inv) => inv.id === id);
  },
}));

export const useInvoiceStore = createSelectors(InvoiceStore);

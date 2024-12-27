import { Invoice } from "@/helpers/constant/types";
import { createSelectors } from "@/helpers/store";
import { create } from "zustand";

interface DashboardStats {
  totalInvoiceLost: number;
  totalInvoicePaid: number;
  totalInvoicePending: number;
  closestDueInvoices: Invoice[];
}

interface DashboardState {
  stats: DashboardStats;
  setDashboardState: (state: DashboardStats) => void;
  getDashboardStats: () => DashboardStats;
}

const statsStore = create<DashboardState>((set, get) => ({
  stats: {
    totalInvoiceLost: 0,
    totalInvoicePaid: 0,
    totalInvoicePending: 0,
    closestDueInvoices: [],
  },

  setDashboardState: (state: DashboardStats) => set({ stats: state }),
  getDashboardStats: () => {
    const state = get();
    return state.stats;
  },
}));

export const useStatsStore = createSelectors(statsStore);

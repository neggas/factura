"use client";
import FinancialCard from "@/components/dashboard/FinancialCard";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/ui/display/DataTable";
import { Box, Flex } from "@chakra-ui/react";
import { getDashboardStats } from "@/actions/dashboard/invoices/invoiceActions";
import { formatAsCurrency } from "@/helpers/functions";
import { Text } from "@chakra-ui/react";
import { invoiceColumnHelper } from "@/helpers/datatable/invoicesColumnsHelper";
import { useEffect } from "react";
import { useStatsStore } from "@/store/dashboardStore";

const fetchDashboardStats = async () => {
  const response = await getDashboardStats();

  if (!response.success) {
    // TODO: notify user
    throw new Error(response.error);
  }

  return response.value;
};

const Dashboard = () => {
  const { setDashboardState, getDashboardStats } = useStatsStore();
  const stats = getDashboardStats();

  useEffect(() => {
    const fetchData = async () => {
      const stats = await fetchDashboardStats();
      console.log(stats);
      setDashboardState(stats);
    };
    fetchData();
  }, [setDashboardState]);

  return (
    <Box w="full">
      <PageHeader title="Tableau de bord" />
      <Flex w="full" className="card-list-container" mt="40px" gap="20px">
        <FinancialCard
          title="Tatal de facture réçues"
          amount={`£${formatAsCurrency(stats.totalInvoicePaid || 0)}`}
        />
        <FinancialCard
          title="Tatal de facture à venir"
          amount={`£${formatAsCurrency(stats.totalInvoicePending || 0)}`}
        />
        <FinancialCard
          title="Tatal de facture perdues"
          amount={`£${formatAsCurrency(stats.totalInvoiceLost || 0)}`}
        />
      </Flex>

      <Box mt="60px">
        <Text textStyle="heading-sm" mb="4">
          Liste des factures en approche
        </Text>
        <DataTable
          data={stats.closestDueInvoices}
          columns={invoiceColumnHelper}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;

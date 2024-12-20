"use client";
import FinancialCard from "@/components/dashboard/FinancialCard";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/ui/display/DataTable";
import { Box, Flex } from "@chakra-ui/react";
import { columns, defaultData } from "@/helpers/datatable/invoicesColumns";

const Dashboard = () => {
  return (
    <Box w="full">
      <PageHeader title="Tableau de bord" />
      <Flex w="full" className="card-list-container" mt="40px" gap="20px">
        <FinancialCard title="Tatal de facture réçues" amount="100 000 000£" />
        <FinancialCard title="Tatal de facture à venir" amount="100 000 000£" />
        <FinancialCard title="Tatal de facture perdues" amount="100 000 000£" />
      </Flex>

      <Box mt="60px">
        <DataTable data={defaultData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Dashboard;

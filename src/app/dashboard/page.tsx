"use client";
import FinancialCard from "@/components/dashboard/FinancialCard";
import DataTable from "@/components/ui/display/DataTable";
import { Box, Flex, Separator, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();
const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];

const Dashboard = () => {
  return (
    <Box w="full">
      <Text textStyle="heading-lg">Tableau de bord</Text>
      <Separator variant="solid" mt="8" />
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

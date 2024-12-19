import FinancialCard from "@/components/dashboard/FinancialCard";
import { Box, Flex, Separator, Text } from "@chakra-ui/react";

const Dashboard = async () => {
  return (
    <Box w="full">
      <Text textStyle="heading-lg">Tableau de bord</Text>
      <Separator variant="solid" mt="8" />
      <Flex w="full" className="card-list-container" mt="40px" gap="20px">
        <FinancialCard title="Tatal de facture réçues" amount="100 000 000£" />
        <FinancialCard title="Tatal de facture à venir" amount="100 000 000£" />
        <FinancialCard title="Tatal de facture perdues" amount="100 000 000£" />
      </Flex>
    </Box>
  );
};

export default Dashboard;

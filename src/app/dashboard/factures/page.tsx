import PageHeader from "@/components/dashboard/PageHeader";
import AddIcon from "@/components/icons/AddIcon";
import DataTable from "@/components/ui/display/DataTable";
import { columns, defaultData } from "@/helpers/datatable/invoicesColumns";
import { Box, Button, Flex } from "@chakra-ui/react";

const FacturesPage = () => {
  return (
    <Box w="full">
      <PageHeader title="Factures" />
      <Box mt="60px">
        <Flex w="full" justify="flex-end" my="20px">
          <Button textStyle="heading-sm" rounded="6px">
            <AddIcon fill="none" w="20px" h="20px" />
            Ajouter une facture
          </Button>
        </Flex>
        <DataTable data={defaultData} columns={columns} />
      </Box>
    </Box>
  );
};

export default FacturesPage;

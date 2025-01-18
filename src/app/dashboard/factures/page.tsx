import { getInvoices } from "@/actions/dashboard";
import { auth } from "../../../auth";
import PageHeader from "@/components/dashboard/PageHeader";
import AddIcon from "@/components/icons/AddIcon";
import DataTable from "@/components/ui/display/DataTable";
import { ROUTES } from "@/helpers/constant/routes";
import { invoiceColumnHelper } from "@/helpers/datatable/invoicesColumnsHelper";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { UserSession } from "@/helpers/constant/types";

const FacturesPage = async () => {
  const session = await auth();
  const invoices = await getInvoices();
  const userSession = session as UserSession;

  return (
    <Box w="full">
      <PageHeader title="Factures" />
      <Box mt="60px">
        <Flex w="full" justify="flex-end" my="20px">
          {userSession?.user.role === "admin" && (
            <Link href={ROUTES.INVOICE_FORM}>
              <Button textStyle="heading-sm" rounded="6px">
                <AddIcon fill="none" w="20px" h="20px" />
                Ajouter une facture
              </Button>
            </Link>
          )}
        </Flex>
        <DataTable data={invoices} columns={invoiceColumnHelper} />
      </Box>
    </Box>
  );
};

export default FacturesPage;

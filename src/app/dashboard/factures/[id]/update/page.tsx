"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import UpdateInvoiceForm from "@/components/dashboard/UpdateInvoiceForm";
import { Box, Flex } from "@chakra-ui/react";

const UpdateInvoicePage = () => {
  return (
    <Box w="full">
      <PageHeader title="Modifier une facture" />
      <Flex w="full" mt="60px" justify="center">
        <UpdateInvoiceForm />
      </Flex>
    </Box>
  );
};

export default UpdateInvoicePage;

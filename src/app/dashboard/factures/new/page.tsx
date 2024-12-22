"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import { Box, Flex } from "@chakra-ui/react";

import InvoiceForm from "@/components/dashboard/InvoiceForm";

const NewFacturePage = () => {
  return (
    <Box w="full">
      <PageHeader title="Ajouter une facture" />
      <Flex w="full" mt="60px" justify="center">
        <InvoiceForm />
      </Flex>
    </Box>
  );
};

export default NewFacturePage;

"use client";

import PageHeader from "@/components/dashboard/PageHeader";

import {
  createInvoiceInitialValue,
  CreateInvoiceType,
} from "@/helpers/formtypes/createInvoiceType";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import InputField from "@/components/ui/inputs/InputField";

const NewFacturePage = () => {
  return (
    <Box w="full">
      <PageHeader title="Ajouter une facture" />
      <Flex w="full" mt="60px" justify="center">
        <Formik<CreateInvoiceType>
          initialValues={createInvoiceInitialValue}
          onSubmit={() => {}}>
          {({ isSubmitting }) => (
            <Form>
              <Form>
                <VStack spaceY="20px" w="900px" maxW="900px">
                  <InputField
                    label="Email du destinataire"
                    name="email"
                    height="60px"
                    color="#64748B"
                  />
                  <InputField label="RIB utilisé" name="rib" color="#64748B" />
                  <InputField
                    label="Nom du drop"
                    name="dropName"
                    color="#64748B"
                  />
                  <InputField
                    label="Nom de la banque"
                    name="bank"
                    color="#64748B"
                  />

                  <InputField
                    label="Montant de la facture"
                    name="amount"
                    type="number"
                    color="#64748B"
                  />

                  <InputField
                    label="Echeance"
                    name="dueDate"
                    type="date"
                    color="#64748B"
                  />

                  <Flex w="full" justify="end">
                    <Button
                      loading={isSubmitting}
                      size="lg"
                      textStyle="heading-sm"
                      rounded="6">
                      Ajouter
                    </Button>
                  </Flex>
                </VStack>
              </Form>
            </Form>
          )}
        </Formik>
      </Flex>
    </Box>
  );
};

export default NewFacturePage;

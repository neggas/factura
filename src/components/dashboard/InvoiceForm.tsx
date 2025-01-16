"use client";

import {
  CreateInvoiceType,
  createInvoiceInitialValue,
} from "@/helpers/formtypes/createInvoiceType";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../ui/inputs/InputField";
import NumberFieldInput from "../ui/inputs/NumberInputField";
import { Button } from "../ui/button";
import { createInvoice } from "@/actions/dashboard";
import { invoiceValidationSchema } from "@/helpers/formvalidations/invoice-form-validator";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/constant/routes";
import AutocompleteInputField, {
  Option,
} from "../ui/inputs/AutocompleteInputField";
import { useEffect, useState } from "react";
import { getUsers } from "@/actions/dashboard/users";

const InvoiceForm = () => {
  const router = useRouter();
  const [drops, setDrops] = useState<Option[]>([]);
  const handleCreateInvoice = async (values: CreateInvoiceType) => {
    const invoiceBody = {
      ...values,
      dropName: values.drop.value,
      userId: values.drop.value,
    };
    const response = await createInvoice(invoiceBody);

    if (!response.success) {
      //TODO: handle error with useToast
    } else {
      router.push(ROUTES.INVOICES);
    }
  };

  useEffect(() => {
    const fetchDrops = async () => {
      const response = await getUsers("drop");
      if (response.success) {
        const drops = response.value.map((drop) => ({
          label: drop.name!,
          value: drop.id!,
        }));
        setDrops(drops);
      } else {
        //TODO: Hanlde notification to prevent error
      }
    };
    fetchDrops();
  }, []);

  return (
    <>
      <Formik<CreateInvoiceType>
        initialValues={createInvoiceInitialValue}
        validationSchema={invoiceValidationSchema}
        onSubmit={(values) => handleCreateInvoice(values)}>
        {({ isSubmitting }) => (
          <Form>
            <VStack spaceY="20px" w="900px" maxW="900px">
              <InputField
                label="Email du destinataire"
                name="email"
                height="60px"
                color="#64748B"
              />
              <InputField label="RIB utilisé" name="rib" color="#64748B" />

              <Box w="full">
                <AutocompleteInputField
                  options={drops}
                  name="drop"
                  label="Sélectionner un drop"
                />
              </Box>
              <InputField
                label="Nom de la banque"
                name="bank"
                color="#64748B"
              />

              <NumberFieldInput
                label="Montant de la facture"
                name="amount"
                color="#64748B"
                formatoptions={{
                  style: "decimal",
                  currency: "EUR",
                  currencyDisplay: "narrowSymbol",
                }}
              />

              <InputField
                label="Echeance"
                name="dueDate"
                type="date"
                color="#64748B"
              />

              <InputField label="Commentaire" name="comment" color="#64748B" />

              <InputField
                label="Lien de la facture"
                name="invoice"
                color="#64748B"
              />

              <Flex w="full" justify="end">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  size="lg"
                  textStyle="heading-sm"
                  rounded="6">
                  Ajouter
                </Button>
              </Flex>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InvoiceForm;

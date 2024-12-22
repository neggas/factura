"use client";

import {
  CreateInvoiceType,
  createInvoiceInitialValue,
} from "@/helpers/formtypes/createInvoiceType";
import { Flex, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikErrors } from "formik";
import InputField from "../ui/inputs/InputField";
import NumberFieldInput from "../ui/inputs/NumberInputField";
import FileInputField from "../ui/inputs/FileInputField";
import { Button } from "../ui/button";
import { createInvoice } from "@/actions/dashboard";
import { invoiceValidationSchema } from "@/helpers/formvalidations/invoice-form-validator";
import { FileType } from "@/helpers/constant/types";

const InvoiceForm = () => {
  const handleCreateInvoice = async (
    values: CreateInvoiceType,
    setErrors: (errors: FormikErrors<CreateInvoiceType>) => void
  ) => {
    const invoiceFile = values.invoice?.acceptedFiles[0] as unknown as FileType;
    const dataBody = { ...values, invoice: invoiceFile };

    const response = await createInvoice(dataBody);
  };

  return (
    <>
      <Formik<CreateInvoiceType>
        initialValues={createInvoiceInitialValue}
        validationSchema={invoiceValidationSchema}
        onSubmit={(values, { setErrors }) =>
          handleCreateInvoice(values, setErrors)
        }>
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
              <InputField label="Nom du drop" name="dropName" color="#64748B" />
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
                  style: "currency",
                  currency: "EUR",
                  currencyDisplay: "code",
                  currencySign: "accounting",
                }}
              />

              <InputField
                label="Echeance"
                name="dueDate"
                type="date"
                color="#64748B"
              />

              <InputField label="Commentaire" name="comment" color="#64748B" />

              <FileInputField
                name="invoice"
                label="Drag and drop here to upload"
                description=".png, .jpg .pdf"
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

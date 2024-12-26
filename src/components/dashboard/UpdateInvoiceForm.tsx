"use client";

import {
  createInvoiceInitialValue,
  CreateInvoiceType,
} from "@/helpers/formtypes/createInvoiceType";
import { Flex, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../ui/inputs/InputField";
import NumberFieldInput from "../ui/inputs/NumberInputField";
import { Button } from "../ui/button";
import { getInvoiceById, updateInvoice } from "@/actions/dashboard";
import { invoiceUpdateValidationSchema } from "@/helpers/formvalidations/invoice-form-validator";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { InvoiceType } from "@/helpers/datatable/invoicesColumnsHelper";
import { ROUTES } from "@/helpers/constant/routes";

const UpdateInvoiceForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [invoice, setInvoice] = useState<InvoiceType | null>(null);

  const asyncFetchInvoice = useCallback(async () => {
    const invoice = await getInvoiceById(id as string);
    if (!invoice.success) {
      throw new Error("Erreur lors de la récupération de la facture");
    }
    setInvoice(invoice.value);
  }, [id]);

  useEffect(() => {
    asyncFetchInvoice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (values: CreateInvoiceType) => {
    const response = await updateInvoice(id as string, values);

    if (!response.success) {
      throw new Error("Erreur lors de la mise à jour de la facture");
    }

    router.push(ROUTES.INVOICES);
  };

  return (
    <>
      <Formik<CreateInvoiceType>
        initialValues={createInvoiceInitialValue}
        validationSchema={invoiceUpdateValidationSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({ isSubmitting }) => (
          <Form>
            <VStack spaceY="20px" w="900px" maxW="900px">
              <InputField
                label="Email du destinataire"
                name="email"
                height="60px"
                color="#64748B"
                defaultValue={invoice?.email}
              />
              <InputField
                label="RIB utilisé"
                name="rib"
                color="#64748B"
                defaultValue={invoice?.rib}
              />
              <InputField
                label="Nom du drop"
                name="dropName"
                color="#64748B"
                defaultValue={invoice?.dropName}
              />
              <InputField
                label="Nom de la banque"
                name="bank"
                color="#64748B"
                defaultValue={invoice?.bank}
              />

              <NumberFieldInput
                label="Montant de la facture"
                name="amount"
                color="#64748B"
                defaultValue={invoice?.amount || ""}
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
                defaultValue={invoice?.dueDate}
              />

              <InputField
                label="Commentaire"
                name="comment"
                color="#64748B"
                defaultValue={invoice?.comment || ""}
              />

              <InputField
                label="Lien de la facture"
                name="invoice"
                color="#64748B"
                defaultValue={invoice?.invoice}
              />

              <Flex w="full" justify="end">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  size="lg"
                  textStyle="heading-sm"
                  rounded="6">
                  Modifier
                </Button>
              </Flex>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateInvoiceForm;

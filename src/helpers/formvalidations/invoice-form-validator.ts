import * as Yup from "yup";
import { CreateInvoiceType } from "../formtypes/createInvoiceType";

// Define the validation schema
export const invoiceValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  comment: Yup.string().optional(),

  invoice: Yup.string().required("Invoice file link is required"),

  dueDate: Yup.date().required("Due date is required"),

  amount: Yup.number()
    .typeError("Le montant doit être un nombre valide")
    .required("Le montant est requis")
    .positive("Le montant doit être positif")
    .max(9999999999.99, "Le montant est trop élevé")
    .test(
      "is-currency",
      "Le montant doit avoir deux décimales au maximum",
      (value) => {
        if (value === undefined) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }
    ),

  rib: Yup.string().required("RIB is required"), // Adjust the length if needed
  bank: Yup.string().required("Bank is required"),

  drop: Yup.object({
    label: Yup.string().required("Drop label is required"),
    value: Yup.string().required("Drop value is required"),
  }).required("Drop is required"),
});

export const invoiceUpdateValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  rib: Yup.string().required("RIB is required"), // Adjust the length if needed
  bank: Yup.string().required("Bank is required"),
  drop: Yup.object({
    label: Yup.string().required("Drop label is required"),
    value: Yup.string().required("Drop value is required"),
  }).required("Drop is required"),
  comment: Yup.string().optional(),
  invoice: Yup.string().required("Invoice file link is required"),
  dueDate: Yup.date().required("Due date is required"),
});

export const validateInvoice = (values: CreateInvoiceType) => {
  return invoiceValidationSchema
    .validate(values, { abortEarly: false })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.errors;
    });
};

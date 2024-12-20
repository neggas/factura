import * as Yup from "yup";
import { CreateInvoiceType } from "../formtypes/createInvoiceType";

// Define the validation schema
const invoiceValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  comment: Yup.string().optional(),

  invoice: Yup.string().required("Invoice number is required"),

  dueDate: Yup.date()
    .required("Due date is required")
    .min(new Date(), "Due date must be in the future"),

  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .max(9999999999.99, "Amount is too large")
    .test("is-decimal", "Amount must have two decimal places", (value) => {
      if (value === undefined) return true;
      // Ensure value is a number and has two decimal places
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),

  rib: Yup.string()
    .required("RIB is required")
    .length(22, "RIB must be 22 characters long"), // Adjust the length if needed

  bank: Yup.string().required("Bank is required"),

  dropName: Yup.string().required("Drop name is required"),

  status: Yup.mixed()
    .oneOf(
      ["paid", "pending", "lost"],
      "Status must be one of 'paid', 'pending', or 'lost'"
    )
    .default("pending"), // Default value for status
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

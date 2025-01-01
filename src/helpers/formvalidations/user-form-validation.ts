import * as Yup from "yup";

export const createUserValidationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email format").optional(),
  password: Yup.string().required("Password is required"),
  phone: Yup.string()
    .matches(/^\+?\d+$/, "Le numéro de téléphone doit être un numéro valide")
    .optional(),
});

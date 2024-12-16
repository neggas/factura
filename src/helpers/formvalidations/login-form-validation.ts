import { object, ObjectSchema, string } from "yup";
import { LoginType } from "../formtypes/loginTypes";

const loginValidationSchema: ObjectSchema<LoginType> = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

export default loginValidationSchema;

"use client";

import { Box, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Form, Formik, FormikErrors } from "formik";
import InputField from "../ui/inputs/InputField";
import { loginInitialValue, LoginType } from "@/helpers/formtypes/loginTypes";
import loginValidationSchema from "@/helpers/formvalidations/login-form-validation";
import { signIn } from "@/actions/auth/signin";
import { useRouter } from "next/navigation";

export default function LoginProcess() {
  const router = useRouter();

  const handleLogin = async (
    values: LoginType,
    setErrors: (errors: FormikErrors<LoginType>) => void
  ) => {
    const response = await signIn(values);
    if (response?.success === false) {
      const errorObject = JSON.parse(response.error);
      setErrors(errorObject);
      return false;
    }

    router.push("/dashboard");
  };

  return (
    <Formik<LoginType>
      initialValues={loginInitialValue}
      onSubmit={(values, { setErrors }) => handleLogin(values, setErrors)}
      validationSchema={loginValidationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <VStack spaceY="4">
            <InputField placeholder="Username" name="username" color="white" />

            <InputField
              type="password"
              placeholder="Mot de passe "
              name="password"
              color="white"
            />
          </VStack>

          <Box w="full" mt="8">
            <Button
              w="full"
              bg="white"
              color="black"
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="md"
              type="submit"
              loading={isSubmitting}>
              Login
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

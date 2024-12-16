import { Box, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import InputField from "../ui/inputs/InputField";
import { loginInitialValue, LoginType } from "@/helpers/formtypes/loginTypes";
import loginValidationSchema from "@/helpers/formvalidations/login-form-validation";

export default function LoginProcess() {
  const handleLogin = (values: LoginType) => {
    //TODO: do stuff for log user
    console.log(values);
  };

  return (
    <Formik<LoginType>
      initialValues={loginInitialValue}
      onSubmit={(values) => handleLogin(values)}
      validationSchema={loginValidationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <VStack spaceY="4">
            <InputField
              placeholder="Username"
              name="username"
              height="45px"
              width="full"
            />

            <InputField
              type="password"
              placeholder="Mot de passe "
              name="password"
              height="45px"
              width="full"
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

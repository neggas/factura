"use client";

import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../ui/inputs/InputField";
import { LuRefreshCw } from "react-icons/lu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/helpers/constant/routes";
import {
  createUserInitialValue,
  CreateUserType,
} from "@/helpers/formtypes/userFormTypes";
import { createUserValidationSchema } from "@/helpers/formvalidations/user-form-validation";
import { useMemo, useState } from "react";
import { createUserAction } from "@/actions/dashboard/users";

const UserForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleCreateUser = async (values: CreateUserType) => {
    const response = await createUserAction(values);
    if (!response.success) {
      console.log(response.error);
    } else {
      router.push(ROUTES.USERS);
    }
  };

  const generatePassword = useMemo(() => {
    return () => {
      const length = 12;
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~";
      let password = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
      }
      setPassword(password);
    };
  }, []);

  return (
    <Formik<CreateUserType>
      initialValues={createUserInitialValue}
      validationSchema={createUserValidationSchema}
      onSubmit={(values) => handleCreateUser(values)}>
      {({ isSubmitting }) => (
        <Form>
          <VStack spaceY="20px" w="900px" maxW="900px">
            <InputField
              label="Nom complet ou pseudo"
              name="fullname"
              height="60px"
              color="#64748B"
            />
            <InputField label="Email" name="email" color="#64748B" />

            <InputField
              label="Numéro de téléphone"
              name="phone"
              color="#64748B"
            />
            <Box w="full" position="relative">
              <InputField
                label="Mot de passe"
                name="password"
                color="#64748B"
                defaultValue={password}
              />
              <IconButton
                onClick={() => generatePassword()}
                position="absolute"
                right="0"
                bottom="0"
                w="45px"
                h="45px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                bg="black"
                aria-label="Générer un mot de passe">
                <LuRefreshCw fontSize="20px" />
              </IconButton>
            </Box>

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
  );
};

export default UserForm;

"use client";

import { Box, Flex, Button, VStack, Text } from "@chakra-ui/react";
import VectorIcon from "@/components/icons/Vectors";
import InputField from "@/components/ui/inputs/InputField";
import { Form, Formik } from "formik";

const LoginPage = () => {
  return (
    <Box
      height="full"
      width="full"
      bg="black"
      pos="relative"
      overflowY="hidden"
      overflowX="hidden">
      <Box pos="absolute" right="-460px" top="0" width="full" height="full">
        <VectorIcon width="full" height="full" />
      </Box>

      <Flex justifyContent="center" alignItems="center" height="full" w="full">
        <Box
          className="form-container"
          display="flex"
          gap="4"
          flexDirection="column"
          w="300px">
          <Text color="white" fontSize="30px" lineHeight="30px" mb="4">
            Connexion
          </Text>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={() => {}}>
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
                  name="username"
                  height="45px"
                  width="full"
                />
              </VStack>
            </Form>
          </Formik>

          <Box w="full" mt="8">
            <Button
              w="full"
              bg="white"
              color="black"
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="md">
              Login
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginPage;

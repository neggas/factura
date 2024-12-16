"use client";

import { Box, Flex, Button, VStack, Text } from "@chakra-ui/react";
import VectorIcon from "@/components/icons/Vectors";
import InputField from "@/components/ui/inputs/InputField";
import { Form, Formik } from "formik";
import LoginProcess from "@/components/login/Login-process";

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

          <LoginProcess />
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginPage;

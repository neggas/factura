"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import { Box, Flex } from "@chakra-ui/react";
import UserForm from "@/components/dashboard/UserForm";

const NewUserPage = () => {
  return (
    <Box w="full">
      <PageHeader title="Ajouter un utilisateur" />
      <Flex w="full" mt="60px" justify="center">
        <UserForm />
      </Flex>
    </Box>
  );
};

export default NewUserPage;

import PageHeader from "@/components/dashboard/PageHeader";
import AddIcon from "@/components/icons/AddIcon";
import DataTable from "@/components/ui/display/DataTable";
import { ROUTES } from "@/helpers/constant/routes";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { getUsers } from "@/actions/dashboard/users";
import { userColumn } from "@/helpers/datatable/usersColumn";

const Users = async () => {
  const users = await getUsers();

  if (users.success === false) {
    throw new Error(users.error);
  }

  const data = users.value;

  return (
    <Box w="full">
      <PageHeader title="Utilisateurs" />
      <Box mt="60px">
        <Flex w="full" justify="flex-end" my="20px">
          <Link href={ROUTES.ADD_USER}>
            <Button textStyle="heading-sm" rounded="6px">
              <AddIcon fill="none" w="20px" h="20px" />
              Ajouter un utilisateur
            </Button>
          </Link>
        </Flex>
        <DataTable data={data} columns={userColumn} />
      </Box>
    </Box>
  );
};

export default Users;

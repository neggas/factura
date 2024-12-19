import { Flex } from "@chakra-ui/react";
import InputFieldDumb from "../ui/dumbs/InputField";

import LoggedUser from "./LoggedUser";

const LayoutHeader = () => {
  return (
    <Flex
      className="layout-content-header"
      w="full"
      h="52px"
      px="24px"
      mt="5px"
      align="center">
      <InputFieldDumb
        name="globalSearch"
        maxW="506px"
        h="56px"
        w="506px"
        placeholder="Search..."
        color="black"
        outline="none"
        boxShadow="md"
      />
      <LoggedUser name="Segun Adebayor" />
    </Flex>
  );
};

export default LayoutHeader;

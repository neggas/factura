import { Box, Flex, Text } from "@chakra-ui/react";
import LoggedUser from "./LoggedUser";
import { navigationsLinks } from "@/helpers/constant/navigations-links";
import React from "react";
const Navbar = () => {
  return (
    <Box className="navbar" w="300px" h="full" borderRight="1px solid #E4E4E7">
      <Flex
        h="70px"
        justify="center"
        align="center"
        borderBottom="1px solid #E4E4E7">
        <Text color="black" textStyle="heading-lg">
          FACTURA
        </Text>
      </Flex>

      <Flex pl="10px" pr="16px" pt="16px" pb="10px" flexDir="column">
        <LoggedUser name="Segun Adebayor" />

        <Flex w="full" gap="20px" mt="24px" flexDir="column">
          {navigationsLinks.map((link, index) => (
            <React.Fragment key={index}>{link.component}</React.Fragment>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import PaymentIcon from "@/components/icons/Payment";
import AnalyseIcon from "@/components/icons/Analyse";
import DashboardIcon from "@/components/icons/Dashboard";
import InputFieldDumb from "@/components/ui/dumbs/InputField";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" h="full">
      <Box
        className="navbar"
        w="300px"
        h="full"
        borderRight="1px solid #E4E4E7">
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
          <Box
            w="full"
            py="12px"
            px="12px"
            border="2px solid #E4E4E7"
            cursor="pointer"
            rounded="4px"
            boxShadow="sm">
            <Flex gap="10px" align="center">
              <Avatar
                name="Segun Adebayor"
                w="20px"
                h="20px"
                size="lg"
                colorPalette="black"
              />
              <Text textStyle="body">Segun Adebayo (admin)</Text>
            </Flex>
          </Box>

          <Flex w="full" gap="20px" mt="24px" flexDir="column">
            <Link
              href="/dashboard"
              textAlign="left"
              h="36px"
              py="10px"
              px="12px"
              textStyle="heading-sm"
              rounded="6px"
              _hover={{
                textDecoration: "none",
                bg: "black",
                color: "white",
                "& path": {
                  stroke: "white",
                },
                "& ellipse": {
                  fill: "white",
                },
                "& rect": {
                  stroke: "white",
                },
              }}>
              <Flex w="full" gap="10px" align="center">
                <DashboardIcon fill="none" width="25px" height="25px" />
                <Text textAlign="left" textStyle="lg">
                  Tableau de bord
                </Text>
              </Flex>
            </Link>

            <Link
              href="/factures"
              textAlign="left"
              h="36px"
              py="10px"
              px="12px"
              textStyle="heading-sm"
              rounded="6px"
              _hover={{
                textDecoration: "none",
                bg: "black",
                color: "white",
                "& path": {
                  stroke: "white",
                },
                "& ellipse": {
                  fill: "white",
                },
                "& rect": {
                  stroke: "white",
                },
              }}>
              <Flex w="full" gap="10px" align="center">
                <PaymentIcon fill="none" width="25px" height="25px" />
                <Text textAlign="left" textStyle="lg">
                  Factures
                </Text>
              </Flex>
            </Link>
            <Link
              href="/dashboard"
              textAlign="left"
              h="36px"
              py="10px"
              px="12px"
              textStyle="heading-sm"
              rounded="6px"
              _hover={{
                textDecoration: "none",
                bg: "black",
                color: "white",
                "& path": {
                  stroke: "white", // Cible les traits des chemins SVG
                },
              }}>
              <Flex w="full" gap="10px" align="center">
                <AnalyseIcon fill="none" width="25px" height="25px" />
                <Text textAlign="left" textStyle="lg">
                  Devis
                </Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box w="calc(100% - 300px)" h="full" className="layout-content">
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

          <Box
            minW="256px"
            py="12px"
            px="12px"
            border="2px solid #E4E4E7"
            cursor="pointer"
            rounded="4px"
            boxShadow="sm">
            <Flex gap="10px" align="center">
              <Avatar
                name="Segun Adebayor"
                w="20px"
                h="20px"
                size="lg"
                colorPalette="black"
              />
              <Text textStyle="body">Segun Adebayo (admin)</Text>
            </Flex>
          </Box>
        </Flex>
        <Box
          className="layout-content-body"
          w="full"
          h="full"
          px="32px"
          py="32px">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;

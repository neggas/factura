import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/components/dashboard/Navbar";
import LayoutHeader from "@/components/dashboard/LayoutHeader";
import Firewall from "@/components/Firewall";
import { auth } from "@/auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userSession = await auth();

  return (
    <Firewall>
      <Flex w="full" h="full">
        <Navbar userName={userSession?.user?.name || ""} />
        <Box w="calc(100% - 300px)" h="full" className="layout-content">
          <LayoutHeader userName={userSession?.user?.name || ""} />
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
    </Firewall>
  );
};

export default DashboardLayout;
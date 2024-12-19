import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/components/dashboard/Navbar";
import LayoutHeader from "@/components/dashboard/LayoutHeader";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" h="full">
      <Navbar />
      <Box w="calc(100% - 300px)" h="full" className="layout-content">
        <LayoutHeader />
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

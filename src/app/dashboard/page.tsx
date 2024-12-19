import { auth } from "@/auth";
import { Box, Text } from "@chakra-ui/react";

const Dashboard = async () => {
  const session = await auth();
  console.log(session);
  return (
    <Box>
      <Text>Dashboard</Text>
    </Box>
  );
};

export default Dashboard;

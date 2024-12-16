import { Box, Flex, Input, Button } from "@chakra-ui/react";
import VectorIcon from "@/components/icons/Vectors";

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
          <Input placeholder="Username" name="username" w="full" h="45px" />
          <Input
            placeholder="Username"
            name="password"
            type="password"
            w="full"
            h="45px"
          />

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

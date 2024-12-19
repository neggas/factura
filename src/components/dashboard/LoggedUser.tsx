import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

interface LoggedUserProps {
  name: string;
}

const LoggedUser = ({ name }: LoggedUserProps) => {
  return (
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
        <Text textStyle="body">{name} (admin)</Text>
      </Flex>
    </Box>
  );
};

export default LoggedUser;

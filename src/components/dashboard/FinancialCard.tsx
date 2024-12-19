import { Box, Text } from "@chakra-ui/react";
import PaymentIcon from "../icons/Payment";

interface FinancialCardProps {
  title: string;
  amount: string;
}

const FinancialCard = ({ title, amount }: FinancialCardProps) => {
  return (
    <Box
      pos="relative"
      className="card"
      w="calc(100% / 3)"
      px="24px"
      py="24px"
      h="124px"
      border="1px solid #E4E4E7"
      rounded="12px"
      boxShadow="md">
      <Text textStyle="body">{title}</Text>
      <Text textStyle="heading-lg">{amount}</Text>
      <PaymentIcon
        fill="none"
        pos="absolute"
        right="10px"
        top="10px"
        width="30px"
        height="30px"
      />
    </Box>
  );
};

export default FinancialCard;

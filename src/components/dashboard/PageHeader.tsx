import { Separator, Text } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <>
      <Text textStyle="heading-lg">{title}</Text>
      <Separator variant="solid" mt="8" />
    </>
  );
};

export default PageHeader;

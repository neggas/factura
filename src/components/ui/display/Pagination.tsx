import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

interface PaginationProps {
  count: number;
  pageSize: number;
  defaultPage: number;
  nextPage: () => void;
  previousPage: () => void;
}

const Pagination = ({
  count,
  pageSize,
  defaultPage,
  nextPage,
  previousPage,
}: PaginationProps) => {
  return (
    <PaginationRoot
      count={count}
      pageSize={pageSize}
      defaultPage={defaultPage}
      variant="solid">
      <HStack>
        <PaginationPrevTrigger onClick={previousPage} />
        <PaginationItems />
        <PaginationNextTrigger onClick={nextPage} />
      </HStack>
    </PaginationRoot>
  );
};

export default Pagination;

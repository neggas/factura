import MoreIcon from "@/components/icons/MoreIcon";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";
import { InvoiceType } from "@/helpers/datatable/invoicesColumnsHelper";
import { useInvoiceStore } from "@/store";
import { Badge, Box } from "@chakra-ui/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export interface ActionMenuProps<T extends { id: string }> {
  onUpdate?: (id: string, router?: AppRouterInstance) => void;
  onDelete?: (id: string, handleInvoiceDelete: (id: string) => void) => void;
  onChangeStatus?: (
    id: string,
    status: "paid" | "lost" | "pending",
    handleUpdate: (id: string, invoice: InvoiceType) => void
  ) => Promise<void>;
  data: T;
}

const ActionMenu = <T extends { id: string }>({
  onUpdate,
  onDelete,
  onChangeStatus,
  data,
}: ActionMenuProps<T>) => {
  const updateInvoice = useInvoiceStore.use.updateInvoice();
  const deleteInvoice = useInvoiceStore.use.deleteInvoice();

  const router = useRouter();

  return (
    <Box w="170px">
      <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
        <MenuTrigger asChild cursor="pointer">
          <MoreIcon w="25px" h="25px" />
        </MenuTrigger>
        <MenuContent w="170px">
          {onUpdate && (
            <MenuItem value="update">
              <Button
                outline="none"
                onClick={() => onUpdate(data.id, router)}
                variant="ghost"
                textAlign="left"
                textStyle="md"
                p="0"
                _hover={{
                  bg: "transparent",
                }}>
                Modifier
              </Button>
            </MenuItem>
          )}

          {onChangeStatus && (
            <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
              <MenuTriggerItem value="open-recent">Status</MenuTriggerItem>
              <MenuContent>
                <MenuItem value="paid">
                  <Button
                    outline="none"
                    variant="ghost"
                    textAlign="left"
                    textStyle="md"
                    p="0"
                    onClick={() =>
                      onChangeStatus(data.id, "paid", updateInvoice)
                    }>
                    <Badge colorPalette="green" size="lg">
                      Payé
                    </Badge>
                  </Button>
                </MenuItem>
                <MenuItem value="lost">
                  <Button
                    outline="none"
                    variant="ghost"
                    textAlign="left"
                    textStyle="md"
                    p="0"
                    onClick={() =>
                      onChangeStatus(data.id, "lost", updateInvoice)
                    }>
                    <Badge colorPalette="red" size="lg">
                      Perdu
                    </Badge>
                  </Button>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          )}

          {onDelete && (
            <MenuItem
              w="full"
              value="delete"
              color="red.500"
              _hover={{ bg: "bg.error", color: "fg.error" }}>
              <Button
                outline="none"
                onClick={() => onDelete(data.id, deleteInvoice)}
                variant="ghost"
                textAlign="left"
                textStyle="md"
                color="red.500"
                p="0"
                _hover={{
                  bg: "transparent",
                }}>
                Supprimer
              </Button>
            </MenuItem>
          )}
        </MenuContent>
      </MenuRoot>
    </Box>
  );
};

export default ActionMenu;

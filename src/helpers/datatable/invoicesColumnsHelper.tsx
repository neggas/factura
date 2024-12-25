"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { CreateInvoiceType } from "../formtypes/createInvoiceType";
import LinkIcon from "@/components/icons/LinkIcon";
import Link from "next/link";
import { Badge, Text } from "@chakra-ui/react";
import { frenchDateFormat } from "../date";
import ActionMenu from "@/components/ui/display/ActionMenu";
import { updateInvoiceStatus, deleteInvoice } from "@/actions/dashboard";

export type InvoiceType = CreateInvoiceType & {
  status: "pending" | "paid" | "lost";
  id: string;
};

const handleChangeStatus = async (
  id: string,
  status: "paid" | "lost" | "pending",
  updateInvoice: (id: string, invoice: InvoiceType) => void
) => {
  const response = await updateInvoiceStatus(id, status);
  if (!response.success) {
    throw new Error("Une erreur est apparu");
  }

  const updatedInvoice = response.value;
  updateInvoice(id, updatedInvoice);
};

const handleDeleteInvoice = async (
  id: string,
  deleteInvoiceStateAction: (id: string) => void
) => {
  const response = await deleteInvoice(id);
  if (!response.success) {
    throw new Error("Une erreur est apparu");
  }
  deleteInvoiceStateAction(id);
  deleteInvoice(id);
};

const columnHelper = createColumnHelper<InvoiceType>();
export const invoiceColumnHelper = [
  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.comment, {
    id: "comment",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Commentaire</span>,
  }),
  columnHelper.accessor("rib", {
    id: "rib",
    header: () => "RIB",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("bank", {
    id: "bank",
    header: () => <span>Banque</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dropName", {
    id: "dropName",
    header: () => <span>Nom du drop</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: () => <span>Montant</span>,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("dueDate", {
    id: "dueDate",
    header: () => <span>Echéance</span>,
    cell: (info) => frenchDateFormat(info.getValue()),
  }),

  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: "Status",
    cell: (info) => {
      let badgeColor = "orange";
      if (info.getValue() === "paid") badgeColor = "green";
      if (info.getValue() === "lost") badgeColor = "red";

      return (
        <Badge colorPalette={badgeColor} size="md">
          <Text textStyle="md">{info.getValue()}</Text>
        </Badge>
      );
    },
  }),
  columnHelper.accessor("invoice", {
    id: "invoice",
    header: "Voir la facture",
    cell: (info) => {
      return (
        <Link href={info.getValue()} target="_blank">
          <LinkIcon w="25px" h="25px" />
        </Link>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => {
      return (
        <ActionMenu
          data={info.row.original}
          onChangeStatus={handleChangeStatus}
          onDelete={handleDeleteInvoice}
        />
      );
    },
  }),
];

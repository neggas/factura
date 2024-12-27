"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { CreateInvoiceType } from "../formtypes/createInvoiceType";
import LinkIcon from "@/components/icons/LinkIcon";
import Link from "next/link";
import { Badge, Text } from "@chakra-ui/react";
import { frenchDateFormat } from "../date";

export type InvoiceType = CreateInvoiceType & {
  status: "pending" | "paid" | "lost";
  id: string;
};

const columnHelper = createColumnHelper<InvoiceType>();
export const incomingInvoiceColumn = [
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
];

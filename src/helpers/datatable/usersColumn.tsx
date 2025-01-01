"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { User } from "../constant/types";
import { Text } from "@chakra-ui/react";
import { frenchDateFormat } from "../date";

const usersColumnHelper = createColumnHelper<Partial<User>>();
export const userColumn = [
  usersColumnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <Text>Nom</Text>,
  }),
  usersColumnHelper.accessor("email", {
    id: "email",
    cell: (info) => info.getValue(),
    header: () => <Text>Email</Text>,
  }),
  usersColumnHelper.accessor("created_at", {
    id: "created_at",
    cell: (info) => frenchDateFormat(`${info.getValue()}`),
    header: () => <Text>Date d&apos;ajout</Text>,
  }),
];

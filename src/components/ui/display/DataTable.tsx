"use client";

import { Box, Flex, Table } from "@chakra-ui/react";
import Pagination from "./Pagination";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

import InputFieldDumb from "../dumbs/InputField";

interface DataTableProps<T> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
}

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<unknown> = (row, _columnId, value, addMeta) => {
  // Check each column in the row
  const itemRanks = row.getAllCells().map((cell) => {
    const itemRank = rankItem(cell.getValue(), value);
    return itemRank;
  });

  // Find the best rank
  const bestRank = itemRanks.reduce<RankingInfo>(
    (best, current) =>
      current.passed && current.rank < best.rank ? current : best,
    {
      passed: false,
      rank: Infinity,
      rankedValue: "",
      accessorIndex: -1,
      accessorThreshold: 0,
    } as RankingInfo
  );

  // Store the best itemRank info
  addMeta({
    itemRank: bestRank,
  });

  // Return if any item should be filtered in/out
  return bestRank.passed;
};

const DataTable = <T,>({ data, columns }: DataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const nextPage = () => {
    table.nextPage();
  };

  const previousPage = () => {
    table.previousPage();
  };

  return (
    <Box borderWidth="1px" rounded="lg" maxHeight="400px" overflowY="auto">
      <Flex w="full" mt="20px" py="10px" justifyContent="flex-end" px="2">
        <InputFieldDumb
          name="search"
          placeholder="Rechercher..."
          maxW="300px"
          display="inline-block"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </Flex>
      <Table.Root size="lg" rounded="lg" variant="outline">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <React.Fragment key={header.id}>
                  <Table.ColumnHeader>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.ColumnHeader>
                </React.Fragment>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box
        w="full"
        mt="16"
        display="flex"
        justifyContent="flex-end"
        justifyItems="center"
        pr="2"
        mb="4">
        <Pagination
          count={table.getPageCount()}
          pageSize={table.getState().pagination.pageSize}
          defaultPage={table.getState().pagination.pageIndex + 1}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </Box>
    </Box>
  );
};

export default DataTable;

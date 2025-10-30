"use client";
import { CustomPagination } from "@/components/ui/blocks/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/blocks/table";
import { useGeneralContext } from "@/context/GeneralContext";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { GeneralClientsTableHeader } from "./general-client-table-header";
import { GeneralClientTableItem } from "./general-client-table-row";

type SortableColumn = "NAME" | "BIRTH_DATE" | null;

type SortDirection = "ASC" | "DESC" | null;

export function GeneralClientsTable() {
  const {
    clients,
    isGettingClients,
    clientsFilters,
    setClientsFilters,
    clientsTotalPages,
    setRecordingsFilters,
  } = useGeneralContext();

  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<SortableColumn>(null);

  const GeneralClientsColumns = [
    { key: "NAME", label: "Nome do Paciente", sortable: true },
    { key: "BIRTH_DATE", label: "Data de Nascimento", sortable: true },
    // { key: "RECORDINGS", label: "Quantidade de Gravações", sortable: true },
    { key: "ACTIONS", label: "Ações", sortable: false },
  ];

  const applySortToFilters = (
    column: SortableColumn,
    direction: SortDirection,
  ) => {
    const sortField = direction ? column : undefined;
    const sortOrder = direction || undefined;

    setClientsFilters((prev) => ({
      ...prev,
      sortBy: (sortField as SortableColumn | undefined) || undefined,
      sortDirection: sortOrder || undefined,
      page: 1,
    }));
  };

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      const next =
        sortDirection === "ASC"
          ? "DESC"
          : sortDirection === "DESC"
            ? null
            : "ASC";
      setSortDirection(next || null);
      setSortColumn(next ? column : null);
      applySortToFilters(column, next);
    } else {
      setSortColumn(column);
      setSortDirection("ASC");
      applySortToFilters(column, "ASC");
    }
  };

  const getSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column)
      return <ChevronUp className="h-4 w-4 text-gray-300" />;
    if (sortDirection === "ASC")
      return <ChevronUp className="h-4 w-4 text-gray-600" />;
    if (sortDirection === "DESC")
      return <ChevronDown className="h-4 w-4 text-gray-600" />;
    return <ChevronUp className="h-4 w-4 text-gray-300" />;
  };

  useEffect(() => {
    setRecordingsFilters((prev) => ({
      ...prev,
      type: undefined,
      page: 1,
    }));
  }, []);

  return (
    <>
      <GeneralClientsTableHeader />
      <Table wrapperClass="h-full rounded-t-3xl">
        <TableHeader>
          <TableRow className="gap-1 bg-neutral-200">
            {GeneralClientsColumns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  "h-12 text-sm text-zinc-500",
                  column.sortable && "cursor-pointer",
                )}
                onClick={() =>
                  column.sortable && handleSort(column.key as SortableColumn)
                }
              >
                <div
                  className={cn(
                    "flex w-max items-center gap-2",
                    column.key === "ACTIONS" && "justify-end",
                  )}
                >
                  {column.label}
                  {column.sortable && getSortIcon(column.key as SortableColumn)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {isGettingClients
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {GeneralClientsColumns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      className="h-14 animate-pulse bg-zinc-50"
                    />
                  ))}
                </TableRow>
              ))
            : !isGettingClients && clients.length !== 0
              ? clients.map((row) => (
                  <GeneralClientTableItem key={row.id} client={row} />
                ))
              : !isGettingClients &&
                clients.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={GeneralClientsColumns.length}
                      className="h-24"
                    >
                      <div className="flex w-full items-center justify-center">
                        Nenhum Paciente encontrado.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
        </TableBody>
      </Table>
      {!isGettingClients && clientsTotalPages > 1 && (
        <div className="border-t border-t-zinc-200 p-2">
          <CustomPagination
            currentPage={clientsFilters.page}
            setCurrentPage={(page) =>
              setClientsFilters((prev) => ({ ...prev, page }))
            }
            pages={clientsTotalPages}
          />
        </div>
      )}
    </>
  );
}

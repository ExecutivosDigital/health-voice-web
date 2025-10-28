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
import { useState } from "react";
import { GeneralAppointmentsTableHeader } from "./general-appointments-table-header";
import { GeneralAppointmentTableItem } from "./general-appointments-table-row";

type SortableColumn = "ID" | "TITLE" | "DATE" | "DURATION" | "STATUS" | null;

type SortDirection = "ASC" | "DESC" | null;

export function GeneralAppointmentsTable() {
  const {
    appointments,
    isGettingAppointments,
    appointmentsFilters,
    setAppointmentsFilters,
    appointmentsPages,
  } = useGeneralContext();

  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<SortableColumn>(null);

  const GeneralAppointmentsColumns = [
    { key: "ID", label: "ID", sortable: true },
    { key: "TITLE", label: "Título da Gravação", sortable: true },
    { key: "DATE", label: "Data da Gravação", sortable: true },
    { key: "DURATION", label: "Tempo de Gravação", sortable: true },
    { key: "STATUS", label: "Status", sortable: true },
    { key: "ACTIONS", label: "Ações", sortable: false },
  ];

  const applySortToFilters = (
    column: SortableColumn,
    direction: SortDirection,
  ) => {
    const sortField = direction ? column : undefined;
    const sortOrder = direction || undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAppointmentsFilters((prev: any) => ({
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

  return (
    <>
      <GeneralAppointmentsTableHeader />
      <Table wrapperClass="h-full">
        <TableHeader>
          <TableRow className="gap-1 bg-neutral-200">
            {GeneralAppointmentsColumns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  "h-12 text-sm text-zinc-500",
                  column.sortable && "cursor-pointer",
                  (column.key === "exceedLedgerAccountBudget" ||
                    column.key === "exceedResultCenterBudget") &&
                    "w-48 max-w-48 min-w-48 text-xs",
                )}
                onClick={() =>
                  column.sortable && handleSort(column.key as SortableColumn)
                }
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.sortable && getSortIcon(column.key as SortableColumn)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {isGettingAppointments
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {GeneralAppointmentsColumns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      className="h-14 animate-pulse bg-zinc-50"
                    />
                  ))}
                </TableRow>
              ))
            : !isGettingAppointments && appointments.length !== 0
              ? appointments.map((row) => (
                  <GeneralAppointmentTableItem key={row.id} appointment={row} />
                ))
              : !isGettingAppointments &&
                appointments.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={GeneralAppointmentsColumns.length}
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
      {appointments.length !== 0 && (
        <div className="border-t border-t-zinc-200 p-2">
          <CustomPagination
            currentPage={appointmentsFilters.page}
            setCurrentPage={(page) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setAppointmentsFilters((prev: any) => ({ ...prev, page }))
            }
            pages={appointmentsPages}
          />
        </div>
      )}
    </>
  );
}

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
import { GeneralRemindersTableHeader } from "./general-reminder-table-header";
import { GeneralReminderTableItem } from "./general-reminder-table-row";

type SortableColumn = "NAME" | "DATE" | "DESCRIPTION" | null;

type SortDirection = "ASC" | "DESC" | null;

export function GeneralRemindersTable() {
  const {
    reminders,
    isGettingReminders,
    remindersFilters,
    setRemindersFilters,
    remindersTotalPages,
    setRecordingsFilters,
  } = useGeneralContext();

  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<SortableColumn>(null);

  const GeneralRemindersColumns = [
    { key: "NAME", label: "Título da Gravação", sortable: true },
    { key: "DATE", label: "Data da Gravação", sortable: true },
    { key: "DESCRIPTION", label: "Descrição", sortable: true },
    { key: "ACTIONS", label: "Ações", sortable: false },
  ];

  const applySortToFilters = (
    column: SortableColumn,
    direction: SortDirection,
  ) => {
    const sortField = direction ? column : undefined;
    const sortOrder = direction || undefined;

    setRemindersFilters((prev) => ({
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

  useEffect(() => {
    setRecordingsFilters((prev) => ({
      ...prev,
      type: undefined,
      page: 1,
    }));
  }, []);

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
      <GeneralRemindersTableHeader />
      <Table wrapperClass="h-full rounded-t-3xl">
        <TableHeader>
          <TableRow className="gap-1 bg-neutral-200">
            {GeneralRemindersColumns.map((column) => (
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
                    column.key === "ACTIONS" && "w-full justify-end",
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
          {isGettingReminders
            ? Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={index}>
                  {GeneralRemindersColumns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      className="h-14 animate-pulse bg-zinc-50"
                    />
                  ))}
                </TableRow>
              ))
            : !isGettingReminders && reminders.length !== 0
              ? reminders.map((row) => (
                  <GeneralReminderTableItem key={row.id} reminder={row} />
                ))
              : !isGettingReminders &&
                reminders.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={GeneralRemindersColumns.length}
                      className="h-24"
                    >
                      <div className="flex w-full items-center justify-center">
                        Nenhum Lembrete encontrado.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
        </TableBody>
      </Table>
      {!isGettingReminders && remindersTotalPages > 1 && (
        <div className="border-t border-t-zinc-200 p-2">
          <CustomPagination
            currentPage={remindersFilters.page}
            setCurrentPage={(page) =>
              setRemindersFilters((prev) => ({ ...prev, page }))
            }
            pages={remindersTotalPages}
          />
        </div>
      )}
    </>
  );
}

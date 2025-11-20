"use client";
import { AudioRecorder } from "@/components/audio-recorder/audio-recorder";
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

type SortableColumn = "NAME" | "CREATED_AT" | "DURATION" | null;

type SortDirection = "ASC" | "DESC" | null;

export function GeneralRemindersTable() {
  const {
    recordings,
    isGettingRecordings,
    recordingsFilters,
    setRecordingsFilters,
    recordingsTotalPages,
  } = useGeneralContext();

  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortColumn, setSortColumn] = useState<SortableColumn>(null);

  const GeneralRemindersColumns = [
    { key: "NAME", label: "Título da Gravação", sortable: true },
    { key: "CREATED_AT", label: "Data da Gravação", sortable: true },
    { key: "DURATION", label: "Tempo de Gravação", sortable: true },
    { key: "ACTIONS", label: "Ações", sortable: false },
  ];

  const applySortToFilters = (
    column: SortableColumn,
    direction: SortDirection,
  ) => {
    const sortField = direction ? column : undefined;
    const sortOrder = direction || undefined;

    setRecordingsFilters((prev) => ({
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
      query: undefined,
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

  useEffect(() => {
    setRecordingsFilters((prev) => ({
      ...prev,
      clientId: undefined,
      query: undefined,
      sortBy: undefined,
      sortDirection: undefined,
      type: "REMINDER",
      page: 1,
    }));
  }, []);

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
          {isGettingRecordings
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
            : !isGettingRecordings && recordings.length !== 0
              ? recordings.map((row) => (
                  <GeneralReminderTableItem key={row.id} reminder={row} />
                ))
              : !isGettingRecordings &&
                recordings.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={GeneralRemindersColumns.length}
                      className="h-24"
                    >
                      <div className="flex items-start text-start">
                        <AudioRecorder buttonClassName="bg-primary hover:bg-primary/95 text-white mx-auto" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
        </TableBody>
      </Table>
      {!isGettingRecordings && recordingsTotalPages > 1 && (
        <div className="border-t border-t-zinc-200 p-2">
          <CustomPagination
            currentPage={recordingsFilters.page}
            setCurrentPage={(page) =>
              setRecordingsFilters((prev) => ({ ...prev, page }))
            }
            pages={recordingsTotalPages}
          />
        </div>
      )}
    </>
  );
}

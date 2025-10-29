"use client";
import { ClientProps, RecordingDetailsProps } from "@/@types/general-client";
import { TableCell, TableRow } from "@/components/ui/blocks/table";
import { useGeneralContext } from "@/context/GeneralContext";
import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";

interface Props {
  recording: RecordingDetailsProps;
}

export function GeneralRecordingTableItem({ recording }: Props) {
  const {
    setSelectedRecording,
    setSelectedClient,
    recordingsFilters,
    setRecordingsFilters,
  } = useGeneralContext();
  const router = useRouter();

  return (
    <TableRow
      key={recording.id}
      className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
    >
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {recording.name || "N/A"}
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {moment(recording.createdAt).format("DD/MM/YYYY HH:mm") || "N/A"}
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {recording.duration || "N/A"}
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {recording.type === "CLIENT"
          ? "Consulta"
          : recording.type === "STUDY"
            ? "Estudos"
            : recording.type === "REMINDER"
              ? "Lembrete"
              : recording.type === "OTHER"
                ? "Outro"
                : "N/A"}
      </TableCell>
      <TableCell className="py-2 text-xs font-medium whitespace-nowrap text-zinc-400">
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              if (recording.client === null) return;
              setSelectedClient(recording.client as ClientProps);
              setSelectedRecording(recording);
              setRecordingsFilters({
                ...recordingsFilters,
                clientId: recording.client?.id as string,
              });
              router.push(`/clients/${recording.client?.id}/${recording.id}`);
            }}
            className={cn(
              "bg-primary flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-white",
              recording.client === null && "cursor-not-allowed opacity-50",
            )}
          >
            <span>Acessar</span>
            <ChevronRight className="h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

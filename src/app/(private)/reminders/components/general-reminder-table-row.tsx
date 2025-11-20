"use client";
import { RecordingDetailsProps } from "@/@types/general-client";
import { TableCell, TableRow } from "@/components/ui/blocks/table";
import { useGeneralContext } from "@/context/GeneralContext";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";

interface Props {
  reminder: RecordingDetailsProps;
}

export function GeneralReminderTableItem({ reminder }: Props) {
  const { setSelectedRecording } = useGeneralContext();
  const router = useRouter();

  return (
    <TableRow
      key={reminder.id}
      className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
    >
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {reminder.name || "N/A"}
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {moment(reminder.createdAt).format("DD/MM/YYYY HH:mm") || "N/A"}
      </TableCell>
      <TableCell className="w-80 max-w-80 truncate py-0.5 text-start text-sm font-medium whitespace-nowrap">
        <span className="w-80 max-w-80 truncate">
          {reminder.duration || "N/A"}
        </span>
      </TableCell>
      <TableCell className="py-2 text-xs font-medium whitespace-nowrap text-zinc-400">
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setSelectedRecording(reminder);
              router.push(`/reminders/${reminder.id}`);
            }}
            className="bg-primary group flex items-center gap-2 rounded-3xl px-2 py-1 text-sm text-white transition ease-in-out hover:shadow-md"
          >
            <span>Acessar</span>
            <ChevronRight className="h-4 transition ease-in-out group-hover:translate-x-1" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

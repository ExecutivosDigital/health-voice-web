"use client";
import { RecordingDetailsProps } from "@/@types/general-client";
import { TableCell, TableRow } from "@/components/ui/blocks/table";
import { useGeneralContext } from "@/context/GeneralContext";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";

interface Props {
  recording: RecordingDetailsProps;
}

export function GeneralStudiesTableItem({ recording }: Props) {
  const { setSelectedRecording } = useGeneralContext();
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
      <TableCell className="w-80 max-w-80 truncate py-0.5 text-start text-sm font-medium whitespace-nowrap">
        <span>{recording.duration || "N/A"}</span>
      </TableCell>
      <TableCell className="py-2 text-xs font-medium whitespace-nowrap text-zinc-400">
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setSelectedRecording(recording);
              router.push(`/studies/${recording.id}`);
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

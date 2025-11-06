"use client";
import { RecordingDetailsProps } from "@/@types/general-client";
import { TableCell, TableRow } from "@/components/ui/blocks/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/blocks/tooltip";
import { useGeneralContext } from "@/context/GeneralContext";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  recording: RecordingDetailsProps;
}

export function GeneralOthersTableItem({ recording }: Props) {
  const { setSelectedRecording } = useGeneralContext();
  const router = useRouter();
  const [selectedTooltip, setSelectedTooltip] = useState<string | null>(null);

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
        <TooltipProvider>
          <Tooltip
            open={selectedTooltip === recording.id}
            onOpenChange={() =>
              setSelectedTooltip(
                selectedTooltip === recording.id
                  ? null
                  : (recording.id as string),
              )
            }
          >
            <TooltipTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTooltip(recording.id as string);
              }}
            >
              <span className="w-80 max-w-80 truncate">
                {recording.description || "N/A"}
              </span>
            </TooltipTrigger>
            <TooltipContent
              className="text-primary flex max-w-80 overflow-auto bg-white text-wrap xl:max-w-[500px]"
              side="top"
              align="start"
            >
              <span>{recording.description}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="py-2 text-xs font-medium whitespace-nowrap text-zinc-400">
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setSelectedRecording(recording);
              router.push(`/others/${recording.id}`);
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

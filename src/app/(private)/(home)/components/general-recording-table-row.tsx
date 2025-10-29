import { RecordingDetailsProps } from "@/@types/general-client";
import { TableCell, TableRow } from "@/components/ui/blocks/table";

interface Props {
  recording: RecordingDetailsProps;
}

export function GeneralRecordingTableItem({ recording }: Props) {
  return (
    <TableRow
      key={recording.id}
      className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
    >
      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
        <div className="flex items-center gap-4 text-center"></div>
      </TableCell>

      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        <div className="flex w-full items-center justify-center">1</div>
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        <div className="flex w-full items-center justify-center">2</div>
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        3
      </TableCell>
      <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
        {/* <div
          className={cn(
            "w-full text-center",
            recording.status === "CLOSED" || recording.status === "Recebido"
              ? "rounded-md border border-[#00A181] bg-[#00A181]/20 px-2 py-1 text-[#00A181]"
              : recording.status === "PENDING" ||
                  recording.status === "REJECTED"
                ? "rounded-md border border-[#EF4444] bg-[#EF4444]/20 px-2 py-1 text-[#EF4444]"
                : recording.status === "APPROVED"
                  ? "rounded-md border border-blue-500 bg-blue-500/20 px-2 py-1 text-blue-500"
                  : recording.status === "DRAFT"
                    ? "rounded-md border border-[#afafaf] bg-[#afafaf]/20 px-2 py-1 text-[#afafaf]"
                    : "rounded-md border border-[#D4A300] bg-[#D4A300]/20 px-2 py-1 text-[#D4A300]",
          )}
        >
          {recording.status === "PENDING"
            ? "Aguardando Aprovação"
            : recording.status === "APPROVED"
              ? "Aguardando Pagamento"
              : recording.status === "REJECTED"
                ? "Rejeitado"
                : recording.status === "CLOSED"
                  ? "Pago"
                  : recording.status === "DRAFT"
                    ? "Rascunho"
                    : "N/A"}{" "}
        </div> */}
      </TableCell>
      <TableCell className="py-2 text-end text-sm font-medium whitespace-nowrap text-zinc-400 underline">
        4
      </TableCell>
    </TableRow>
  );
}

"use client";
import { ClientProps } from "@/@types/general-client";
import { TableCell, TableRow } from "@/components/ui/blocks/table";
import { useGeneralContext } from "@/context/GeneralContext";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  client: ClientProps;
}

export function GeneralClientTableItem({ client }: Props) {
  const { setSelectedClient, recordingsFilters, setRecordingsFilters } =
    useGeneralContext();
  const router = useRouter();

  return (
    <TableRow
      key={client.id}
      className="hover:bg-primary/20 h-14 cursor-pointer py-8 text-center transition duration-300"
    >
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-10 w-10 max-w-10 min-w-10 items-center justify-center rounded-full">
            <Image
              src="/icons/user.png"
              alt=""
              width={100}
              height={100}
              className="h-4 w-max object-contain"
            />
          </div>
          {client.name || "N/A"}
        </div>
      </TableCell>
      <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        {moment(client.birthDate).format("DD/MM/YYYY") || "N/A"}
      </TableCell>
      {/* <TableCell className="py-0.5 text-start text-sm font-medium whitespace-nowrap">
        3
      </TableCell> */}
      <TableCell className="py-2 text-xs font-medium whitespace-nowrap text-zinc-400">
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setSelectedClient(client);
              setRecordingsFilters({
                ...recordingsFilters,
                clientId: client.id,
              });
              router.push(`/clients/${client.id}`);
            }}
            className="bg-primary flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-white"
          >
            <span>Acessar</span>
            <ChevronRight className="h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

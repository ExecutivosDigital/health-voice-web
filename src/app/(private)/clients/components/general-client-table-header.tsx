import { cn } from "@/utils/cn";
import { Search, Upload } from "lucide-react";

export function GeneralClientsTableHeader() {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <label
        htmlFor="search"
        className="group relative h-8 w-80 rounded-3xl border border-neutral-300 transition focus-within:border-neutral-500"
      >
        <Search className="absolute top-1/2 left-2 h-4 -translate-y-1/2 text-neutral-300 transition group-focus-within:text-neutral-500" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar..."
          className="peer h-full w-full rounded-3xl px-8 text-neutral-700 outline-none placeholder:text-neutral-300"
        />
      </label>
      <button
        className={cn(
          "flex h-8 items-center gap-2 rounded-3xl border border-neutral-300 px-4 text-neutral-500",
          "cursor-auto opacity-50",
        )}
      >
        <Upload className="h-4" />
        <span className="font-semibold">Exportar</span>
      </button>
    </div>
  );
}

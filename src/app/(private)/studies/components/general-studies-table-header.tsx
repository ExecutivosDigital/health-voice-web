import { Search, Upload } from "lucide-react";

export function GeneralStudiesTableHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <label htmlFor="search" className="rounded-3x relative h-10 w-80">
        <Search className="absolute top-1/2 left-2 -translate-y-1/2 text-neutral-300" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar..."
          className="h-full w-full rounded-3xl border border-neutral-300 px-8 text-neutral-500 outline-none placeholder:text-neutral-300"
        />
      </label>
      <button className="flex h-10 items-center gap-2 rounded-3xl border border-neutral-300 px-4 text-black">
        <Upload />
        <span className="font-semibold">Exportar</span>
      </button>
    </div>
  );
}

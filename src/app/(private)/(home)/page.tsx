import { GeneralRecordingsTable } from "./components/general-recording-table";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <GeneralRecordingsTable />
    </div>
  );
}

import { GeneralPatientsTable } from "./components/general-patient-table";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <GeneralPatientsTable />
    </div>
  );
}

import { GeneralAppointmentsTable } from "./components/general-appointments-table";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <GeneralAppointmentsTable />
    </div>
  );
}

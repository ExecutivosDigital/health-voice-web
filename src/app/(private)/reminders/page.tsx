import { GeneralRemindersTable } from "./components/general-reminder-table";

export default function Reminders() {
  return (
    <div className="flex w-full flex-col gap-4">
      <GeneralRemindersTable />
    </div>
  );
}

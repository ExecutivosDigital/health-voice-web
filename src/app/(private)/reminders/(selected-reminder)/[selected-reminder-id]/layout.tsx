"use client";

import { useGeneralContext } from "@/context/GeneralContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedReminder } = useGeneralContext();
  const router = useRouter();

  useEffect(() => {
    if (!selectedReminder) {
      router.push("/reminders");
    }
  }, [selectedReminder]);

  return <>{children}</>;
}

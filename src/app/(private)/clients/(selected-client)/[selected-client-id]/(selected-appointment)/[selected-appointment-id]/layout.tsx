"use client";

import { useGeneralContext } from "@/context/GeneralContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedClient, selectedRecording } = useGeneralContext();
  const router = useRouter();

  useEffect(() => {
    if (!selectedClient || !selectedRecording) {
      router.push("/clients");
    }
  }, [selectedClient, selectedRecording]);

  return <>{children}</>;
}

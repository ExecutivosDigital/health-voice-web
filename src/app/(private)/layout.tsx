"use client";
import { AudioRecorder } from "@/components/audio-recorder/audio-recorder";
import { AuthGuard } from "@/components/auth-guard";
import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/sidebar";
import { GeneralContextProvider } from "@/context/GeneralContext";
import Lenis from "lenis";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <AuthGuard>
      <GeneralContextProvider>
        <div className="relative flex w-full flex-col pb-20">
          <Header />
          <Sidebar />
          <div className="z-10 mx-auto -mt-12 flex min-h-[75vh] w-full max-w-[1280px] flex-col gap-4 overflow-hidden rounded-3xl bg-white p-4">
            <AudioRecorder />
            {children}
          </div>
        </div>
      </GeneralContextProvider>
    </AuthGuard>
  );
}

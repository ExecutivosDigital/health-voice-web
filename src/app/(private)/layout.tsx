"use client";
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
    <GeneralContextProvider>
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <Sidebar />
        <div className="z-10 mx-auto -mt-12 flex h-[80vh] w-full max-w-[1280px] flex-col gap-4 rounded-t-3xl bg-white p-4">
          {children}
        </div>
      </div>
    </GeneralContextProvider>
  );
}

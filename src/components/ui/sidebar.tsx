"use client";
import { useSidebar } from "@/store";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function Sidebar() {
  const { mobileMenu, setMobileMenu } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 z-[9999] h-screen w-[248px] -translate-x-full border-r border-r-stone-700 transition duration-300 ease-in xl:w-[calc(100%-450px)]",
          !mobileMenu && "transparent pointer-events-none",
          mobileMenu && "bg-bg-1 translate-x-0 backdrop-blur",
        )}
      >
        <div className="px-4 py-4">
          <div className="flex items-center">
            <div className="flex flex-1 items-center justify-center gap-x-3">
              <Image
                src="/logos/logo.png"
                alt=""
                width={1250}
                height={500}
                className="h-min w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="sidebar-menu h-[calc(100%-80px)] overflow-y-scroll">
          <div className="flex flex-col gap-4 p-4">
            <button className="border-light text-light flex h-10 items-center gap-2 rounded-3xl border px-4 font-semibold">
              <Image
                src="/icons/play-store.png"
                alt=""
                width={100}
                height={100}
                className="h-6 w-max object-contain"
              />
              Baixar Play Store
            </button>
            <button className="border-primary bg-primary text-light flex h-10 items-center gap-2 rounded-3xl border px-4 font-semibold">
              <Image
                src="/icons/apple.png"
                alt=""
                width={100}
                height={100}
                className="h-6 w-max object-contain"
              />
              Baixar App Store
            </button>
          </div>
        </div>
      </div>
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="overlay fixed inset-0 z-[999] bg-black/60 opacity-100 backdrop-blur-sm backdrop-filter"
        />
      )}
    </>
  );
}

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  return (
    <div className="from-bg-1 to-bg-2 relative flex w-full flex-col overflow-x-hidden bg-gradient-to-b py-20">
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col items-center justify-between px-4 xl:flex-row 2xl:px-0">
        <Image
          src="/logos/logo.png"
          alt=""
          width={1000}
          height={250}
          className="h-20 w-max object-contain"
        />
        <div className="flex flex-col">
          <Image
            src="/logos/ex.png"
            alt=""
            width={1000}
            height={250}
            className="h-20 w-max object-contain"
          />
          <div className="flex items-center justify-between">
            <span
              onClick={() => router.push("/terms")}
              className="cursor-pointer text-xs font-light text-stone-300 hover:text-stone-100"
            >
              Termos de uso
            </span>
            <span
              onClick={() => router.push("/privacy")}
              className="cursor-pointer text-xs font-light text-stone-300 hover:text-stone-100"
            >
              Política de Privacidade
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

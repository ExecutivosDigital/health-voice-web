"use client";
import { useSession } from "@/context/auth";
import { useGeneralContext } from "@/context/GeneralContext";
import { useSidebar } from "@/store";
import { cn } from "@/utils/cn";
import { Bell, Calendar, ChevronLeft, Menu, User } from "lucide-react";
import moment from "moment";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./blocks/dropdown-menu";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export function Header() {
  const { selectedClient, selectedRecording } = useGeneralContext();
  const { mobileMenu, setMobileMenu } = useSidebar();
  const { clearSession } = useSession();
  const pathname = usePathname();
  const cookies = useCookies();
  const router = useRouter();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    if (pathname.includes("/clients")) {
      const pathSegments = pathname.split("/").filter(Boolean);

      breadcrumbs.push({
        label: "Pacientes",
        href: "/clients",
        isActive: pathname === "/clients",
      });

      if (pathSegments.length >= 2 && pathSegments[1]) {
        const clientId = pathSegments[1];

        breadcrumbs.push({
          label: selectedClient?.name || "Carregando...",
          href: `/clients/${clientId}`,
          isActive: pathname === `/clients/${clientId}`,
        });

        if (pathSegments.length >= 3 && pathSegments[2]) {
          const recordingId = pathSegments[2];

          breadcrumbs.push({
            label: selectedRecording?.name || "Consulta",
            href: `/clients/${clientId}/${recordingId}`,
            isActive: true,
          });
        }
      }
    } else if (pathname.includes("/reminders")) {
      breadcrumbs.push({
        label: "Lembretes",
        href: "/reminders",
        isActive: true,
      });
    } else if (pathname.includes("/studies")) {
      breadcrumbs.push({
        label: "Estudos",
        href: "/studies",
        isActive: true,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = useMemo(
    () => generateBreadcrumbs(),
    [pathname, selectedClient?.name, selectedRecording?.name],
  );

  const BreadcrumbItem = ({
    item,
    isLast,
  }: {
    item: BreadcrumbItem;
    isLast: boolean;
  }) => (
    <>
      {item.href && !item.isActive ? (
        <span
          className="cursor-pointer transition-colors hover:text-white"
          onClick={() => router.push(item.href!)}
        >
          {item.label}
        </span>
      ) : (
        <span className={item.isActive ? "text-white" : ""}>{item.label}</span>
      )}
      {!isLast && <span className="mx-1">{">"}</span>}
    </>
  );

  return (
    <header className="bg-primary flex w-full flex-col gap-4 px-4 pb-20 text-white">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between py-2">
        <Image
          src="/logos/logo.png"
          alt=""
          quality={100}
          width={1250}
          height={500}
          className="h-16 w-max cursor-pointer object-contain"
          onClick={() => router.push("/")}
        />

        <div className="flex h-max items-center gap-2">
          <div className="hidden items-center gap-2 xl:flex">
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20">
              <Bell className="h-4" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20">
                  <User className="h-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none bg-white text-black">
                <DropdownMenuItem
                  onSelect={() => {
                    cookies.remove(
                      process.env.NEXT_PUBLIC_USER_TOKEN as string,
                    );
                    clearSession();
                    router.push("/login");
                  }}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="hover:bg-primary-100 hover:text-primary relative h-6 w-6 xl:hidden"
          >
            <Menu />
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
        <div className="flex items-center gap-2 text-xl">
          <span>Bem vindo,</span>
          <span className="font-semibold">Dr. Matheus</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-white/50">
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem
              key={`${breadcrumb.label}-${index}`}
              item={breadcrumb}
              isLast={index === breadcrumbs.length - 1}
            />
          ))}
        </div>

        <div className="flex w-full items-center justify-between overflow-x-scroll pb-4 md:overflow-x-hidden">
          {pathname.split("/").filter(Boolean).length >= 3 ? (
            <div className="flex h-8 w-full flex-col items-center gap-4 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push("/clients")}
                  className="hidden h-8 w-max cursor-pointer items-center gap-2 rounded-md border border-white/10 px-4 text-white/50 transition hover:border-white/50 hover:text-white md:flex"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="font-semibold">Voltar</span>
                </button>
                <div className="flex h-8 items-center">
                  <span
                    className={cn(
                      "h-full w-max cursor-pointer border-b px-4 transition duration-150 hover:border-b-white hover:text-white",
                      !pathname.includes("/chat") &&
                        !pathname.includes("/transcription")
                        ? "border-b-white"
                        : "border-b-white/10 text-white/50",
                    )}
                    onClick={() =>
                      router.push(
                        `/clients/${selectedClient?.id}/${selectedRecording?.id}`,
                      )
                    }
                  >
                    Visão Geral
                  </span>
                  <span
                    className={cn(
                      "h-full w-max cursor-pointer border-b px-4 transition duration-150 hover:border-b-white hover:text-white",
                      pathname.includes("/chat")
                        ? "border-b-white"
                        : "border-b-white/10 text-white/50",
                    )}
                    onClick={() =>
                      router.push(
                        `/clients/${selectedClient?.id}/${selectedRecording?.id}/chat`,
                      )
                    }
                  >
                    Conversar
                  </span>
                  <span
                    className={cn(
                      "h-full w-max cursor-pointer border-b px-4 transition duration-150 hover:border-b-white hover:text-white",
                      pathname.includes("/transcription")
                        ? "border-b-white"
                        : "border-b-white/10 text-white/50",
                    )}
                    onClick={() =>
                      router.push(
                        `/clients/${selectedClient?.id}/${selectedRecording?.id}/transcription`,
                      )
                    }
                  >
                    Transcrição
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/user.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="h-4 w-max fill-white object-contain text-white"
                  />
                  <span>{selectedClient?.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/calendar.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="h-4 w-max fill-white object-contain text-white"
                  />
                  <span>
                    {moment(selectedRecording?.createdAt).format(
                      "DD/MM/YYYY - HH:mm",
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/clock.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="h-4 w-max fill-white object-contain text-white"
                  />
                  <span>{selectedRecording?.duration}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex h-8 items-center gap-4">
                <span
                  className={cn(
                    "h-full w-max cursor-pointer border-b px-4 transition duration-150 hover:border-b-white hover:text-white",
                    pathname === "/"
                      ? "border-b-white"
                      : "border-b-white/10 text-white/50",
                  )}
                  onClick={() => router.push("/")}
                >
                  Visão Geral
                </span>
                <span
                  className={cn(
                    "h-full cursor-pointer border-b px-4 transition duration-150 hover:border-b-white hover:text-white",
                    pathname === "/reminders"
                      ? "border-b-white"
                      : "border-b-white/10 text-white/50",
                  )}
                  onClick={() => router.push("/reminders")}
                >
                  Lembretes
                </span>
                <span
                  className={cn(
                    "h-full cursor-pointer border-b px-4 transition duration-150 hover:border-b-white hover:text-white",
                    pathname.startsWith("/clients")
                      ? "border-b-white"
                      : "border-b-white/10 text-white/50",
                  )}
                  onClick={() => router.push("/clients")}
                >
                  Pacientes
                </span>
                <span
                  className={cn(
                    "h-full cursor-pointer border-b px-4 transition duration-150 hover:border-b-white hover:text-white",
                    pathname === "/studies"
                      ? "border-b-white"
                      : "border-b-white/10 text-white/50",
                  )}
                  onClick={() => router.push("/studies")}
                >
                  Estudos
                </span>
              </div>
              <button className="flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-2 transition hover:bg-white/20">
                <Calendar className="h-4" />
                <span>Outubro</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

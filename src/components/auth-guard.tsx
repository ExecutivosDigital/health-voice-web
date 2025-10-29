// components/AuthGuard.tsx
"use client";

import { useSession } from "@/context/auth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // Opcional: loading customizado
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { profile, loading, checkSession } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false); // ← Evita múltiplos redirecionamentos

  useEffect(() => {
    const validateSession = async () => {
      // ✅ Aguarda loading inicial
      if (loading) return;

      // ✅ Evita redirecionar múltiplas vezes
      if (hasRedirected.current) return;

      // ✅ Verifica sessão
      const isValid = await checkSession();

      if (!isValid || !profile) {
        // ✅ Pequeno delay para dar tempo do login finalizar
        await new Promise((resolve) => setTimeout(resolve, 100));

        // ✅ Revalida após o delay
        const recheckValid = await checkSession();

        if (!recheckValid) {
          hasRedirected.current = true;
          router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
        }
      }
    };

    validateSession();
  }, [profile, loading, checkSession, router, pathname]);

  if (loading) {
    return (
      fallback || (
        <div className="flex h-screen w-full items-center justify-center gap-2 bg-white">
          <Image
            src="/logos/icon.png"
            alt=""
            width={500}
            height={500}
            className="h-max w-16 object-contain"
          />
          <div className="text-center">
            <div className="loader mb-4" /> {/* Seu spinner */}
            <p>Carregando...</p>
          </div>
        </div>
      )
    );
  }

  // Se não tem perfil, mostra loading (vai redirecionar)
  if (!profile) {
    return fallback || null;
  }

  // Usuário autenticado, mostra conteúdo
  return <>{children}</>;
}

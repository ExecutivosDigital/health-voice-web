"use client";
import { MessageCircle } from "lucide-react";

export function EmptyMessage() {
  // const { selectedModel } = useModelContext();

  return (
    <div className="flex h-full flex-1 items-center justify-center gap-2">
      <MessageCircle className="text-primary text-7xl" />
      <div className="mt-1 text-sm font-medium">
        Inicie uma conversa para testar a IA
        {/* {selectedModel
          ? "Inicie uma conversa para testar a IA"
          : "Selecione uma Modelo para iniciar os testes"} */}
      </div>
    </div>
  );
}

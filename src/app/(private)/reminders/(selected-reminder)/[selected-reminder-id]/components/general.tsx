"use client";

import { useGeneralContext } from "@/context/GeneralContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function General() {
  const { selectedReminder } = useGeneralContext();

  return (
    <div className="prose prose-sm prose-h1:text-center prose-h1:text-primary prose-h2:text-primary w-full max-w-none">
      {selectedReminder?.recording.transcription ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {selectedReminder?.recording.transcription}
        </ReactMarkdown>
      ) : (
        <h1 className="text-primary m-auto w-full text-center md:w-max">
          Transcrição não disponível
        </h1>
      )}
    </div>
  );
}

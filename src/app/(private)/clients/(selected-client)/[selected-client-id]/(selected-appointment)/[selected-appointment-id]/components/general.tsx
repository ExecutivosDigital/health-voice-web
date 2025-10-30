"use client";

import { useGeneralContext } from "@/context/GeneralContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function General() {
  const { selectedRecording } = useGeneralContext();

  return (
    <div className="prose prose-sm w-full max-w-none">
      {selectedRecording?.transcription ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {selectedRecording?.transcription}
        </ReactMarkdown>
      ) : (
        <h1 className="m-auto w-full text-center md:w-max">
          Transcrição não disponível
        </h1>
      )}
    </div>
  );
}

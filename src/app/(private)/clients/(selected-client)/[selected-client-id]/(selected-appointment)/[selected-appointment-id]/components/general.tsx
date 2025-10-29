"use client";

import { useGeneralContext } from "@/context/GeneralContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function General() {
  const { selectedRecording } = useGeneralContext();

  return (
    <div className="prose max-w-none">
      {selectedRecording?.transcription ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {selectedRecording?.transcription}
        </ReactMarkdown>
      ) : (
        <h1 className="m-auto w-max text-center">Transcrição não disponível</h1>
      )}
    </div>
  );
}

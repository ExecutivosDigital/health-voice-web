"use client";

import { RequestTranscription } from "@/components/ui/request-transcription";
import { useGeneralContext } from "@/context/GeneralContext";
import { cn } from "@/utils/cn";
import { buildRowsFromSpeeches } from "@/utils/speeches";
import { useMemo } from "react";

export function Transcription() {
  const { selectedRecording } = useGeneralContext();

  const rows = useMemo(
    () =>
      buildRowsFromSpeeches(
        selectedRecording?.speeches,
        selectedRecording?.speakers,
      ),
    [selectedRecording?.speeches],
  );

  return (
    <div className="flex w-full flex-col gap-2">
      {selectedRecording?.speeches.length !== 0 ? (
        rows.map((speech) => (
          <div
            key={speech.id}
            className="flex w-full items-center justify-between gap-2 border-b border-b-gray-300 px-4 py-2"
          >
            <div className="flex gap-2">
              <span className="text-sm text-gray-300">{speech.t}</span>
              <span className="prose prose-sm max-w-none">{speech.text}</span>
            </div>
            <span
              className={cn(
                "flex h-8 w-max min-w-40 items-center justify-center rounded-md border px-2 py-1 text-sm font-semibold",
                speech.index === 0
                  ? "bg-primary border-primary text-white"
                  : "text-primary border-neutral-200 bg-white",
              )}
            >
              {speech.name}
            </span>
          </div>
        ))
      ) : (
        <>
          <h1 className="text-primary m-auto w-full text-center text-3xl font-extrabold md:w-max">
            Transcrição não disponível
          </h1>
          <div className="prose prose-sm prose-h1:text-center prose-h1:text-primary prose-h2:text-primary w-full max-w-none">
            <RequestTranscription />
          </div>
        </>
      )}
    </div>
  );
}

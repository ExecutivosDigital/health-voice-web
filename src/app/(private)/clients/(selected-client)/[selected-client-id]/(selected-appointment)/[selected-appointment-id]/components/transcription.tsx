"use client";

import { useGeneralContext } from "@/context/GeneralContext";

export function Transcription() {
  const { selectedRecording } = useGeneralContext();

  return (
    <div className="flex w-full flex-col gap-2">
      {selectedRecording?.speeches.length !== 0 ? (
        selectedRecording?.speeches.map((speech, index) => (
          <div
            key={speech.transcription + index}
            className="flex w-full items-center justify-between gap-2 border-b border-b-gray-300 px-4 py-2"
          >
            <div className="flex gap-2">
              <span className="text-sm text-gray-300">
                {speech.startTime.toFixed(2)}
              </span>
              <span className="prose prose-sm max-w-none">
                {speech.transcription}
              </span>
            </div>
            <span className="h-10 min-w-40">
              {
                selectedRecording.speakers.find(
                  (s) => s.id === speech.speakerId,
                )?.name
              }
            </span>
          </div>
        ))
      ) : (
        <h1 className="m-auto w-full text-center text-3xl font-extrabold md:w-max">
          Transcrição não disponível
        </h1>
      )}
    </div>
  );
}

"use client";

export function General() {
  // const { selectedReminder } = useGeneralContext();

  return (
    <div className="prose prose-sm w-full max-w-none">
      {/* {selectedReminder?.transcription ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {selectedReminder?.transcription}
        </ReactMarkdown>
      ) : ( */}
      <h1 className="m-auto w-full text-center md:w-max">
        Transcrição não disponível
      </h1>
      {/* )} */}
    </div>
  );
}

"use client";

export function General() {
  // const { selectedReminder } = useGeneralContext();

  return (
    <div className="prose prose-sm prose-h1:text-center prose-h1:text-primary prose-h2:text-primary w-full max-w-none">
      {/* {selectedRecording?.transcription ? (
           <ReactMarkdown remarkPlugins={[remarkGfm]}>
             {selectedRecording?.transcription}
           </ReactMarkdown>
         ) : ( */}
      <h1 className="m-auto w-full text-center md:w-max">
        Transcrição não disponível
      </h1>
      {/* )} */}
    </div>
  );
}

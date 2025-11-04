"use client";

import { useApiContext } from "@/context/ApiContext";
import { cn } from "@/utils/cn";
import { Play } from "lucide-react";
import { useState } from "react";
import { AudioVisualizer } from "./audio-visualizer";
import { useAudioRecorder } from "./use-audio-recorder";

export type RecordingType = "CLIENT" | "REMINDER" | "STUDY" | "OTHER";

interface AudioRecorderProps {
  type?: RecordingType;
  title?: string;
  userName?: string;
  userId?: string;
  onSave?: (data: SaveRecordingData) => Promise<void>;
}

interface SaveRecordingData {
  name: string;
  description: string;
  duration: string;
  seconds: number;
  audioUrl: string;
  type: RecordingType;
  clientId?: string;
}

export function AudioRecorder({
  type = "CLIENT",
  title = "",
  userName = "",
  userId = "",
  onSave,
}: AudioRecorderProps) {
  const { PostAPI } = useApiContext();
  const {
    isRecording,
    isPaused,
    duration,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
    getVisualizerData,
  } = useAudioRecorder();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const derivedTitle = (() => {
    const labelByType: Record<RecordingType, string> = {
      CLIENT: "Gravação do Paciente",
      REMINDER: "Lembrete",
      STUDY: "Estudo",
      OTHER: "Gravação",
    };
    const base = title || labelByType[type];
    if (userName) return `${base} ${userName}`;
    return base;
  })();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  const handleToggleRecording = async () => {
    console.log("entrou");
    try {
      if (isRecording || isPaused || duration > 0) {
        stopRecording();
        setShowSaveDialog(true);
      } else {
        await startRecording();
      }
    } catch (error) {
      console.error("Erro ao alternar gravação:", error);
      alert("Erro ao acessar o microfone. Verifique as permissões.");
    }
  };

  async function handleUploadAudio(): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const f = new File([audioBlob as any], "audio.mp3", { type: "audio/mpeg" });
    const formData = new FormData();
    formData.append("file", f);
    const response = await PostAPI("/convert", formData, false);
    console.log("response", response);
    if (!response || response.status >= 400)
      throw new Error("Falha no upload de áudio.");
    const url = response?.body?.url || response?.body?.audioUrl;
    if (!url) throw new Error("Upload não retornou URL do áudio.");
    return url;
  }

  const handleSaveRecording = async (payload: {
    name: string;
    description: string;
    clientId?: string;
  }) => {
    setIsSubmitting(true);

    try {
      const uploadedUrl = await handleUploadAudio();

      const recordingData: SaveRecordingData = {
        name: payload.name?.trim() || "Anotações da sessão",
        description: payload.description?.trim() || "Resumo em áudio.",
        duration: formatDuration(duration),
        seconds: duration,
        audioUrl: uploadedUrl,
        type,
        ...(payload.clientId ? { clientId: payload.clientId } : {}),
      };

      console.log("recordingData", recordingData);

      if (onSave) {
        await onSave(recordingData);
      } else {
        const response = await PostAPI("/recording", recordingData, true);
        console.log("response 2", response);
        if (response.status !== 200) {
          throw new Error("Não foi possível salvar o registro.");
        }
      }

      alert("Gravação salva com sucesso!");
      setShowSaveDialog(false);
      resetRecording();
    } catch (error) {
      console.error("Erro ao salvar gravação:", error);
      alert("Erro ao salvar a gravação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "fixed right-2 bottom-2 z-50 flex h-16 w-16 min-w-16 items-center justify-center",
        isRecording && "transition-height duration-500 ease-in-out",
      )}
    >
      <button
        onClick={handleToggleRecording}
        disabled={showSaveDialog}
        className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 font-bold ${
          showSaveDialog
            ? "cursor-not-allowed border-gray-300 bg-gray-200"
            : "border-primary/20 bg-primary/10 hover:bg-primary/20"
        } `}
      >
        <div className="absolute left-0">
          <AudioVisualizer
            isRecording={isRecording && !isPaused}
            getVisualizerData={getVisualizerData}
          />
        </div>
        {isRecording || isPaused || duration > 0 ? (
          formatTime(duration)
        ) : (
          <Play />
        )}
      </button>

      {showSaveDialog && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-end justify-center bg-black/20">
          <div className="w-full max-w-lg rounded-t-2xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Salvar Gravação</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSaveRecording({
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                  clientId: userId || undefined,
                });
              }}
            >
              <input
                name="name"
                type="text"
                placeholder="Nome da gravação"
                defaultValue={derivedTitle}
                className="mb-3 w-full rounded-lg border p-3"
                required
              />

              <textarea
                name="description"
                placeholder="Descrição (opcional)"
                className="mb-4 h-24 w-full rounded-lg border p-3"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSaveDialog(false);
                    resetRecording();
                  }}
                  className="flex-1 rounded-lg bg-gray-200 py-3 font-semibold"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

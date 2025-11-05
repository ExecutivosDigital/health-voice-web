"use client";

import { useApiContext } from "@/context/ApiContext";
import { useGeneralContext } from "@/context/GeneralContext";
import { cn } from "@/utils/cn";
import { ChevronDown, Play } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/blocks/dropdown-menu";
import { AudioVisualizer } from "./audio-visualizer";
import { useAudioRecorder } from "./use-audio-recorder";

export type RecordingType = "CLIENT" | "REMINDER" | "STUDY" | "OTHER";

interface AudioRecorderProps {
  title?: string;
  userName?: string;
  userId?: string;
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
  title = "",
  userName = "",
  userId = "",
}: AudioRecorderProps) {
  const { PostAPI } = useApiContext();
  const { GetClients, GetRecordings, GetReminders, clients } =
    useGeneralContext();
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
  const [payload, setPayload] = useState<SaveRecordingData>({
    name: "",
    description: "",
    duration: "",
    seconds: 0,
    audioUrl: "",
    type: "CLIENT",
    clientId: userId,
  });

  const derivedTitle = (() => {
    const labelByType: Record<RecordingType, string> = {
      CLIENT: "Gravação do Paciente",
      REMINDER: "Lembrete",
      STUDY: "Estudo",
      OTHER: "Gravação",
    };
    const base = title || labelByType[payload.type];
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
    if (!response || response.status >= 400)
      throw new Error("Falha no upload de áudio.");
    const url = response?.body?.url || response?.body?.audioUrl;
    if (!url) throw new Error("Upload não retornou URL do áudio.");
    return url;
  }

  const handleSaveRecording = async () => {
    if (payload.type === "CLIENT") {
      if (!payload.clientId) {
        toast.error("Selecione um paciente.");
        return;
      }
    }
    setIsSubmitting(true);

    const uploadedUrl = await handleUploadAudio();

    const recordingData: SaveRecordingData = {
      name: payload.name?.trim() || "Anotações da sessão",
      description: payload.description?.trim() || "Resumo em áudio.",
      duration: formatDuration(duration),
      seconds: duration,
      audioUrl: uploadedUrl,
      type: payload.type,
      ...(payload.clientId ? { clientId: payload.clientId } : {}),
    };

    const response = await PostAPI("/recording", recordingData, true);
    if (response.status === 200) {
      GetClients();
      GetRecordings();
      GetReminders();
      toast.success("Gravação salva com sucesso!");
      setShowSaveDialog(false);
      resetRecording();
      return setIsSubmitting(false);
    }
    toast.error("Erro ao salvar a gravação. Tente novamente.");
    return setIsSubmitting(false);
  };

  return (
    <div
      className={cn(
        "fixed right-2 bottom-2 z-50 flex h-16 w-16 min-w-16 items-center justify-center",
        isRecording && "transition-height h-20 w-20 duration-500 ease-in-out",
      )}
    >
      <button
        onClick={handleToggleRecording}
        disabled={showSaveDialog}
        className={`text-primary relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 font-bold transition ${
          showSaveDialog
            ? "cursor-not-allowed border-gray-300 bg-gray-200"
            : "border-[#B4D2F2] bg-[#DDE8F4] hover:bg-[#B4D2F2]"
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
        <div
          onClick={() => {
            setShowSaveDialog(false);
            resetRecording();
          }}
          className="bg-opacity-50 fixed inset-0 z-50 flex items-end justify-center bg-black/20"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="w-full max-w-lg rounded-t-2xl bg-white p-6"
          >
            <h2 className="mb-4 text-xl font-bold">Salvar Gravação</h2>

            <form
              onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSaveRecording();
              }}
            >
              <div className="flex flex-col">
                <label className="text-neutral-600">Nome da Gravação</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Nome da gravação"
                  defaultValue={derivedTitle}
                  className="mb-3 w-full rounded-lg border p-3"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-neutral-600">Tipo de Gravação</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="mb-3 flex w-full cursor-pointer items-center gap-2 rounded-lg border p-3">
                      <input
                        name="type"
                        type="text"
                        placeholder="Tipo"
                        value={
                          payload.type === "CLIENT"
                            ? "Paciente"
                            : payload.type === "REMINDER"
                              ? "Lembrete"
                              : payload.type === "STUDY"
                                ? "Estudo"
                                : payload.type === "OTHER"
                                  ? "Outro"
                                  : ""
                        }
                        className="w-full cursor-pointer"
                        required
                        readOnly
                      />
                      <ChevronDown className="w-5 min-w-5" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-[9999]">
                    <DropdownMenuItem
                      className={cn(
                        "hover:bg-neutral-200",
                        payload.type === "CLIENT" && "bg-neutral-200",
                      )}
                      onClick={() => setPayload({ ...payload, type: "CLIENT" })}
                    >
                      Paciente
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={cn(
                        "hover:bg-neutral-200",
                        payload.type === "REMINDER" && "bg-neutral-200",
                      )}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          type: "REMINDER",
                          clientId: "",
                        })
                      }
                    >
                      Lembrete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={cn(
                        "hover:bg-neutral-200",
                        payload.type === "STUDY" && "bg-neutral-200",
                      )}
                      onClick={() =>
                        setPayload({ ...payload, type: "STUDY", clientId: "" })
                      }
                    >
                      Estudo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={cn(
                        "hover:bg-neutral-200",
                        payload.type === "OTHER" && "bg-neutral-200",
                      )}
                      onClick={() =>
                        setPayload({ ...payload, type: "OTHER", clientId: "" })
                      }
                    >
                      Outro
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div
                className={cn(
                  "flex flex-col",
                  payload.type !== "CLIENT" && "hidden",
                )}
              >
                <label className="text-neutral-600">Paciente</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="mb-3 flex w-full cursor-pointer items-center gap-2 rounded-lg border p-3">
                      <input
                        name="clientId"
                        type="text"
                        placeholder="Paciente"
                        value={
                          payload.clientId
                            ? clients.find((c) => c.id === payload.clientId)
                                ?.name
                            : "Selecione um Paciente"
                        }
                        className="w-full cursor-pointer"
                        required
                        readOnly
                      />
                      <ChevronDown className="w-5 min-w-5" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-[9999] h-80 overflow-y-scroll">
                    {clients.map((c) => (
                      <DropdownMenuItem
                        key={c.id}
                        className={cn(
                          "hover:bg-neutral-200",
                          payload.clientId === c.id && "bg-neutral-200",
                        )}
                        onClick={() =>
                          setPayload({ ...payload, clientId: c.id })
                        }
                      >
                        {c.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-col">
                <label className="text-neutral-600">Descrição</label>
                <textarea
                  name="description"
                  placeholder="Descrição (opcional)"
                  className="mb-4 h-24 w-full rounded-lg border p-3"
                />
              </div>

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
                  onClick={handleSaveRecording}
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

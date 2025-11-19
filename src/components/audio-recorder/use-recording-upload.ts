import { useApiContext } from "@/context/ApiContext";
import { useCallback } from "react";

export function useRecordingUpload() {
  const { PostAPI } = useApiContext();

  const uploadMedia = useCallback(
    async (blob: Blob, mediaType: "audio" | "video"): Promise<string> => {
      try {
        const extension = mediaType === "audio" ? "mp3" : "webm";
        const mimeType = mediaType === "audio" ? "audio/mpeg" : "video/webm";

        const file = new File([blob], `${mediaType}.${extension}`, {
          type: mimeType,
        });
        const formData = new FormData();
        formData.append("file", file);

        const response = await PostAPI("/convert", formData, false);

        if (!response || response.status >= 400) {
          throw new Error(`Falha no upload de ${mediaType}.`);
        }

        const url = response?.body?.url || response?.body?.[`${mediaType}Url`];

        if (!url) {
          throw new Error(`Upload não retornou URL do ${mediaType}.`);
        }

        return url;
      } catch (error) {
        console.error(`Erro no upload de ${mediaType}:`, error);
        throw error;
      }
    },
    [PostAPI],
  );

  const formatDurationForAPI = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  }, []);

  return {
    uploadMedia,
    formatDurationForAPI,
  };
}

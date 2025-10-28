// src/app/(dashboard)/(apps)/chat/AudioPlayer/index.tsx
import { cn } from "@/utils/cn";
import "./styles/audio.css";

export function AudioPlayer({
  audioUrl,
  className,
  size,
  isAI,
}: {
  audioUrl: string;
  className?: string;
  size?: "sm" | "lg" | "default";
  isAI?: boolean;
}) {
  const sizeClass =
    size === "sm" ? "audio-sm-scale" : size === "lg" ? "audio-lg-scale" : "";

  const aiClass = isAI ? "ai" : "";

  return (
    <div className={cn(className)}>
      <audio
        className={cn("w-full", aiClass, sizeClass)}
        src={audioUrl}
        controls
      />
    </div>
  );
}

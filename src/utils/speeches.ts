import { RecordingSpeakerSpeechProps } from "@/@types/general-client";

export type TranscriptRow = {
  id: string;
  t: string;
  text: string;
  name: string;
  index: number;
  speakerId: string;
};

export function formatTimeSecondsToMMSS(secNumber: number) {
  const total = Math.max(0, Math.floor(secNumber));
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function buildRowsFromSpeeches(
  speeches?: RecordingSpeakerSpeechProps[],
  speakers?: { name: string; id: string }[],
): TranscriptRow[] {
  if (!speeches?.length || !speakers?.length) return [];

  return speeches
    .slice()
    .sort((a, b) => a.startTime - b.startTime)
    .map((s, i) => ({
      id: `${i + 1}`,
      t: formatTimeSecondsToMMSS(s.startTime),
      text: s.transcription,
      name: speakers.find((speaker) => speaker.id === s.speakerId)?.name ?? "",
      index: speakers.findIndex((speaker) => speaker.id === s.speakerId),
      speakerId: s.speakerId,
    }));
}

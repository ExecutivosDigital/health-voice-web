"use client";
import { AudioPlayer } from "@/components/chatPopup/AudioPlayer";
import { useSectionChat } from "@/components/chatPopup/chat-handler";
import { useGeneralContext } from "@/context/GeneralContext";
import { generalPrompt } from "@/utils/prompts";
import {
  ArrowDown,
  MessageCircle,
  Mic,
  Send,
  SendHorizonal,
  Square,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Messages } from "./messages";

export type GalleryItem = {
  src: string;
  alt?: string;
  badge?: string;
  locked?: boolean;
  poster?: string;
  mediaType?: "image" | "video";
  placeholder?: boolean;
};

export default function ChatPage() {
  const { selectedReminder } = useGeneralContext();
  const containerRef = useRef(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [selectedPrompt] = useState(generalPrompt);

  const {
    messages,
    setMessages,
    inputMessage,
    handleSendMessage,
    setInputMessage,
    isRecording,
    elapsedTime,
    startRecording,
    stopRecording,
    file,
    setFile,
  } = useSectionChat({ selectedPrompt });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleScrollToBottom = () => {
    setIsAutoScrollEnabled(true);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    if (messages.length > 0 && isAutoScrollEnabled) {
      handleScrollToBottom();
    }
  }, [messages, isAutoScrollEnabled]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chatElement: any = containerRef.current;
    const handleScroll = () => {
      const scrollTop = chatElement.scrollTop;
      const scrollHeight = chatElement.scrollHeight;
      const clientHeight = chatElement.clientHeight;

      if (scrollTop < lastScrollTop.current) {
        setIsAutoScrollEnabled(false);
      } else if (Math.abs(scrollTop + clientHeight - scrollHeight) <= 10) {
        setIsAutoScrollEnabled(true);
      }

      lastScrollTop.current = scrollTop;
    };

    if (chatElement) {
      chatElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatElement) {
        chatElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef.current]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chatElement: any = containerRef.current;
    if (chatElement) {
      lastScrollTop.current = chatElement.scrollTop;
    }
  }, []);

  useEffect(() => {
    setIsAutoScrollEnabled(true);
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      if (selectedReminder && selectedReminder?.recording.transcription) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: selectedReminder.recording.transcription as string,
          },
        ]);
      }
    }
  }, [messages, selectedReminder]);

  return (
    <div className="flex h-full flex-1 flex-col gap-2 rounded-md">
      <header className="sticky top-0 z-20 flex w-full flex-col justify-between backdrop-blur-sm xl:flex-row xl:items-center">
        <span className="text-primary w-full text-center text-3xl font-extrabold">
          Converse com a Inteligência Artificial
        </span>
      </header>
      <div
        data-lenis-prevent
        className="custom-scrollbar z-20 flex h-[60vh] max-h-[60vh] w-full flex-1 flex-col overflow-y-scroll rounded-md bg-gray-100 py-4 lg:py-2 xl:py-4"
        ref={containerRef}
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-1 items-center justify-center gap-2">
            <MessageCircle className="text-primary text-7xl" />
            <div className="mt-1 text-sm font-medium">
              Inicie uma conversa para testar a IA
            </div>
          </div>
        ) : (
          messages.map((message, i) => (
            <Messages
              key={`message-list-${i}-${message.content}`}
              message={message}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
      {!isAutoScrollEnabled && messages.length !== 0 && (
        <button
          onClick={handleScrollToBottom}
          className="bg-primary absolute bottom-24 left-1/2 z-[100] -translate-x-1/2 rounded-full p-1 text-white"
        >
          <ArrowDown />
        </button>
      )}
      <div className="relative flex items-center">
        <div className="flex-1">
          {file ? (
            <div className="flex items-center justify-center gap-2 py-2">
              <button
                onClick={() => setFile(null)}
                className="flex h-12 w-12 items-center justify-center rounded-xl text-sm text-red-500 hover:text-red-700"
              >
                <X className="h-6 w-6" />
              </button>
              <AudioPlayer
                audioUrl={URL.createObjectURL(file)}
                className="h-full w-full"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary-dark flex h-12 w-12 items-center justify-center rounded-xl px-2 py-2 text-sm text-white"
              >
                <SendHorizonal />
              </button>
            </div>
          ) : isRecording ? (
            <span className="text-primary px-2 font-mono text-sm">
              Gravando áudio... {elapsedTime}
            </span>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="focus:ring-primary h-12 w-full rounded-xl border border-gray-300 px-3 py-2 text-[16px] focus:ring-2 focus:outline-none"
              placeholder="Digite sua mensagem..."
              disabled={isRecording}
            />
          )}
        </div>

        {!file && (
          <button
            onClick={() => {
              if (isRecording) {
                stopRecording();
              } else if (inputMessage.trim()) {
                handleSendMessage();
              } else {
                startRecording();
              }
            }}
            className="bg-primary hover:bg-primary-dark ml-2 flex h-12 w-12 items-center justify-center rounded-xl p-2 text-white"
          >
            {isRecording ? (
              <Square className="h-5 w-5 animate-pulse" />
            ) : inputMessage.trim() ? (
              <Send className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

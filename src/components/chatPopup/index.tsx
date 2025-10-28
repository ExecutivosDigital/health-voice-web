"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/utils/cn";
import { generalPrompt, screenPrompts } from "@/utils/prompts";
import { AnimatePresence, motion } from "framer-motion";
import {
  Maximize2,
  MessageCircle,
  Mic,
  Minimize2,
  Send,
  SendHorizonal,
  Square,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { useSectionChat } from "./chat-handler";
import { TypingDots } from "./typingDots";

export default function ChatWidget() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(generalPrompt);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const {
    messages,
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

  useEffect(() => {
    const prompt = screenPrompts.find((p) => p.screen === pathName);
    if (prompt) {
      setSelectedPrompt(prompt);
    } else {
      setSelectedPrompt(generalPrompt);
    }
  }, [pathName]);

  // Auto foco ao abrir
  // useEffect(() => {
  //   if (isOpen && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isOpen]);

  // Auto scroll ao final
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end space-y-2">
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-stone-900 shadow-xl"
            style={{
              width: isExpanded ? 500 : 320,
              height: isExpanded ? 600 : 484,
            }}
          >
            {/* Cabeçalho */}
            <div className="bg-primary flex items-center justify-between px-4 py-2 text-white">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Suporte</h2>
                <button
                  onClick={toggleExpand}
                  title="Expandir"
                  className="hidden md:block"
                >
                  {isExpanded ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
              </div>
              <button onClick={toggleChat}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mensagens */}
            <div
              ref={chatBodyRef}
              className="flex-1 space-y-2 overflow-y-auto bg-stone-900 p-3"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm break-words",
                      msg.role === "user"
                        ? "bg-primary ml-auto self-end text-white"
                        : "mr-auto self-start bg-gray-200 text-gray-800",
                      msg.type?.startsWith("audio") && "bg-primary",
                    )}
                    style={{
                      maxWidth: "80%",
                      wordBreak: "break-word",
                      width: "fit-content",
                    }}
                  >
                    {msg.content === "..." ? (
                      <TypingDots />
                    ) : msg.type?.startsWith("audio") && msg.file ? (
                      <AudioPlayer
                        audioUrl={msg.file}
                        className="min-h-[40px] w-48 px-2 py-1"
                      />
                    ) : msg.role === "user" ? (
                      msg.content
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Campo de entrada */}
            {/* Campo de entrada */}
            <div className="relative flex items-center border-t border-gray-200 p-2">
              <div className="flex-1">
                {file ? (
                  <div className="flex items-center justify-center gap-2 py-2">
                    <button
                      onClick={() => setFile(null)}
                      className="flex rounded text-sm text-red-500 hover:text-red-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                    <AudioPlayer
                      audioUrl={URL.createObjectURL(file)}
                      className="h-full w-full"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary-dark rounded px-2 py-2 text-sm text-white"
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
                    className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-[16px] focus:ring-2 focus:outline-none"
                    placeholder="Digite sua mensagem..."
                    disabled={isRecording}
                  />
                )}
              </div>

              {/* Botão de ação unificado */}
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
                  className="bg-primary hover:bg-primary-dark ml-2 rounded-lg p-2 text-white"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão flutuante - sempre no canto direito */}
      <motion.button
        onClick={toggleChat}
        initial={false}
        animate={
          !isOpen
            ? {
                scale: [1, 1.3, 1],
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }
            : {}
        }
        className="bg-primary hover:bg-primary-dark rounded-full p-2 text-white shadow-lg focus:outline-none xl:p-4"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}

"use client";

import { MessageProps } from "@/app/(private)/clients/(selected-client)/[selected-client-id]/(selected-appointment)/[selected-appointment-id]/chat/page";
import { createContext, useContext, useState } from "react";

// const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface ChatContextProps {
  isChatsLoading: boolean;
  setIsChatsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChatMessages: MessageProps[];
  setSelectedChatMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const ChatContextProvider = ({ children }: ProviderProps) => {
  // const { selectedModel } = useModelContext();
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [selectedChatMessages, setSelectedChatMessages] = useState<
    MessageProps[]
  >([]);

  // useEffect(() => {
  //   if (selectedModel) {
  //     setSelectedChatMessages([]);
  //   }
  // }, [selectedModel]);

  return (
    <ChatContext.Provider
      value={{
        isChatsLoading,
        setIsChatsLoading,
        selectedChatMessages,
        setSelectedChatMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      "useChatContext deve ser usado dentro de um ChatContextProvider",
    );
  }
  return context;
}

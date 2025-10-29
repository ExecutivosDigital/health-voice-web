"use client";

import {
  ClientProps,
  FetchRecordingsRequest,
  FetchSimpleRequest,
  RecordingDetailsProps,
  ReminderProps,
} from "@/@types/general-client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApiContext } from "./ApiContext";
import { useSession } from "./auth"; // Para saber quando buscar dados

interface GeneralContextProps {
  // Gravações
  recordings: RecordingDetailsProps[];
  setRecordings: React.Dispatch<React.SetStateAction<RecordingDetailsProps[]>>;
  recordingsFilters: FetchRecordingsRequest;
  setRecordingsFilters: React.Dispatch<
    React.SetStateAction<FetchRecordingsRequest>
  >;
  recordingsTotalPages: number;
  setRecordingsTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isGettingRecordings: boolean;
  setIsGettingRecordings: React.Dispatch<React.SetStateAction<boolean>>;
  GetRecordings: () => Promise<void>;
  selectedRecording: RecordingDetailsProps | null;
  setSelectedRecording: React.Dispatch<
    React.SetStateAction<RecordingDetailsProps | null>
  >;

  // Agendamentos (Reminders)
  reminders: ReminderProps[];
  setReminders: React.Dispatch<React.SetStateAction<ReminderProps[]>>;
  remindersFilters: FetchSimpleRequest;
  setRemindersFilters: React.Dispatch<React.SetStateAction<FetchSimpleRequest>>;
  remindersTotalPages: number;
  setRemindersTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isGettingReminders: boolean;
  setIsGettingReminders: React.Dispatch<React.SetStateAction<boolean>>;
  GetReminders: () => Promise<void>;
  selectedReminder: ReminderProps | null;
  setSelectedReminder: React.Dispatch<
    React.SetStateAction<ReminderProps | null>
  >;

  // Pacientes (Clients)
  clients: ClientProps[];
  setClients: React.Dispatch<React.SetStateAction<ClientProps[]>>;
  clientsFilters: FetchSimpleRequest;
  setClientsFilters: React.Dispatch<React.SetStateAction<FetchSimpleRequest>>;
  clientsTotalPages: number;
  setClientsTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isGettingClients: boolean;
  setIsGettingClients: React.Dispatch<React.SetStateAction<boolean>>;
  GetClients: () => Promise<void>;
  selectedClient: ClientProps | null;
  setSelectedClient: React.Dispatch<React.SetStateAction<ClientProps | null>>;
}

const GeneralContext = createContext<GeneralContextProps | undefined>(
  undefined,
);

// Hook para consumir o contexto
export function useGeneralContext() {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error(
      "useGeneralContext deve ser usado dentro de um GeneralContextProvider",
    );
  }
  return context;
}

// --- 3. COMPONENTE PROVIDER ---

interface ProviderProps {
  children: React.ReactNode;
}

export const GeneralContextProvider = ({ children }: ProviderProps) => {
  const { GetAPI } = useApiContext();
  const { profile } = useSession();

  // --- Estados para Gravações ---
  const [recordings, setRecordings] = useState<RecordingDetailsProps[]>([]);
  const [isGettingRecordings, setIsGettingRecordings] = useState(true);
  const [recordingsFilters, setRecordingsFilters] =
    useState<FetchRecordingsRequest>({ page: 1 });
  const [recordingsTotalPages, setRecordingsTotalPages] = useState(0);
  const [selectedRecording, setSelectedRecording] =
    useState<RecordingDetailsProps | null>(null);

  // --- Estados para Agendamentos (Reminders) ---
  const [reminders, setReminders] = useState<ReminderProps[]>([]);
  const [isGettingReminders, setIsGettingReminders] = useState(true);
  const [remindersFilters, setRemindersFilters] = useState<FetchSimpleRequest>({
    page: 1,
  });
  const [remindersTotalPages, setRemindersTotalPages] = useState(0);
  const [selectedReminder, setSelectedReminder] =
    useState<ReminderProps | null>(null);

  // --- Estados para Pacientes (Clients) ---
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [isGettingClients, setIsGettingClients] = useState(true);
  const [clientsFilters, setClientsFilters] = useState<FetchSimpleRequest>({
    page: 1,
  });
  const [clientsTotalPages, setClientsTotalPages] = useState(0);
  const [selectedClient, setSelectedClient] = useState<ClientProps | null>(
    null,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buildQueryString = (params: Record<string, any>): string => {
    const query = new URLSearchParams();
    for (const key in params) {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
      ) {
        query.append(key, params[key].toString());
      }
    }
    return query.toString();
  };

  console.log("selectedRecording: ", selectedRecording);
  // --- 4. FUNÇÕES DE FETCH (Padrão GeneralContext) ---

  const GetRecordings = useCallback(async () => {
    setIsGettingRecordings(true);
    try {
      const queryString = buildQueryString(recordingsFilters);
      // Endpoint: /recording
      const response = await GetAPI(`/recording?${queryString}`, true);
      if (response.status === 200) {
        setRecordings(response.body.recordings || []);
        setRecordingsTotalPages(response.body.pages || 0);
      } else {
        console.error("Erro ao buscar gravações:", response.status);
        setRecordings([]);
        setRecordingsTotalPages(0);
      }
    } catch (error) {
      console.error("Erro no GetRecordings:", error);
      setRecordings([]);
      setRecordingsTotalPages(0);
    } finally {
      setIsGettingRecordings(false);
    }
  }, [GetAPI, recordingsFilters]); // Depende do filtro

  const GetReminders = useCallback(async () => {
    setIsGettingReminders(true);
    try {
      const queryString = buildQueryString(remindersFilters);
      // Endpoint: /reminder (ou /reminder, ajuste se necessário)
      const response = await GetAPI(`/reminder?${queryString}`, true);
      if (response.status === 200) {
        // A API retorna 'reminders', mas salvamos em 'reminders'
        setReminders(response.body.reminders || []);
        setRemindersTotalPages(response.body.pages || 0);
      } else {
        console.error("Erro ao buscar agendamentos:", response.status);
        setReminders([]);
        setRemindersTotalPages(0);
      }
    } catch (error) {
      console.error("Erro no GetReminders:", error);
      setReminders([]);
      setRemindersTotalPages(0);
    } finally {
      setIsGettingReminders(false);
    }
  }, [GetAPI, remindersFilters]); // Depende do filtro

  const GetClients = useCallback(async () => {
    setIsGettingClients(true);
    try {
      const queryString = buildQueryString(clientsFilters);
      // Endpoint: /client (ou /client, ajuste se necessário)
      const response = await GetAPI(`/client?${queryString}`, true);

      if (response.status === 200) {
        // A API retorna 'clients', mas salvamos em 'clients'
        setClients(response.body.clients || []);
        setClientsTotalPages(response.body.pages || 0);
      } else {
        console.error("Erro ao buscar pacientes:", response.status);
        setClients([]);
        setClientsTotalPages(0);
      }
    } catch (error) {
      console.error("Erro no GetClients:", error);
      setClients([]);
      setClientsTotalPages(0);
    } finally {
      setIsGettingClients(false);
    }
  }, [GetAPI, clientsFilters]); // Depende do filtro

  useEffect(() => {
    if (profile) {
      GetRecordings();
      GetReminders();
      GetClients();
    } else {
      setRecordings([]);
      setReminders([]);
      setClients([]);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      GetRecordings();
    }
  }, [recordingsFilters, GetRecordings, profile]);

  useEffect(() => {
    if (profile) {
      GetReminders();
    }
  }, [remindersFilters, GetReminders, profile]);

  useEffect(() => {
    if (profile) {
      GetClients();
    }
  }, [clientsFilters, GetClients, profile]);

  return (
    <GeneralContext.Provider
      value={{
        // Gravações
        recordings,
        setRecordings,
        recordingsFilters,
        setRecordingsFilters,
        recordingsTotalPages,
        setRecordingsTotalPages,
        isGettingRecordings,
        setIsGettingRecordings,
        GetRecordings,
        selectedRecording,
        setSelectedRecording,

        // Agendamentos
        reminders,
        setReminders,
        remindersFilters,
        setRemindersFilters,
        remindersTotalPages,
        setRemindersTotalPages,
        isGettingReminders,
        setIsGettingReminders,
        GetReminders,
        selectedReminder,
        setSelectedReminder,

        // Pacientes
        clients,
        setClients,
        clientsFilters,
        setClientsFilters,
        clientsTotalPages,
        setClientsTotalPages,
        isGettingClients,
        setIsGettingClients,
        GetClients,
        selectedClient,
        setSelectedClient,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

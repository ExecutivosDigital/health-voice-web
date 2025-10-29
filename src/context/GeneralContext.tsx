"use client";

import {
  AppointmentProps,
  FetchRecordingsRequest,
  FetchSimpleRequest,
  PatientProps,
  RecordingDetailsProps,
} from "@/@types/general-patient";
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

  // Agendamentos (Appointments)
  appointments: AppointmentProps[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentProps[]>>;
  appointmentsFilters: FetchSimpleRequest;
  setAppointmentsFilters: React.Dispatch<
    React.SetStateAction<FetchSimpleRequest>
  >;
  appointmentsTotalPages: number;
  setAppointmentsTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isGettingAppointments: boolean;
  setIsGettingAppointments: React.Dispatch<React.SetStateAction<boolean>>;
  GetAppointments: () => Promise<void>;
  selectedAppointment: AppointmentProps | null;
  setSelectedAppointment: React.Dispatch<
    React.SetStateAction<AppointmentProps | null>
  >;

  // Pacientes (Patients)
  patients: PatientProps[];
  setPatients: React.Dispatch<React.SetStateAction<PatientProps[]>>;
  patientsFilters: FetchSimpleRequest;
  setPatientsFilters: React.Dispatch<React.SetStateAction<FetchSimpleRequest>>;
  patientsTotalPages: number;
  setPatientsTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isGettingPatients: boolean;
  setIsGettingPatients: React.Dispatch<React.SetStateAction<boolean>>;
  GetPatients: () => Promise<void>;
  selectedPatient: PatientProps | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<PatientProps | null>>;
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

  // --- Estados para Agendamentos (Appointments) ---
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [isGettingAppointments, setIsGettingAppointments] = useState(true);
  const [appointmentsFilters, setAppointmentsFilters] =
    useState<FetchSimpleRequest>({ page: 1 });
  const [appointmentsTotalPages, setAppointmentsTotalPages] = useState(0);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentProps | null>(null);

  // --- Estados para Pacientes (Patients) ---
  const [patients, setPatients] = useState<PatientProps[]>([]);
  const [isGettingPatients, setIsGettingPatients] = useState(true);
  const [patientsFilters, setPatientsFilters] = useState<FetchSimpleRequest>({
    page: 1,
  });
  const [patientsTotalPages, setPatientsTotalPages] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState<PatientProps | null>(
    null,
  );

  // Função utilitária para construir query strings
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

  // --- 4. FUNÇÕES DE FETCH (Padrão GeneralContext) ---

  const GetRecordings = useCallback(async () => {
    setIsGettingRecordings(true);
    try {
      const queryString = buildQueryString(recordingsFilters);
      // Endpoint: /recording

      console.log("entrou aqui");
      const response = await GetAPI(`/recording?${queryString}`, true);
      console.log(response);

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

  const GetAppointments = useCallback(async () => {
    setIsGettingAppointments(true);
    try {
      const queryString = buildQueryString(appointmentsFilters);
      // Endpoint: /reminder (ou /appointment, ajuste se necessário)
      const response = await GetAPI(`/reminder?${queryString}`, true);

      if (response.status === 200) {
        // A API retorna 'reminders', mas salvamos em 'appointments'
        setAppointments(response.body.reminders || []);
        setAppointmentsTotalPages(response.body.pages || 0);
      } else {
        console.error("Erro ao buscar agendamentos:", response.status);
        setAppointments([]);
        setAppointmentsTotalPages(0);
      }
    } catch (error) {
      console.error("Erro no GetAppointments:", error);
      setAppointments([]);
      setAppointmentsTotalPages(0);
    } finally {
      setIsGettingAppointments(false);
    }
  }, [GetAPI, appointmentsFilters]); // Depende do filtro

  const GetPatients = useCallback(async () => {
    setIsGettingPatients(true);
    try {
      const queryString = buildQueryString(patientsFilters);
      // Endpoint: /client (ou /patient, ajuste se necessário)
      const response = await GetAPI(`/client?${queryString}`, true);

      if (response.status === 200) {
        // A API retorna 'clients', mas salvamos em 'patients'
        setPatients(response.body.clients || []);
        setPatientsTotalPages(response.body.pages || 0);
      } else {
        console.error("Erro ao buscar pacientes:", response.status);
        setPatients([]);
        setPatientsTotalPages(0);
      }
    } catch (error) {
      console.error("Erro no GetPatients:", error);
      setPatients([]);
      setPatientsTotalPages(0);
    } finally {
      setIsGettingPatients(false);
    }
  }, [GetAPI, patientsFilters]); // Depende do filtro

  useEffect(() => {
    console.log("GeneralContextProvider: useEffect");
    if (profile) {
      console.log("GeneralContextProvider: Usuário logado, buscando dados...");
      GetRecordings();
      GetAppointments();
      GetPatients();
    } else {
      setRecordings([]);
      setAppointments([]);
      setPatients([]);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      GetRecordings();
    }
  }, [recordingsFilters, GetRecordings, profile]);

  useEffect(() => {
    if (profile) {
      GetAppointments();
    }
  }, [appointmentsFilters, GetAppointments, profile]);

  useEffect(() => {
    if (profile) {
      GetPatients();
    }
  }, [patientsFilters, GetPatients, profile]);

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
        appointments,
        setAppointments,
        appointmentsFilters,
        setAppointmentsFilters,
        appointmentsTotalPages,
        setAppointmentsTotalPages,
        isGettingAppointments,
        setIsGettingAppointments,
        GetAppointments,
        selectedAppointment,
        setSelectedAppointment,

        // Pacientes
        patients,
        setPatients,
        patientsFilters,
        setPatientsFilters,
        patientsTotalPages,
        setPatientsTotalPages,
        isGettingPatients,
        setIsGettingPatients,
        GetPatients,
        selectedPatient,
        setSelectedPatient,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

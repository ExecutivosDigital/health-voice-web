// --- 1. DEFINIÇÃO DOS TIPOS ---

// Tipos para Pacientes (anteriormente Clients)
export interface PatientProps {
  id: string;
  name: string;
  userId: string;
  description?: string | null;
  birthDate?: string | null;
  createdAt: Date;
}

// Tipos para Agendamentos (anteriormente Reminders)
export interface AppointmentProps {
  id: string;
  name: string;
  description: string;
  date: Date;
  time: string;
  userId: string;
  notificationSended: boolean;
}

// Tipos para Gravações
export interface RecordingSpeakerSpeechProps {
  speakerId: string;
  transcription: string;
  recordingId: string;
  startTime: number;
  endTime: number;
}
export interface RecordingSpeakerProps {
  id: string;
  name: string;
  recordingId: string;
}

export interface RecordingDetailsProps {
  id: string;
  name: string;
  description: string;
  duration: string;
  audioUrl: string;
  userId: string;
  transcriptionStatus: "PENDING" | "DONE" | "NOT_REQUESTED" | "TRANSCRIBING";
  type: "CLIENT" | "REMINDER" | "OTHER" | "STUDY"; // Nota: O tipo da gravação ainda usa 'CLIENT' e 'REMINDER'
  transcription?: string | null;
  summary?: string | null;
  client?: PatientProps | null; // Renomeado para 'client' mas usando PatientProps
  reminderId?: string | null; // Renomeado para 'reminderId' mas referente a Appointment
  transcriptionId?: string | null;
  speeches: RecordingSpeakerSpeechProps[];
  speakers: RecordingSpeakerProps[];
  createdAt: Date;
}

// Tipo para os Query Params de Gravações
export interface FetchRecordingsRequest {
  page: number;
  clientId?: string; // Mantido como clientId conforme especificação da API
  reminderId?: string; // Mantido como reminderId conforme especificação da API
  type?: "CLIENT" | "REMINDER" | "OTHER" | "STUDY";
}

export interface FetchSimpleRequest {
  page: number;
}

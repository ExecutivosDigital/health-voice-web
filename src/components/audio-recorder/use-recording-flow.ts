// use-recording-flow.ts - ATUALIZADO
import { useCallback, useState } from "react";

export type RecordingType = "CLIENT" | "PERSONAL";
export type ConsultationType = "IN_PERSON" | "ONLINE" | null;
export type PersonalRecordingType = "REMINDER" | "STUDY" | "OTHER" | null;
export type RecordingStep =
  | "idle"
  | "save-dialog"
  | "instructions"
  | "recording"
  | "preview" // ← NOVO STEP
  | "processing";

interface RecordingMetadata {
  name: string;
  description: string;
  recordingType: RecordingType;
  consultationType: ConsultationType;
  personalRecordingType: PersonalRecordingType;
  selectedClientId: string;
}

export function useRecordingFlow(onReset?: () => void) {
  // ← RECEBER CALLBACK
  const [currentStep, setCurrentStep] = useState<RecordingStep>("idle");
  const [metadata, setMetadata] = useState<RecordingMetadata>({
    name: "",
    description: "",
    recordingType: "CLIENT",
    consultationType: null,
    personalRecordingType: null,
    selectedClientId: "",
  });
  const [error, setError] = useState<string | null>(null);

  const updateMetadata = useCallback((updates: Partial<RecordingMetadata>) => {
    setMetadata((prev) => ({ ...prev, ...updates }));
  }, []);

  const validateForm = useCallback((): boolean => {
    if (metadata.recordingType === "CLIENT" && !metadata.consultationType) {
      setError("Por favor, selecione o tipo de consulta");
      return false;
    }
    if (metadata.recordingType === "CLIENT" && !metadata.selectedClientId) {
      setError("Por favor, selecione um paciente");
      return false;
    }
    if (
      metadata.recordingType === "PERSONAL" &&
      !metadata.personalRecordingType
    ) {
      setError("Por favor, selecione o tipo de gravação");
      return false;
    }
    setError(null);
    return true;
  }, [metadata]);

  const resetFlow = useCallback(() => {
    setMetadata({
      name: "",
      description: "",
      recordingType: "CLIENT",
      consultationType: null,
      personalRecordingType: null,
      selectedClientId: "",
    });
    setCurrentStep("idle");
    setError(null);

    // Chamar callback de reset do recorder
    if (onReset) {
      onReset();
    }
  }, [onReset]); // ← ADICIONAR DEPENDÊNCIA

  const openSaveDialog = useCallback((type: RecordingType) => {
    setMetadata((prev) => ({
      ...prev,
      recordingType: type,
      consultationType: type === "CLIENT" ? "IN_PERSON" : null,
      personalRecordingType: null,
    }));
    setCurrentStep("save-dialog");
  }, []);

  return {
    currentStep,
    setCurrentStep,
    metadata,
    updateMetadata,
    error,
    setError,
    validateForm,
    resetFlow,
    openSaveDialog,
  };
}

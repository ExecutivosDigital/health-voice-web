/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";

interface GeneralContextProps {
  patients: any[];
  setPatients: React.Dispatch<React.SetStateAction<any[]>>;
  patientsFilters: any;
  setPatientsFilters: React.Dispatch<React.SetStateAction<any>>;
  patientsPages: number;
  setPatientsPages: React.Dispatch<React.SetStateAction<number>>;
  isGettingPatients: boolean;
  setIsGettingPatients: React.Dispatch<React.SetStateAction<boolean>>;
  GetGeneralPatients: () => Promise<void>;
  selectedPatient: any | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<any | null>>;
  appointments: any[];
  setAppointments: React.Dispatch<React.SetStateAction<any[]>>;
  appointmentsFilters: any;
  setAppointmentsFilters: React.Dispatch<React.SetStateAction<any>>;
  appointmentsPages: number;
  setAppointmentsPages: React.Dispatch<React.SetStateAction<number>>;
  isGettingAppointments: boolean;
  setIsGettingAppointments: React.Dispatch<React.SetStateAction<boolean>>;
  GetGeneralAppointments: () => Promise<void>;
  selectedAppointment: any | null;
  setSelectedAppointment: React.Dispatch<React.SetStateAction<any | null>>;
}

const GeneralContext = createContext<GeneralContextProps | undefined>(
  undefined,
);

interface ProviderProps {
  children: React.ReactNode;
}

export const GeneralContextProvider = ({ children }: ProviderProps) => {
  const { GetAPI } = useApiContext();

  const [patients, setPatients] = useState<any[]>([
    {
      id: "1",
      name: "Paciente",
      status: "Ativo",
    },
  ]);
  const [isGettingPatients, setIsGettingPatients] = useState(true);
  const [patientsFilters, setPatientsFilters] = useState({});
  const [patientsPages, setPatientsPages] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<any[]>([
    {
      id: "1",
      name: "Consulta",
      status: "Ativo",
    },
  ]);
  const [isGettingAppointments, setIsGettingAppointments] = useState(true);
  const [appointmentsFilters, setAppointmentsFilters] = useState({});
  const [appointmentsPages, setAppointmentsPages] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null,
  );

  async function GetGeneralPatients() {
    const patients = await GetAPI("/patients", true);
    console.log("patients", patients);
    return setIsGettingPatients(false);
  }

  async function GetGeneralAppointments() {
    const appointments = await GetAPI("/appointments", true);
    console.log("appointments", appointments);
    return setIsGettingAppointments(false);
  }

  useEffect(() => {
    GetGeneralPatients();
    GetGeneralAppointments();
  }, [patients]);

  return (
    <GeneralContext.Provider
      value={{
        patients,
        setPatients,
        patientsFilters,
        setPatientsFilters,
        patientsPages,
        setPatientsPages,
        isGettingPatients,
        setIsGettingPatients,
        GetGeneralPatients,
        selectedPatient,
        setSelectedPatient,
        appointments,
        setAppointments,
        appointmentsFilters,
        setAppointmentsFilters,
        appointmentsPages,
        setAppointmentsPages,
        isGettingAppointments,
        setIsGettingAppointments,
        GetGeneralAppointments,
        selectedAppointment,
        setSelectedAppointment,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export function useGeneralContext() {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error(
      "useGeneralContext deve ser usado dentro de um GeneralContextProvider",
    );
  }
  return context;
}

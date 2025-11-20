import { useApiContext } from "@/context/ApiContext";
import { useGeneralContext } from "@/context/GeneralContext";
import { cn } from "@/utils/cn";
import { maskDate } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./blocks/form";
import { Input } from "./blocks/input";
import { Textarea } from "./blocks/textarea";

interface CreateClientSheetProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const FormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
});

export function CreateClientSheet({
  isOpen,
  onClose,
  className,
}: CreateClientSheetProps) {
  const { PostAPI } = useApiContext();
  const { GetClients } = useGeneralContext();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      birthDate: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["name", "description", "birthDate"] as const,
    };

    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };

    return { activeStep, validateStep, setActiveStep };
  };

  const { validateStep } = useFormSteps(form);

  const handleNext = async (
    form: UseFormReturn<z.infer<typeof FormSchema>>,
  ) => {
    const isValid = await validateStep(0);
    if (!isValid) {
      const errors = form.formState.errors;

      const fieldLabels: Record<keyof z.infer<typeof FormSchema>, string> = {
        name: "Nome",
        description: "Descrição",
        birthDate: "Data de nascimento",
      };

      const firstErrorField = Object.keys(
        errors,
      )[0] as keyof typeof fieldLabels;
      const firstError = errors[firstErrorField];

      if (firstError?.message && firstErrorField in fieldLabels) {
        const fieldLabel = fieldLabels[firstErrorField];
        return toast.error(`${fieldLabel}: ${firstError.message}`);
      }

      return toast.error("Por favor, corrija os erros no formulário.");
    } else {
      setIsLoading(true);
      const data = await PostAPI("/client", form.getValues(), true);
      if (data.status === 200) {
        toast.success("Formulário enviado com sucesso!");
        onClose();
        GetClients();
        return setIsLoading(false);
      }
      toast.error(data?.body?.message ?? "Falha ao enviar o formulário.");
      return setIsLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={cn(
        "bg-opacity-50 fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-xs",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        className,
      )}
    >
      <div className="animate-slide-up w-full max-w-2xl rounded-t-3xl bg-white p-6">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text-100">
                  Nome do Paciente
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite..."
                    type="text"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    className={cn("", {
                      "text-text-100 rounded-md border-red-500 focus:border-red-500":
                        form.formState.errors.name,
                    })}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text-100">
                  Data de Nascimento do Paciente
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite..."
                    type="text"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(maskDate(e.target.value));
                    }}
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text-100">
                  Descrição do Paciente
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite..."
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    className="h-32 resize-none"
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-between">
            <button
              onClick={() => onClose()}
              className="my-4 h-10 w-max rounded-md border border-neutral-300 px-2 text-neutral-500 transition duration-200 hover:bg-transparent"
            >
              Fechar
            </button>
            <button
              onClick={() => handleNext(form)}
              disabled={isLoading}
              className={cn(
                "border-primary bg-primary hover:text-primary my-4 flex h-10 min-w-40 items-center justify-center rounded-md border px-2 font-semibold text-white transition duration-200 hover:bg-transparent",
                isLoading && "text-primary bg-white",
              )}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Criar Paciente"
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

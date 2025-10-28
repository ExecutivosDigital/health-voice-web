"use client";
import { useApiContext } from "@/context/ApiContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockIcon, Mail } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Field from "./field";
import { Form, FormField, FormItem, FormMessage } from "./form";

type SignInProps = {
  onClick: () => void;
};

const FormSchema = z.object({
  email: z.email({ message: "Email Inválido" }),
  password: z.string().min(6, "Senha inválida"),
});

const SignIn = ({ onClick }: SignInProps) => {
  const cookies = useCookies();
  const router = useRouter();
  const { PostAPI, setToken } = useApiContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["email", "password"] as const,
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
        email: "Email",
        password: "Senha",
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
      setIsLoggingIn(true);
      const login = await PostAPI("/client/auth", form.getValues(), false);
      if (login.status === 200) {
        cookies.set(
          process.env.NEXT_PUBLIC_USER_TOKEN as string,
          login.body.accessToken,
        );
        setToken(login.body.accessToken);
        router.push("/");
        return setIsLoggingIn(false);
      }
      toast.error("Erro ao efetuar login, tente novamente.");
      setIsLoggingIn(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext(form);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-1 2xl:gap-4" onKeyDown={handleKeyPress}>
        <FormField
          key="email"
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Field
                classInput="border-white/50"
                placeholder="Email"
                Svg={<Mail className="text-white/50" />}
                value={field.value}
                onChange={field.onChange}
                required
              />
              <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-rose-800" />
            </FormItem>
          )}
        />

        <FormField
          key="password"
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Field
                  classInput="border-white/50"
                  placeholder="Senha"
                  Svg={<LockIcon className="text-white/50" />}
                  type={showPassword ? "text" : "password"}
                  value={field.value}
                  onChange={field.onChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-rose-800" />
            </FormItem>
          )}
        />
      </div>
      <button
        className="mb-6 text-white/50 transition-colors"
        type="button"
        onClick={onClick}
      >
        Esqueceu a senha?
      </button>
      <button
        onClick={() => handleNext(form)}
        disabled={isLoggingIn}
        className="text-primary w-full rounded-md bg-white px-4 py-2 font-semibold shadow-sm"
      >
        {isLoggingIn ? (
          <div className="flex w-full items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Entrando</span>
          </div>
        ) : (
          "Entrar Agora"
        )}
      </button>
      <div className="mt-2 flex flex-col gap-4 xl:mt-4">
        <div className="flex w-full items-center gap-2">
          <div className="h-px w-full flex-1 bg-white/50" />
          <span className="text-xs text-white/50">ou entre com </span>
          <div className="h-px w-full flex-1 bg-white/50" />
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white font-semibold text-white">
            <Image
              src="/icons/google-login.png"
              alt=""
              width={100}
              height={100}
              className="h-6 w-max object-contain"
            />
            Google
          </button>
          <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white font-semibold text-white">
            <Image
              src="/icons/apple-login.png"
              alt=""
              width={100}
              height={100}
              className="h-6 w-max object-contain"
            />
            Apple
          </button>
        </div>
        {/* <div className="flex items-center justify-center gap-2 text-sm text-white">
          <span>Não tem conta ainda?</span>
          <span
            onClick={() => setSelectedStep(1)}
            className="cursor-pointer text-white/50 hover:underline"
          >
            Conheça agora
          </span>
        </div> */}
      </div>
    </Form>
  );
};

export default SignIn;

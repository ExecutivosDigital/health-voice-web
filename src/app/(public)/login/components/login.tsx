"use client";

// Importações do React e Next.js
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Importações de bibliotecas
import { zodResolver } from "@hookform/resolvers/zod";
import { Amplify } from "aws-amplify";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import config from "../../../../utils/amplify.json";

// Importações de UI (shadcn/ui e lucide)
import { Eye, EyeOff, Loader2, LockIcon, Mail } from "lucide-react";
import Field from "./field"; // Assumindo que este componente exista
import { Form, FormField, FormItem, FormMessage } from "./form"; // Assumindo que este componente exista

// Importações do AWS Amplify (NOVO)
import { signIn, signInWithRedirect } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

import { useSession } from "@/context/auth"; // ← ADICIONE ISSO

// Props do componente
type SignInProps = {
  onClick: () => void; // Para "Esqueceu a senha?"
};

// Schema de validação do Zod (sem alteração)
const FormSchema = z.object({
  email: z.string().email({ message: "Email Inválido" }),
  password: z.string().min(6, "Senha inválida"),
});

type FormData = z.infer<typeof FormSchema>;

const SignIn = ({ onClick }: SignInProps) => {
  const { handleGetProfile, waitForTokens } = useSession(); // ← ADICIONE ISSO
  const router = useRouter();
  Amplify.configure(config);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Configuração do react-hook-form (sem alteração)
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Efeito para "ouvir" eventos de autenticação do Amplify (NOVO)
  // Isso é crucial para o signInWithRedirect (login social)
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          setIsLoggingIn(true);
          try {
            // ✅ Aguarda tokens
            await waitForTokens();

            // ✅ Carrega perfil
            await handleGetProfile(true);

            // ✅ Delay para sincronização
            await new Promise((resolve) => setTimeout(resolve, 300));

            toast.success("Login efetuado com sucesso!");
            router.push("/");
          } catch (error) {
            console.error("Erro ao carregar perfil após login social:", error);
            toast.error("Erro ao carregar dados do usuário.");
          } finally {
            setIsLoggingIn(false);
          }
          break;

        case "signInWithRedirect_failure":
          console.error("Falha no login social:", payload.data);
          toast.error("Falha ao tentar login com rede social.");
          setIsLoggingIn(false);
          break;

        case "tokenRefresh_failure":
          console.error("Falha ao renovar token:", payload.data);
          toast.error("Sua sessão expirou. Faça login novamente.");
          router.push("/login");
          break;
      }
    });

    return () => unsubscribe();
  }, [router, handleGetProfile, waitForTokens]);

  /**
   * Trata a submissão do formulário de e-mail e senha.
   * (MODIFICADO: usa Amplify signIn em vez de PostAPI)
   */
  const handleLogin = async (data: FormData) => {
    setIsLoggingIn(true);
    try {
      const { email, password } = data;

      const { isSignedIn } = await signIn({
        username: email.trim(),
        password: password.trim(),
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });

      if (isSignedIn) {
        // ✅ AGUARDA os tokens propagarem
        const tokensReady = await waitForTokens();

        if (!tokensReady) {
          toast.error("Erro ao carregar sessão. Tente novamente.");
          return;
        }

        // ✅ FORÇA o carregamento do perfil
        await handleGetProfile(true); // forceRefresh = true

        // ✅ Pequeno delay para garantir que o Context atualizou
        await new Promise((resolve) => setTimeout(resolve, 300));

        // ✅ Agora redireciona com segurança
        toast.success("Login efetuado com sucesso!");
        router.push("/");
      } else {
        toast.error("Não foi possível completar o login. Tente novamente.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro no login:", error);

      let errorMessage = "Erro ao efetuar login, tente novamente.";
      if (error.name === "UserNotFoundException") {
        errorMessage = "Usuário não encontrado.";
      } else if (error.name === "NotAuthorizedException") {
        errorMessage = "E-mail ou senha incorretos.";
      } else if (error.name === "NetworkError") {
        errorMessage = "Erro de rede. Verifique sua conexão.";
      } else if (error.name === "UserAlreadyAuthenticatedException") {
        errorMessage = "Você já está logado.";
        router.push("/");
        return;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  /**
   * Inicia o fluxo de login com Google. (NOVO)
   */
  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true); // Mostra o loader
    try {
      await signInWithRedirect({
        provider: "Google",
      });
      // O usuário será redirecionado. O Hub listener cuidará do resto.
    } catch (error) {
      console.error("Erro ao iniciar Google SignIn:", error);
      toast.error("Não foi possível iniciar o login com Google.");
      setIsLoggingIn(false);
    }
  };

  /**
   * Inicia o fluxo de login com Apple. (NOVO)
   */
  const handleAppleSignIn = async () => {
    setIsLoggingIn(true); // Mostra o loader
    try {
      await signInWithRedirect({
        provider: "Apple",
      });
      // O usuário será redirecionado. O Hub listener cuidará do resto.
    } catch (error) {
      console.error("Erro ao iniciar Apple SignIn:", error);
      toast.error("Não foi possível iniciar o login com Apple.");
      setIsLoggingIn(false);
    }
  };

  // Trata o "Enter" para submeter o formulário
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Dispara a validação e submissão do react-hook-form
      form.handleSubmit(handleLogin)();
    }
  };

  return (
    // Usa o 'onSubmit' do react-hook-form
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="flex flex-col gap-1 2xl:gap-4"
        onKeyDown={handleKeyPress} // Manter o onKeyDown no wrapper
      >
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
                {...field} // Simplifica a passagem de props
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
                  {...field} // Simplifica a passagem de props
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

        <span
          className="mb-6 cursor-pointer text-white/50 transition hover:text-white/60"
          onClick={onClick} // Para "Esqueceu a senha?"
        >
          Esqueceu a senha?
        </span>

        <button
          type="submit" // Botão principal agora é 'submit'
          disabled={isLoggingIn}
          className="text-primary w-full rounded-3xl bg-white px-4 py-2 font-semibold shadow-sm transition hover:shadow-lg"
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
      </form>

      <div className="mt-2 flex flex-col gap-4 xl:mt-4">
        <div className="flex w-full items-center gap-2">
          <div className="h-px w-full flex-1 bg-white/50" />
          <span className="text-xs text-white/50">ou entre com </span>
          <div className="h-px w-full flex-1 bg-white/50" />
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          {/* Botões sociais agora têm 'onClick' e 'type="button"' */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoggingIn}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-3xl border border-white font-semibold text-white disabled:opacity-50"
          >
            <Image
              src="/icons/google-login.png"
              alt="Logo do Google"
              width={24} // Tamanho explícito é melhor
              height={24}
              className="h-6 w-6 object-contain" // Ajustado para w-6
            />
            Google
          </button>
          <button
            type="button"
            onClick={handleAppleSignIn}
            disabled={isLoggingIn}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-3xl border border-white font-semibold text-white disabled:opacity-50"
          >
            <Image
              src="/icons/apple-login.png"
              alt="Logo da Apple"
              width={24} // Tamanho explícito
              height={24}
              className="h-6 w-6 object-contain" // Ajustado para w-6
            />
            Apple
          </button>
        </div>
        {/* ... restante do seu JSX ... */}
      </div>
    </Form>
  );
};

export default SignIn;

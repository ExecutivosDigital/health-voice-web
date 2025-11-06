"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import ForgotPassword from "./components/forgot";
import SignIn from "./components/login";
import CreateAccount from "./components/register";

export default function Login() {
  const [selectedStep] = useState(0);
  const [forgot, setForgot] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex h-full min-h-[100svh] flex-col gap-2 overflow-x-hidden p-2 xl:flex-row 2xl:gap-4 2xl:p-4">
        <div className="to-primary relative mx-auto flex w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 xl:max-w-[50vw] xl:justify-between xl:p-8">
          <Image
            className="object-full absolute top-0 left-0 m-auto block h-full w-full rounded-3xl"
            src="/static/login.png"
            alt=""
            width={1000}
            height={1000}
          />
          <Image
            src="/logos/logo-2.png"
            alt=""
            width={1000}
            height={500}
            className="h-max max-w-80 object-contain"
          />
          <div className="flex flex-col text-white xl:gap-4">
            <span className="text-lg font-bold xl:text-2xl">
              Menos digitação, mais atendimentos... Simples assim!
            </span>
            <span>
              Acesse seu assistente virtual. O{" "}
              {process.env.PROJECT_NAME || "Health Voice"} transforma suas
              conversas em prontuários estruturados, liberando horas do seu dia
              e eliminando o trabalho administrativo.
            </span>
          </div>
        </div>
        <div className="relative flex w-full rounded-3xl bg-white p-2 xl:max-w-[50vw]">
          <div className="bg-primary m-auto w-full max-w-[31.5rem] rounded-3xl xl:p-8">
            {forgot ? (
              <ForgotPassword onClick={() => setForgot(false)} />
            ) : (
              <>
                <Image
                  className="mx-auto mb-2 h-auto w-48 2xl:mb-8 2xl:w-80"
                  src="/logos/logo.png"
                  width={1000}
                  height={500}
                  alt=""
                />
                <div>
                  {/* <div className="mb-2 flex rounded-md bg-stone-800 p-1 2xl:mb-8">
                    <div
                      onClick={() => setSelectedStep(0)}
                      className={cn(
                        "flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-md transition-colors outline-none",
                        selectedStep === 0 && "bg-stone-700 font-semibold",
                      )}
                    >
                      Entrar
                    </div>
                    <div
                      onClick={() => setSelectedStep(1)}
                      className={cn(
                        "flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-md transition-colors outline-none",
                        selectedStep === 1 && "bg-stone-700 font-semibold",
                      )}
                    >
                      Contrate Agora
                    </div>
                  </div> */}
                  <div>
                    <div className={cn("", selectedStep !== 0 && "hidden")}>
                      <SignIn onClick={() => setForgot(true)} />
                    </div>
                    <div className={cn("", selectedStep !== 1 && "hidden")}>
                      <CreateAccount />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

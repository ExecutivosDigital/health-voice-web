import { AudioPlayer } from "@/components/chatPopup/AudioPlayer";
import { Message } from "@/components/chatPopup/types";
import { TypingDots } from "@/components/chatPopup/typingDots";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  message: Message;
}

export function Messages({ message }: Props) {
  return (
    <div className="">
      {message.role === "user" ? (
        message.type?.startsWith("audio") && message.file ? (
          <div className="group mb-4 flex max-w-[calc(100%-8px)] flex-col items-end justify-end gap-1 lg:mb-2 xl:mb-4">
            <div className="bg-primary flex min-w-10 justify-center gap-1 rounded-2xl rounded-br-none p-2 text-white shadow-sm">
              <AudioPlayer
                audioUrl={message.file}
                className="min-h-[40px] w-48 px-2 py-1"
              />
            </div>
            <div className="flex items-center justify-start gap-2 text-xs lg:text-[8px] xl:text-xs">
              {moment().format("HH:mm")}
            </div>
          </div>
        ) : (
          <div className="group mr-2 mb-4 ml-auto flex max-w-[calc(100%-8px)] flex-col items-end justify-end gap-1 lg:mb-2 xl:mb-4 xl:max-w-[calc(100%-50px)]">
            <div className="bg-primary flex min-w-10 justify-center gap-1 rounded-2xl rounded-br-none p-2 text-white shadow-sm">
              <div className="group flex items-center gap-1">
                <div className="relative z-[1] break-normal whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ ...props }) => (
                        <a
                          {...props}
                          className="inline-block max-w-[calc(100vw-80px)] truncate italic lg:max-w-[550px]"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2 text-xs lg:text-[8px] xl:text-xs">
              {moment().format("HH:mm")}
            </div>
          </div>
        )
      ) : message.role === "ai" ? (
        message.content === "..." ? (
          <div className="group mb-4 ml-2 flex max-w-[calc(100%-8px)] flex-col items-start justify-start gap-1 space-x-2 lg:mb-2 xl:mb-4 xl:max-w-[calc(100%-50px)] rtl:space-x-reverse">
            <div className="flex min-w-10 flex-col justify-center gap-1 rounded-2xl rounded-bl-none bg-white p-2 text-black shadow-sm">
              <TypingDots />
            </div>
            <div className="flex w-full items-center gap-2 text-end text-xs lg:text-[8px] xl:text-xs">
              <span className="text-default-500">
                {moment().format("HH:mm")}
              </span>
            </div>
          </div>
        ) : (
          <div className="group mb-4 ml-2 flex max-w-[calc(100%-8px)] flex-col items-start justify-start gap-1 space-x-2 lg:mb-2 xl:mb-4 xl:max-w-[calc(100%-50px)] rtl:space-x-reverse">
            <div className="flex min-w-10 flex-col justify-center gap-1 rounded-2xl rounded-bl-none bg-white p-2 text-black shadow-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ ...props }) => (
                    <a
                      {...props}
                      className="italic"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            <div className="flex w-full items-center gap-2 text-end text-xs lg:text-[8px] xl:text-xs">
              <span className="text-default-500">
                {moment().format("HH:mm")}
              </span>
            </div>
          </div>
        )
      ) : (
        message.role === "system" && <></>
      )}
    </div>
  );
}

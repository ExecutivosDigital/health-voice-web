import { MessageProps } from "@/context/ChatContext";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  message: MessageProps;
  // className?: string;
}

export function Messages({
  message,
  // , className
}: Props) {
  const { text, entity } = message;
  // const [openImageModal, setOpenImageModal] = useState(false);
  // const { selectedModel } = useModelContext();
  // const [routeModal, setRouteModal] = useState(false);

  const cleanedText = text.replace(/ {2,}/g, " ");
  return (
    <div className="">
      {entity !== "USER" ? (
        <>
          <div className="group mb-4 ml-2 flex max-w-[calc(100%-8px)] flex-col items-start justify-start gap-1 space-x-2 lg:mb-2 xl:mb-4 xl:ml-[50px] xl:max-w-[calc(100%-50px)] rtl:space-x-reverse">
            <div className="from-primary flex min-w-10 justify-center gap-1 rounded-2xl rounded-bl-none bg-gradient-to-br to-gray-800 p-2 text-white shadow-sm">
              <div className="flex items-center gap-1">
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
                  {text}
                </ReactMarkdown>
              </div>
            </div>
            <div className="flex w-full items-center gap-2 text-end text-xs lg:text-[8px] xl:text-xs">
              <span className="text-default-500">
                <span>
                  {/* {(selectedModel && selectedModel.name) || ""} {""} */}
                </span>
                {moment().format("HH:mm")}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="group mb-4 flex max-w-[calc(100%-8px)] flex-col items-end justify-end gap-1 lg:mb-2 xl:mb-4 xl:max-w-[calc(100%-50px)]">
          <div className="from-primary flex min-w-10 justify-center gap-1 rounded-2xl rounded-br-none bg-gradient-to-b to-gray-800 p-2 text-white shadow-sm">
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
                  {cleanedText}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 text-xs lg:text-[8px] xl:text-xs">
            {moment().format("HH:mm")}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

export function ChatHeader() {
  // const { selectedModel, setSelectedModel, models } = useModelContext();

  return (
    <>
      <header className="sticky top-0 z-20 flex w-full flex-col justify-between backdrop-blur-sm xl:flex-row xl:items-center">
        <span className="w-full text-center text-3xl font-extrabold text-gray-900 xl:w-max xl:text-start">
          Converse com a Inteligência Artificial
        </span>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="from-primary to-secondary flex items-center justify-center gap-2 rounded-md bg-gradient-to-br px-4 py-2 font-semibold text-white focus:outline-none xl:w-60 xl:justify-normal">
              <span className="truncate">
                {selectedModel ? selectedModel.name : "Selecionar Modelo"}
              </span>
              <ChevronDown className="ml-auto stroke-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {models.map((model) => (
              <DropdownMenuItem
                key={model.id}
                className={cn(
                  model.id === selectedModel?.id
                    ? "from-primary to-secondary bg-gradient-to-br"
                    : "hover:bg-primary/20",
                )}
                onSelect={() => {
                  setSelectedModel(model);
                  cookies.set("selectedModel", model.id as string);
                }}
              >
                {model.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </header>
      {/* {selectedChat && openQrCode && (
        <PixSheetSteps
          open={openQrCode}
          onClose={() => setOpenQrCode(false)}
          modelId={selectedChat.model.id}
          modelName={selectedChat?.model.name}
          modelPhoto={selectedChat?.model.photoUrl}
        />
      )} */}
    </>
  );
}

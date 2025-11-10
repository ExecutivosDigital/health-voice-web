export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-full w-full flex-1 flex-col">{children}</div>;
}

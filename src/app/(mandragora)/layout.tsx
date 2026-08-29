import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import MandragoraNavbar from "./mandragora-navbar";
import MandragoraMenubar from "./mandragora-menubar";
import { ModalContextProvider } from "@/contexts/modal-context";

export default async function MandragoraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return (
    <ModalContextProvider>
      <div className="h-full grid grid-rows-[75px_1fr_75px]">
        <MandragoraMenubar />
        <main className="h-full relative flex flex-col p-lg pt-0 overflow-y-scroll scrollbar-none">
          {children}
        </main>
        <MandragoraNavbar />
      </div>
    </ModalContextProvider>
  );
}

import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import MandragoraNavbar from "./mandragora-navbar";

export default async function MandragoraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return (
    <div className="flex flex-1 flex-col justify-between">
      {children}
      <MandragoraNavbar />
    </div>
  );
}

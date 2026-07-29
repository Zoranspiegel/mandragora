// import { getServerSession } from "@/lib/get-server-session";
// import { redirect } from "next/navigation";

export default async function MandragoraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const session = await getServerSession();

  // if (!session) redirect("/login");

  return <div className="p-lg">{children}</div>;
}

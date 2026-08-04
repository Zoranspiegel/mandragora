import PlantsCards from "@/components/plants-cards";
import WarningPlants from "@/components/warning-plants";
import { getServerSession } from "@/lib/get-server-session";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl text-primary-foreground font-heading">
        Hola, {user.name}
      </h1>

      <WarningPlants />

      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold">Tus plantas</h2>
          <Link
            href="/plants"
            className="text-sm text-muted-foreground font-bold"
          >
            Ver todas
          </Link>
        </div>
        <PlantsCards />
      </div>

      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="absolute top-0 left-0 -z-10"
      >
        <circle cx="10" cy="-3" r="12" className="fill-primary" />
      </svg>
    </div>
  );
}

import { getServerSession } from "@/lib/get-server-session";

export default async function HomePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <div>
      <h1>Bienvenid@ {user.name}</h1>
    </div>
  );
}

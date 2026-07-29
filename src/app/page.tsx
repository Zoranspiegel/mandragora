import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-end p-lg overflow-hidden">
      <Image
        src="/assets/backgrounds/Mandragora bg.png"
        alt=""
        fill
        loading="eager"
        className="object-cover -z-10"
      />
      <div className="absolute top-[58%] -left-2 -right-2 flex flex-col items-center justify-center gap-2 bg-leaf shadow-lg shadow-black/40 p-lg">
        <h1 className="font-heading text-5xl">Mandragora</h1>
        <p className="font-bold">Cuida tus plantas</p>
      </div>
      <Button asChild variant="secondary" className="shadow-lg shadow-black/40">
        <Link href="/home">ENTRAR</Link>
      </Button>
    </main>
  );
}

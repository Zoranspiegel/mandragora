import Image from "next/image";

export default function CaringSuccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        src="/assets/images/plantHome.png"
        alt="mandragora"
        width={50}
        height={50}
        className="opacity-70"
      />

      <h2 className="text-xl">¡Tu planta ha sido atendida!</h2>
    </div>
  );
}

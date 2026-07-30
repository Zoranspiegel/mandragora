import Image from "next/image";
import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <main className="relative flex flex-1 items-end justify-center p-lg">
      <Image
        src="/assets/images/medieval-mandragora.png"
        alt="medieval-mandragora"
        width={230}
        height={230}
        loading="eager"
        className="absolute top-[10dvh] -z-10"
      />
      <SignupForm />
    </main>
  );
}

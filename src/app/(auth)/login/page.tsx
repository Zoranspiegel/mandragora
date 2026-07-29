import Image from "next/image";
import LoginForm from "./login-form";

export default function LoginPage() {
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
      <LoginForm />
    </main>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLink,
  FieldText,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginFields, loginSchema } from "@/lib/validations/login";
import GoogleButton from "@/components/auth/google-button";
import PasswordInput from "@/components/ui/password-input";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: LoginFields) {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
        setError("root", {
          message: "Email o contraseña inválidos",
        });
      } else {
        setError("root", {
          message:
            error.message || "Algo salió mal, por favor inténtalo de nuevo",
        });
      }
    } else {
      router.push("/home");
    }
  }

  return (
    <form noValidate className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <Input
            id="login-email"
            type="email"
            placeholder="Email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <PasswordInput
            id="login-password"
            placeholder="Contraseña"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
          <FieldText>
            <FieldLink href="/forgot-password">
              Olvidaste tu contraseña?
            </FieldLink>
          </FieldText>
        </Field>

        <Field>
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid && isSubmitted}
            variant="leaf"
          >
            Continuar
          </LoadingButton>

          <FieldText>
            ¿No tienes una cuenta?{" "}
            <FieldLink href="/signup">Registrarse</FieldLink>
          </FieldText>
        </Field>

        {errors.root && (
          <FieldError className="text-center">{errors.root.message}</FieldError>
        )}

        <div className="h-0.75 w-full flex items-center justify-center border bg-muted-foreground opacity-60">
          <div className="bg-background px-1">o</div>
        </div>

        <GoogleButton />
      </FieldGroup>
    </form>
  );
}

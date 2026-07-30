"use client";

import GoogleButton from "@/components/auth/google-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLink,
  FieldText,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import PasswordInput from "@/components/ui/password-input";
import { SignupFields, signupSchema } from "@/lib/validations/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    alert("Signed Up");
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <Input
            id="signup-name"
            type="text"
            placeholder="Nombre"
            {...register("name")}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <Input
            id="signup-email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <PasswordInput
            id="signup-password"
            placeholder="Contraseña"
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <PasswordInput
            id="signup-confirm-password"
            placeholder="Confirmar contraseña"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && (
            <FieldError>{errors.passwordConfirmation.message}</FieldError>
          )}
        </Field>
        
        <Field>
          <LoadingButton
            variant="leaf"
            disabled={!isValid && isSubmitted}
            loading={isSubmitting}
          >
            Continuar
          </LoadingButton>
          <FieldText>
            ¿Ya tienes una cuenta? <FieldLink href="/login">Ingresar</FieldLink>
          </FieldText>
        </Field>

        <div className="h-0.75 w-full flex items-center justify-center border bg-muted-foreground opacity-60">
          <div className="bg-background px-1">o</div>
        </div>

        <GoogleButton />
      </FieldGroup>
    </form>
  );
}

import { z } from "zod";
import { passwordFieldSchema } from "./password";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Por favor ingresa tu nombre de usuario" }),
    email: z.email({ message: "Por favor ingresa un email válido" }),
    password: passwordFieldSchema,
    passwordConfirmation: z
      .string()
      .min(1, { message: "Por favor confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  });

export type SignupFields = z.infer<typeof signupSchema>;

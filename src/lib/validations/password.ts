import z from "zod";

export const passwordFieldSchema = z
  .string()
  .min(1, { message: "Por favor crea una contraseña" })
  .min(8, { message: "Tu contraseña debe tener mínimo 8 caracteres" })
  .regex(/^\S*$/, "Tu contraseña no debe tener espacios")
  .regex(/[a-z]/, "Tu contraseña debe tener al menos una letra en minúscula")
  .regex(/[A-Z]/, "Tu contraseña debe tener al menos una letra en mayúscula")
  .regex(/\d/, "Tu contraseña debe tener al menos un número")
  .regex(/[^A-Za-z0-9]/, {
    message:
      "Tu contraseña debe tener al menos un caracter especial ($,#,?,etc.)",
  });

export const resetPasswordFieldsSchema = z
  .object({
    newPassword: passwordFieldSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordFields = z.infer<typeof resetPasswordFieldsSchema>;

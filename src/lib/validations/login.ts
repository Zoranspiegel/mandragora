import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Por favor ingresa un email válido" }),
  password: z.string().min(1, { message: "Por ingresa tu contraseña" }),
  // rememberMe: z.boolean(),
});

export type LoginFields = z.infer<typeof loginSchema>;

import { z } from "zod";
import { tagInputSchema } from "./tags";
import { LocationType } from "@/../generated/prisma/enums";

export const plantLocationTypes = Object.values(LocationType);

const plantInputBaseSchema = z.object({
  name: z.string().min(2, "El nombre debe ser de al menos 2 caracteres."),
  scientific: z
    .string()
    .min(2, "El nombre científico debe ser de al menos 2 caracteres."),
  location_place: z
    .string()
    .min(2, "La ubicación de tu planta debe contener al menos 2 caracteres."),
  location_type: z.enum(plantLocationTypes),
  under_rain: z.boolean(),
  watering: z
    .number()
    .min(1, "Debe ser un número entre 1 y 365.")
    .max(365, "Debe ser un número entre 1 y 365."),
  waterings: z
    .array(z.string())
    .min(
      1,
      "Debes establecer la fecha de su último riego. ¡Podría ser hoy mismo!",
    ),
  need_fertilizer: z.boolean(),
  fertilization: z
    .number()
    .min(0, "Debe ser un número entre 1 y 365.")
    .max(365, "Debe ser un número entre 1 y 365."),
  fertilizations: z.array(z.string()),
  tags: z.array(tagInputSchema),
  imageFile: z.object({
    name: z.string(),
    file: z.string().min(1, "Necesitas una foto de tu planta."),
  }),
});

export const plantInputSchema = plantInputBaseSchema.superRefine(
  (data, ctx) => {
    const hasFrequency = data.fertilization > 0;
    const hasDates = data.fertilizations.length > 0;

    if (data.need_fertilizer && !hasDates) {
      ctx.addIssue({
        code: "custom",
        message:
          "Debes establecer la fecha de su última fertilización. ¡Podría ser hoy mismo!",
        path: ["fertilizations"],
      });
    }

    if (data.need_fertilizer && !hasFrequency) {
      ctx.addIssue({
        code: "custom",
        message: "Debes establecer una frecuencia de fertilización.",
        path: ["fertilization"],
      });
    }
  },
);

export const plantEditInfoSchema = plantInputBaseSchema
  .pick({
    name: true,
    scientific: true,
    location_type: true,
    location_place: true,
    under_rain: true,
    watering: true,
    waterings: true,
    need_fertilizer: true,
    fertilization: true,
    fertilizations: true,
  })
  .superRefine((data, ctx) => {
    const hasFrequency = data.fertilization > 0;
    const hasDates = data.fertilizations.length > 0;

    if (data.need_fertilizer && !hasDates) {
      ctx.addIssue({
        code: "custom",
        message:
          "Debes establecer la fecha de su última fertilización. ¡Podría ser hoy mismo!",
        path: ["fertilizations"],
      });
    }

    if (data.need_fertilizer && !hasFrequency) {
      ctx.addIssue({
        code: "custom",
        message: "Debes establecer una frecuencia de fertilización.",
        path: ["fertilization"],
      });
    }
  });

export type CreatePlant = z.infer<typeof plantInputSchema>;

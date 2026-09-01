"use client";

import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import NumberFormInput from "@/components/number-form-input";
import ToggleFormBtns from "@/components/toggle-form-btns";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldHorizontal,
  FieldText,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  CreatePlant,
  plantInputSchema,
  plantLocationTypes,
} from "@/lib/validations/add-plant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import imgCompression from "browser-image-compression";
import { Camera } from "lucide-react";
import Image from "next/image";

const formInitialState: CreatePlant = {
  name: "",
  scientific: "",
  location_place: "",
  location_type: "INTERIOR",
  under_rain: false,
  watering: 0,
  waterings: [],
  need_fertilizer: false,
  fertilization: 0,
  fertilizations: [],
  tags: [],
  imageFile: {
    file: "",
    name: "",
  },
};

const formInitialStateM: CreatePlant = {
  name: "Planta",
  scientific: "Plantus",
  location_place: "Balcón",
  location_type: "INTERIOR",
  under_rain: false,
  watering: 3,
  waterings: [new Date().toISOString()],
  need_fertilizer: false,
  fertilization: 0,
  fertilizations: [],
  tags: [],
  imageFile: {
    file: "",
    name: "",
  },
};

export default function AddPlantForm() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    trigger,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<CreatePlant>({
    defaultValues: formInitialStateM,
    resolver: zodResolver(plantInputSchema),
  });

  const need_fertilizer = useWatch({ control, name: "need_fertilizer" });
  const imgFile = useWatch({ control, name: "imageFile" });

  async function onSubmit(data: CreatePlant) {
    console.log(data);
  }

  async function handleDateChange<
    ValuesT extends FieldValues,
    NameT extends Path<ValuesT>,
  >(
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<ValuesT, NameT>,
  ) {
    if (e.target.value) {
      const [year, month, day] = e.target.value.split("-").map(Number);
      const date = new Date(year, month - 1, day).toISOString();

      field.onChange([date]);
    } else {
      field.onChange([]);
    }
  }

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const compressedImg = await imgCompression(file, {
      maxSizeMB: 4,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      if (typeof base64String === "string") {
        setValue("imageFile.name", file.name, { shouldValidate: true });
        setValue("imageFile.file", base64String, { shouldValidate: true });
      }
    };

    reader.readAsDataURL(compressedImg);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NOMBRE */}
      <FieldGroup>
        <Field>
          <Input {...register("name")} placeholder="Nombre" />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        {/* NOMBRE_CIENTIFICO */}
        <Field>
          <Input {...register("scientific")} placeholder="Nombre científico" />
          {errors.scientific && (
            <FieldError>{errors.scientific.message}</FieldError>
          )}
        </Field>

        {/* UBICACION */}
        <Field>
          <FieldHorizontal>
            {/* LUGAR */}
            <Input {...register("location_place")} placeholder="Ubicación" />

            {/* TIPO */}
            <Controller
              name="location_type"
              control={control}
              render={({ field }) => (
                <ToggleFormBtns
                  values={plantLocationTypes}
                  activeValue={field.value}
                  handleValue={field.onChange}
                />
              )}
            />
          </FieldHorizontal>

          {errors.location_place && (
            <FieldError>{errors.location_place.message}</FieldError>
          )}
        </Field>

        {/* RAIN */}
        <Field>
          <FieldHorizontal>
            <FieldText size="lg">¿Tu planta recibe agua de lluvia?</FieldText>
            <Controller
              control={control}
              name="under_rain"
              render={({ field }) => (
                <ToggleFormBtns
                  activeValue={field.value}
                  handleValue={field.onChange}
                />
              )}
            />
          </FieldHorizontal>
        </Field>

        {/* RIEGO */}
        <Field>
          <FieldHorizontal>
            <FieldText size="lg">
              Riego cada
              <Controller
                control={control}
                name="watering"
                render={({ field }) => (
                  <NumberFormInput
                    value={field.value}
                    handleNumber={field.onChange}
                  />
                )}
              />
              días
            </FieldText>
          </FieldHorizontal>

          {errors.watering && (
            <FieldError>{errors.watering.message}</FieldError>
          )}
        </Field>

        {/* ULTIMO_RIEGO */}
        <Field>
          <FieldHorizontal>
            <FieldText size="lg">Último riego</FieldText>
            <Controller
              control={control}
              name="waterings"
              render={({ field }) => {
                return (
                  <Input
                    type="date"
                    onChange={(e) => handleDateChange(e, field)}
                  />
                );
              }}
            />
          </FieldHorizontal>

          {errors.waterings && (
            <FieldError>{errors.waterings.message}</FieldError>
          )}
        </Field>

        {/* NECESITA_FERTILIZACION */}
        <Field>
          <FieldHorizontal>
            <FieldText size="lg">¿Tu planta recibe fertilización?</FieldText>
            <ToggleFormBtns
              activeValue={need_fertilizer}
              handleValue={(value) => {
                if (typeof value === "boolean") {
                  setValue("need_fertilizer", value, { shouldValidate: true });

                  if (value === true && isSubmitted) {
                    trigger(["fertilization", "fertilizations"]);
                  }
                }
              }}
            />
          </FieldHorizontal>
        </Field>

        {need_fertilizer && (
          <>
            {/* FERTILIZACION */}
            <Field>
              <FieldHorizontal>
                <FieldText size="lg">
                  Fertilización cada
                  <Controller
                    control={control}
                    name="fertilization"
                    render={({ field }) => (
                      <NumberFormInput
                        value={field.value}
                        handleNumber={field.onChange}
                      />
                    )}
                  />
                  días
                </FieldText>
              </FieldHorizontal>

              {errors.fertilization && (
                <FieldError>{errors.fertilization.message}</FieldError>
              )}
            </Field>

            {/* ULTIMA_FERTILIZACION */}
            <Field>
              <FieldHorizontal>
                <FieldText size="lg">Última fertilización</FieldText>
                <Controller
                  control={control}
                  name="fertilizations"
                  render={({ field }) => (
                    <Input
                      type="date"
                      onChange={(e) => handleDateChange(e, field)}
                    />
                  )}
                />
              </FieldHorizontal>

              {errors.fertilizations && (
                <FieldError>{errors.fertilizations.message}</FieldError>
              )}
            </Field>
          </>
        )}

        {/* FOTO */}
        <Field className="mt-4 items-center">
          <label htmlFor="imgUploader">
            <div className="relative w-20 aspect-square flex items-center justify-center rounded-full bg-accent cursor-pointer overflow-hidden ring-4 ring-leaf text-leaf">
              {imgFile.file ? (
                <Image src={imgFile.file} alt={imgFile.name} fill />
              ) : (
                <Camera size={30} />
              )}
            </div>
          </label>

          <input
            id="imgUploader"
            type="file"
            className="hidden"
            onChange={handleUploadImage}
          />

          <FieldText size="lg">Agregar foto</FieldText>

          {errors.imageFile?.file && (
            <FieldError>{errors.imageFile?.file.message}</FieldError>
          )}
        </Field>

        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid && isSubmitted}
          type="submit"
          variant="secondary"
        >
          Agregar
        </LoadingButton>

        {errors.root && <FieldError>{errors.root.message}</FieldError>}
        {errors.form && <FieldError>{errors.form.message}</FieldError>}
      </FieldGroup>
    </form>
  );
}

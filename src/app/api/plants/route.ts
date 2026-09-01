import type { NewImage } from "@/types";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { plantInputSchema } from "@/lib/validations/add-plant";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { env } from "@/env";
import { createNextDate } from "@/lib/create-next-date";

cloudinary.config({
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
});

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { headers } = request;
    const session = await auth.api.getSession({ headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;

    const plants = await prisma.plant.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json(plants, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { headers } = request;
    const session = await auth.api.getSession({ headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;

    const body = await request.json();

    const zodResponse = plantInputSchema.safeParse(body);

    if (!zodResponse.success) {
      throw new Error("Invalid data or missing form fields");
    }

    const newPlant = zodResponse.data;

    const foundPlant = await prisma.plant.findFirst({
      where: {
        user_id,
        name: newPlant.name,
      },
      select: {
        id: true,
      },
    });

    if (foundPlant) {
      return NextResponse.json(
        { error: "Plant name already in use", path: "name" },
        { status: 400 },
      );
    }

    const image_name = newPlant.imageFile.name
      .split(".")
      .slice(0, -1)
      .join(".");
    const newImage: NewImage = {
      img: "",
      img_width: 0,
      img_height: 0,
    };

    try {
      const result = await cloudinary.uploader.upload(newPlant.imageFile.file, {
        public_id: image_name,
        folder: env.CLOUDINARY_FOLDER,
      });

      newImage.img = result.secure_url;
      newImage.img_width = result.width;
      newImage.img_height = result.height;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload image to cloudinary");
    }

    const next_watering = createNextDate(newPlant.watering, newPlant.waterings);
    const next_fertilization =
      newPlant.fertilizations.length > 0
        ? createNextDate(newPlant.fertilization, newPlant.fertilizations)
        : null;

    const createdPlant = await prisma.plant.create({
      data: {
        user_id,
        name: newPlant.name,
        scientific: newPlant.scientific,
        location_place: newPlant.location_place,
        location_type: newPlant.location_type,
        under_rain: newPlant.under_rain,
        watering: newPlant.watering,
        waterings: newPlant.waterings,
        next_watering,
        fertilization: newPlant.fertilization,
        fertilizations: newPlant.fertilizations,
        next_fertilization,
        img: newImage.img,
        img_width: newImage.img_width,
        img_height: newImage.img_height,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      { msg: "Plant successfully created", data: createdPlant },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

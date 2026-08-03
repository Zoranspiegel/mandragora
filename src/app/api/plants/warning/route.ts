import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { WarningPlant } from "@/types";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { headers } = request;
    const session = await auth.api.getSession({ headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;

    const today = new Date();
    const todayDate = today.getDate();
    const tomorrow = today;
    tomorrow.setDate(todayDate + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const [wateringWarningPlants, fertilizationWarningPlants] =
      await Promise.all([
        prisma.plant.findMany({
          where: {
            user_id,
            next_watering: {
              lt: tomorrow,
            },
          },
          select: {
            id: true,
            name: true,
            scientific: true,
            img: true,
            next_watering: true,
            next_fertilization: true,
          },
        }),

        prisma.plant.findMany({
          where: {
            user_id,
            next_fertilization: {
              not: null,
              lt: tomorrow,
            },
          },
          select: {
            id: true,
            name: true,
            scientific: true,
            img: true,
            next_watering: true,
            next_fertilization: true,
          },
        }),
      ]);

    const warningPlantsMap = new Map<string, WarningPlant>();

    for (const plant of wateringWarningPlants) {
      const { next_watering, next_fertilization, ...rest } = plant;

      let urgency: Date;

      if (!next_fertilization) {
        urgency = next_watering;
      } else {
        urgency =
          next_watering < next_fertilization
            ? next_watering
            : next_fertilization;
      }

      warningPlantsMap.set(plant.id, { ...rest, urgency, needs: ["regar"] });
    }

    for (const plant of fertilizationWarningPlants) {
      if (warningPlantsMap.has(plant.id)) {
        warningPlantsMap.get(plant.id)?.needs.push("fertilizar");
      } else {
        const { next_watering, next_fertilization, ...rest } = plant;

        if (!next_fertilization) throw new Error("Unexpected error");

        const urgency =
          next_watering < next_fertilization
            ? next_watering
            : next_fertilization;

        warningPlantsMap.set(plant.id, {
          ...rest,
          urgency,
          needs: ["fertilizar"],
        });
      }
    }

    const warningPlants = Array.from(warningPlantsMap.values()).sort(
      (a, b) => a.urgency.getTime() - b.urgency.getTime(),
    );

    return NextResponse.json(warningPlants, { status: 200 });
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

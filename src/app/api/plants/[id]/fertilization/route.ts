import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { headers } = request;
    const session = await auth.api.getSession({ headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;

    const { id } = await params;

    const foundPlant = await prisma.plant.findUnique({
      where: {
        user_id,
        id,
      },
    });

    if (!foundPlant) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    const fertilizations = [...foundPlant.fertilizations, new Date()];
    const next_fertilization = new Date(
      new Date().getTime() + foundPlant.fertilization * 1000 * 60 * 60 * 24,
    );

    await prisma.plant.update({
      where: {
        user_id,
        id,
      },
      data: {
        fertilizations,
        next_fertilization,
      },
    });

    return NextResponse.json(
      { msg: "Plant successfully fertilized" },
      { status: 200 },
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

import { prisma } from "@/lib/prisma";
import { LocationType } from "../generated/prisma/client";

const dayTime = 1000 * 60 * 60 * 24;
const mockDate = new Date("2026-07-30 05:00:00");
function mockNextDate(days: number): Date {
  return new Date(mockDate.getTime() + dayTime * days);
}

const USER_ID = "engSB0qWdIG4FnvzOvdsCdmBZqHYwspj";

async function main() {
  // DELETE_PREVIOUS_DATA
  await prisma.note.deleteMany({
    where: {
      plant: {
        user_id: USER_ID,
      },
    },
  });

  await prisma.tag.deleteMany({
    where: {
      user_id: USER_ID,
    },
  });

  await prisma.plant.deleteMany({
    where: {
      user_id: USER_ID,
    },
  });

  // SEED_NEW_DATA
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        user_id: USER_ID,
        name: "Semisombra",
        color: "#3B82F6",
      },
    }),
    prisma.tag.create({
      data: {
        user_id: USER_ID,
        name: "Buen Drenaje",
        color: "#10B981",
      },
    }),
    prisma.tag.create({
      data: {
        user_id: USER_ID,
        name: "Floración",
        color: "#EC4899",
      },
    }),
    prisma.tag.create({
      data: {
        user_id: USER_ID,
        name: "Sombra",
        color: "#6B7280",
      },
    }),
    prisma.tag.create({
      data: {
        user_id: USER_ID,
        name: "Luz Directa",
        color: "#F59E0B",
      },
    }),
  ]);

  const [semisombra, buen_drenaje, floracion, sombra, luz_directa] = tags;

  await prisma.plant.create({
    data: {
      user_id: USER_ID,
      name: "Caracola Roja",
      scientific: "Iresine herbstii",
      img: "https://res.cloudinary.com/dkc8xrlg8/image/upload/v1762431011/Mandragora/Images/17624307705658814898756186252759.jpg",
      img_width: 450,
      img_height: 600,
      location_place: "Habitación",
      location_type: LocationType.INTERIOR,
      under_rain: false,
      watering: 3,
      waterings: [mockDate],
      next_watering: mockNextDate(3),
      fertilization: 15,
      fertilizations: [mockDate],
      next_fertilization: mockNextDate(15),
      tags: {
        connect: [{ id: semisombra.id }, { id: buen_drenaje.id }],
      },
      notes: {
        create: [
          {
            content: "Tiene una hoja nueva en crecimiento.",
          },
          {
            content: "Rotar la maceta cada dos semanas.",
          },
        ],
      },
    },
  });

  await prisma.plant.create({
    data: {
      user_id: USER_ID,
      name: "Espada de San Jorge",
      scientific: "Sansevieria",
      img: "https://res.cloudinary.com/dkc8xrlg8/image/upload/v1762431573/Mandragora/Images/17624313917505268055137494004625.jpg",
      img_width: 450,
      img_height: 600,
      location_place: "Pasillo",
      location_type: LocationType.INTERIOR,
      under_rain: false,
      watering: 2,
      waterings: [mockDate],
      next_watering: mockNextDate(2),
      fertilization: 10,
      fertilizations: [mockDate],
      next_fertilization: mockNextDate(10),
      tags: {
        connect: [{ id: luz_directa.id }, { id: floracion.id }],
      },
      notes: {
        create: [
          {
            content: "No regar hasta que el sustrato esté completamente seco.",
          },
          {
            content: "Recibe luz indirecta brillante.",
          },
        ],
      },
    },
  });

  await prisma.plant.create({
    data: {
      user_id: USER_ID,
      name: "Cerimán",
      scientific: "Monstera Deliciosa",
      img: "https://res.cloudinary.com/dkc8xrlg8/image/upload/v1762431573/Mandragora/Images/17624313917505268055137494004625.jpg",
      img_width: 450,
      img_height: 600,
      location_place: "Balcón",
      location_type: LocationType.EXTERIOR,
      under_rain: false,
      watering: 4,
      waterings: [mockDate],
      next_watering: mockNextDate(4),
      fertilization: 17,
      fertilizations: [mockDate],
      next_fertilization: mockNextDate(17),
      tags: {
        connect: [{ id: sombra.id }, { id: buen_drenaje.id }],
      },
      notes: {
        create: [
          {
            content: "Eliminar flores marchitas.",
          },
          {
            content: "Floreciendo abundantemente.",
          },
        ],
      },
    },
  });

  await prisma.plant.create({
    data: {
      user_id: USER_ID,
      name: "Flor de amor",
      scientific: "Celosia Argentea",
      img: "https://res.cloudinary.com/dkc8xrlg8/image/upload/v1762374036/Mandragora/Images/IMG20250301205227.jpg",
      img_width: 450,
      img_height: 600,
      location_place: "Jardín",
      location_type: LocationType.EXTERIOR,
      under_rain: true,
      watering: 4,
      waterings: [mockDate],
      next_watering: mockNextDate(4),
      fertilization: 17,
      fertilizations: [mockDate],
      next_fertilization: mockNextDate(17),
      tags: {
        connect: [{ id: luz_directa.id }, { id: floracion.id }],
      },
      notes: {
        create: [
          {
            content: "Las hojas se ven firmes y saludables.",
          },
          {
            content: "Aumentar la exposición al sol gradualmente.",
          },
        ],
      },
    },
  });

  console.log("🌱 Seed completado.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

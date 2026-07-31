import Link from "next/link";
import type { Plant } from "../../generated/prisma/client";
import { Card, CardImage } from "./ui/card";

export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link href={`/details/${plant.id}`}>
      <Card size="sm">
        <CardImage src={plant.img} alt={plant.name} />
        <div>
          <h2 className="text-md font-bold">{plant.name}</h2>
          <h3 className="text-sm">{plant.scientific}</h3>
        </div>
      </Card>
    </Link>
  );
}

import { pickContrastedFontColor } from "@/lib/pickContrastedFontColor";
import { Tag } from "../../generated/prisma/client";
import { Card, CardContent } from "./ui/card";

export default function PlantTags({ tags }: { tags: Tag[] }) {
  return (
    <Card>
      <CardContent className="flex-row">
        {tags.map((tag) => (
          <PlantTag key={tag.id} color={tag.color} name={tag.name} />
        ))}
      </CardContent>
    </Card>
  );
}

function PlantTag({ color, name }: { color: string; name: string }) {
  return (
    <div
      style={{ backgroundColor: color, color: pickContrastedFontColor(color) }}
      className="rounded-full px-2 text-md font-bold"
    >
      {name}
    </div>
  );
}

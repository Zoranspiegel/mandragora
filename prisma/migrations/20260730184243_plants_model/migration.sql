-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientific" TEXT,
    "img" TEXT NOT NULL,
    "img_width" INTEGER NOT NULL,
    "img_height" INTEGER NOT NULL,
    "watering" INTEGER NOT NULL,
    "waterings" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "next_watering" TIMESTAMP(3),
    "fertilization" INTEGER NOT NULL,
    "fertilizations" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "next_fertilization" TIMESTAMP(3),
    "location_type" TEXT,
    "location_place" TEXT,
    "under_rain" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Plant_user_id_idx" ON "Plant"("user_id");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

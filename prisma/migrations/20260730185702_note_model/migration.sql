-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "plant_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Note_plant_id_idx" ON "Note"("plant_id");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

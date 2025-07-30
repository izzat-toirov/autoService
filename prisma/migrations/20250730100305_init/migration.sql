/*
  Warnings:

  - You are about to drop the column `regionid` on the `district` table. All the data in the column will be lost.
  - Added the required column `region_id` to the `district` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "district" DROP CONSTRAINT "district_regionid_fkey";

-- AlterTable
ALTER TABLE "district" DROP COLUMN "regionid",
ADD COLUMN     "region_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

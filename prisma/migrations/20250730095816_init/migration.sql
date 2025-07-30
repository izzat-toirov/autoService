-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "plate_number" INTEGER NOT NULL,
    "vin_number" INTEGER NOT NULL,
    "model" VARCHAR NOT NULL,
    "year" VARCHAR NOT NULL,
    "current_owner_id" INTEGER NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_history" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "buyed_at" VARCHAR NOT NULL,
    "sold_at" VARCHAR NOT NULL,

    CONSTRAINT "car_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "regionid" INTEGER NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_current_owner_id_fkey" FOREIGN KEY ("current_owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_history" ADD CONSTRAINT "car_history_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_history" ADD CONSTRAINT "car_history_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_regionid_fkey" FOREIGN KEY ("regionid") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

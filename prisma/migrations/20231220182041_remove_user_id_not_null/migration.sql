-- prisma/migrations/20231220182041_remove_user_id_not_null.sql

-- Remove a restrição NOT NULL da coluna user_id em orders
ALTER TABLE "orders"
ALTER COLUMN "user_id" DROP NOT NULL;

ALTER TABLE "User"
  ALTER COLUMN "roles" TYPE "Role"
  USING ("roles"::text::"Role");

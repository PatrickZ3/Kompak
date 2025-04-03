-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verificationToken" TEXT,
ALTER COLUMN "verified" SET DEFAULT false;

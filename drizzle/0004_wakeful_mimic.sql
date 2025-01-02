CREATE TYPE "public"."role" AS ENUM('admin', 'drop');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'drop';
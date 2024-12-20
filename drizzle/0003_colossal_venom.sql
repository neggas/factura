CREATE TYPE "public"."status" AS ENUM('paid', 'pending', 'lost');--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "status" "status" DEFAULT 'pending' NOT NULL;
CREATE TABLE "invoices" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"comment" text,
	"invoice" varchar(255) NOT NULL,
	"due_date" date NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"rib" varchar(255) NOT NULL,
	"bank" varchar(255) NOT NULL,
	"drop_name" varchar(255) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);

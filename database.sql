CREATE TABLE "task_list" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255),
    "date_made" DATE,
    "status" BOOLEAN DEFAULT false
);
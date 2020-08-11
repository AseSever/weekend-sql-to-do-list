CREATE TABLE "task_list" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255),
    "date_made" DATE DEFAULT NOW(),
    "status" BOOLEAN DEFAULT false
);

INSERT INTO "task_list" ("task", "notes", "date_made")
VALUES ('Clean living room', 'Its been two weeks', '8-8-2020');
INSERT INTO "task_list" ("task", "notes", "date_made")
VALUES ('Get Groceries', 'Almost out of Food', '8-5-2020');
INSERT INTO "task_list" ("task", "notes", "date_made")
VALUES ('Go pick up new TV', 'Its for the movies', '8-6-2020');
INSERT INTO "task_list" ("task", "notes", "date_made")
VALUES ('Sewing', 'Makin masks', '8-9-2020');
INSERT INTO "task_list" ("task", "notes", "date_made")
VALUES ('Go for a run', 'Daily excersize', '8-9-2020');
INSERT INTO "task_list" ("task", "notes", "date_made")
VALUES ('Dance Party', 'Time for Fun', '8-9-2020');
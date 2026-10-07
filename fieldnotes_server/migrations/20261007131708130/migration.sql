BEGIN;

--
-- Function: gen_random_uuid_v7()
-- Source: https://gist.github.com/kjmph/5bd772b2c2df145aa645b837da7eca74
-- License: MIT (copyright notice included on the generator source code).
--
create or replace function gen_random_uuid_v7()
returns uuid
as $$
begin
  -- use random v4 uuid as starting point (which has the same variant we need)
  -- then overlay timestamp
  -- then set version 7 by flipping the 2 and 1 bit in the version 4 string
  return encode(
    set_bit(
      set_bit(
        overlay(uuid_send(gen_random_uuid())
                placing substring(int8send(floor(extract(epoch from clock_timestamp()) * 1000)::bigint) from 3)
                from 1 for 6
        ),
        52, 1
      ),
      53, 1
    ),
    'hex')::uuid;
end
$$
language plpgsql
volatile;

--
-- ACTION CREATE TABLE
--
CREATE TABLE "note" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid_v7(),
    "userId" uuid NOT NULL,
    "title" text NOT NULL DEFAULT ''::text,
    "body" text NOT NULL DEFAULT ''::text,
    "revision" bigint NOT NULL DEFAULT 1,
    "deleted" boolean NOT NULL DEFAULT false,
    "seq" bigint NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL
);

-- Indexes
CREATE INDEX "note_user_seq_idx" ON "note" USING btree ("userId", "seq");

--
-- ACTION CREATE TABLE
--
CREATE TABLE "photo" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid_v7(),
    "userId" uuid NOT NULL,
    "noteId" uuid NOT NULL,
    "mimeType" text NOT NULL,
    "byteSize" bigint NOT NULL,
    "storagePath" text NOT NULL,
    "uploaded" boolean NOT NULL DEFAULT false,
    "deleted" boolean NOT NULL DEFAULT false,
    "seq" bigint,
    "createdAt" timestamp without time zone NOT NULL
);

-- Indexes
CREATE INDEX "photo_user_seq_idx" ON "photo" USING btree ("userId", "seq");
CREATE INDEX "photo_note_idx" ON "photo" USING btree ("noteId");

--
-- ACTION CREATE TABLE
--
CREATE TABLE "sync_counter" (
    "id" bigserial PRIMARY KEY,
    "userId" uuid NOT NULL,
    "value" bigint NOT NULL DEFAULT 0
);

-- Indexes
CREATE UNIQUE INDEX "sync_counter_user_idx" ON "sync_counter" USING btree ("userId");


--
-- MIGRATION VERSION FOR fieldnotes
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('fieldnotes', '20261007131708130', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20261007131708130', "timestamp" = now();

--
-- MIGRATION VERSION FOR serverpod
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('serverpod', '20260824182259319', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20260824182259319', "timestamp" = now();

--
-- MIGRATION VERSION FOR serverpod_auth_idp
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('serverpod_auth_idp', '20260924105404509', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20260924105404509', "timestamp" = now();

--
-- MIGRATION VERSION FOR serverpod_auth_core
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('serverpod_auth_core', '20260924105232991', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20260924105232991', "timestamp" = now();


COMMIT;

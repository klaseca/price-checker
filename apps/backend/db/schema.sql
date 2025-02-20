CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(128) primary key);
CREATE TABLE product (
    id integer primary key,
    name text not null,
    url text not null,
    cron text not null,
    job_status text not null check (job_status in ('run', 'stop')),
    updated_at text not null check (
        updated_at is strftime ('%Y-%m-%dT%H:%M:%fZ', updated_at)
    ) default (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
    created_at text not null check (
        created_at is strftime ('%Y-%m-%dT%H:%M:%fZ', created_at)
    ) default (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now'))
) strict;
CREATE TRIGGER tg_product_updated_at_update after
update on product for each row begin
update product
set
    updated_at = strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')
where
    id = old.id;

end;
CREATE TABLE product_history (
    product_id integer not null,
    price integer not null,
    checked_at text not null check (
        checked_at is strftime ('%Y-%m-%dT%H:%M:%fZ', checked_at)
    ),
    primary key (product_id, checked_at),
    foreign key (product_id) references product (id) on delete cascade
) strict;
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20250125164818');

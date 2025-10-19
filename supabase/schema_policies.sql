-- Recreate RLS policies safely (idempotent-friendly)
-- Run this after base tables exist and RLS is enabled

-- PROFILES
drop policy if exists "Profiles are viewable by owner" on public.profiles;
drop policy if exists "Profiles are insertable by owner" on public.profiles;
drop policy if exists "Profiles are updatable by owner" on public.profiles;

create policy "Profiles are viewable by owner" on public.profiles
  for select using (auth.uid() = id);

create policy "Profiles are insertable by owner" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Profiles are updatable by owner" on public.profiles
  for update using (auth.uid() = id);

-- ORDERS
drop policy if exists "Orders are viewable by owner" on public.orders;
drop policy if exists "Orders are insertable by owner" on public.orders;

create policy "Orders are viewable by owner" on public.orders
  for select using (auth.uid() = user_id);

create policy "Orders are insertable by owner" on public.orders
  for insert with check (auth.uid() = user_id);

-- PRODUCTS (readable by all; writes via service role)
drop policy if exists "Products are selectable for all" on public.products;

create policy "Products are selectable for all" on public.products
  for select using (true);

-- Optional: prepare enum migration helpers (manual run in SQL editor)
-- Example to create enum and migrate existing values:
-- do $$
-- begin
--   if not exists (select 1 from pg_type where typname = 'product_category') then
--     create type public.product_category as enum ('topup','esim','entertainment','shopping','gamecards','food','travel','giftcard');
--   end if;
-- end $$;
-- alter table public.products alter column category type public.product_category using category::public.product_category;

-- NEWSLETTERS (anyone can insert their email)
drop policy if exists "Newsletter insert for all" on public.newsletters;

create policy "Newsletter insert for all" on public.newsletters
  for insert with check (true);



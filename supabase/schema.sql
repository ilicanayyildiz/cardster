-- Profiles table (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user',
  name text,
  birthdate date,
  phone text,
  created_at timestamp with time zone default now()
);

-- Auto-create profile row when a new auth user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  amounts integer[] not null,
  active boolean not null default true,
  created_at timestamp with time zone default now()
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete set null,
  product_slug text not null references public.products(slug),
  amount integer not null,
  status text not null default 'paid',
  created_at timestamp with time zone default now()
);

-- Add code column to store delivered code (masked in UI). Safe if already exists.
alter table if exists public.orders add column if not exists code text;
alter table if exists public.orders add column if not exists category text;

-- Newsletter subscriptions
create table if not exists public.newsletters (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.products enable row level security;
alter table public.newsletters enable row level security;

-- Profiles: users can manage their own
create policy "Profiles are viewable by owner" on public.profiles for select using (auth.uid() = id);
create policy "Profiles are insertable by owner" on public.profiles for insert with check (auth.uid() = id);
create policy "Profiles are updatable by owner" on public.profiles for update using (auth.uid() = id);

-- Orders: users can see their own orders
create policy "Orders are viewable by owner" on public.orders for select using (auth.uid() = user_id);
create policy "Orders are insertable by owner" on public.orders for insert with check (auth.uid() = user_id);

-- Products: readable by anyone; writes via service role only
create policy "Products are selectable for all" on public.products for select using (true);

-- Newsletters: anyone can insert their email; select restricted
create policy "Newsletter insert for all" on public.newsletters for insert with check (true);



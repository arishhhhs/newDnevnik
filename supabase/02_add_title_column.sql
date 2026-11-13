-- Run this in Supabase SQL Editor if mood_entries was created
-- using the earlier setup script. Existing rows are preserved.
alter table public.mood_entries
add column if not exists title text not null default '';

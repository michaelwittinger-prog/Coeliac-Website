-- Migration: Create admin_users table for managing admin access
-- Run this SQL in Supabase Dashboard → SQL Editor

-- 1. Create the admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  added_by text,
  created_at timestamptz DEFAULT now()
);

-- 2. Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- 3. Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies - Only service role can modify, but admins can read
CREATE POLICY "Service role can manage admin_users"
  ON public.admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Grant select to authenticated users (so admins can see admin list)
GRANT SELECT ON public.admin_users TO authenticated;

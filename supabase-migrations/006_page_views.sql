-- Migration: Create page_views table for internal analytics tracking
-- Run this SQL in Supabase Dashboard → SQL Editor

-- 1. Create the page_views table
CREATE TABLE IF NOT EXISTS public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  user_agent text,
  country text,
  created_at timestamptz DEFAULT now()
);

-- 2. Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path_date ON public.page_views(path, created_at);

-- 3. Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies - Only service role can read/write (admin access only)
CREATE POLICY "Service role can manage page_views"
  ON public.page_views
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Allow anonymous inserts for tracking (but not reads)
CREATE POLICY "Anyone can insert page views"
  ON public.page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 6. Create a function to clean old page views (optional, run periodically)
CREATE OR REPLACE FUNCTION clean_old_page_views()
RETURNS void AS $$
BEGIN
  DELETE FROM public.page_views WHERE created_at < now() - interval '90 days';
END;
$$ LANGUAGE plpgsql;

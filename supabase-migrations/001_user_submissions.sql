-- User Submissions Table and RLS Policies for coeliac.co
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Create the user_submissions table
CREATE TABLE IF NOT EXISTS public.user_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamp with time zone DEFAULT now(),
  reviewed_at timestamp with time zone,
  reviewed_by uuid REFERENCES auth.users(id)
);

-- 2. Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_submissions_user_id ON public.user_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_status ON public.user_submissions(status);

-- 3. Enable Row Level Security
ALTER TABLE public.user_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Create a function to check if user is admin
-- This checks against a comma-separated list of admin emails in app_settings
-- First, create app_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.app_settings (
  key text PRIMARY KEY,
  value text NOT NULL
);

-- Insert admin emails setting (update this with your actual admin emails)
-- You can update this later via Supabase Dashboard
INSERT INTO public.app_settings (key, value) 
VALUES ('admin_emails', '')
ON CONFLICT (key) DO NOTHING;

-- Create the admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_list text;
  user_email text;
BEGIN
  -- Get the current user's email
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = auth.uid();
  
  -- Get the admin emails list
  SELECT value INTO admin_list
  FROM public.app_settings
  WHERE key = 'admin_emails';
  
  -- Check if user's email is in the admin list
  IF admin_list IS NOT NULL AND admin_list != '' THEN
    RETURN user_email = ANY(string_to_array(admin_list, ','));
  END IF;
  
  RETURN false;
END;
$$;

-- 5. RLS Policies

-- Policy: Authenticated users can insert their own submissions
CREATE POLICY "Users can insert own submissions"
  ON public.user_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policy: Users can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON public.user_submissions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy: Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON public.user_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin() = true);

-- Policy: Admins can update submissions (for approval/rejection)
CREATE POLICY "Admins can update submissions"
  ON public.user_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin() = true)
  WITH CHECK (public.is_admin() = true);

-- Policy: Public can view approved submissions (for community contributions display)
CREATE POLICY "Public can view approved submissions"
  ON public.user_submissions
  FOR SELECT
  TO anon
  USING (status = 'approved');

-- 6. Grant necessary permissions
GRANT SELECT ON public.user_submissions TO anon;
GRANT ALL ON public.user_submissions TO authenticated;
GRANT SELECT ON public.app_settings TO authenticated;

-- 7. To add admin emails, run this (replace with actual emails):
-- UPDATE public.app_settings SET value = 'admin1@example.com,admin2@example.com' WHERE key = 'admin_emails';

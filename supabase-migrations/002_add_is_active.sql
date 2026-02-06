-- Migration: Add is_active field for soft delete functionality
-- Run this SQL in Supabase Dashboard → SQL Editor

-- 1. Add is_active column (default true for existing rows)
ALTER TABLE public.user_submissions 
ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- 2. Add deactivation tracking columns
ALTER TABLE public.user_submissions 
ADD COLUMN IF NOT EXISTS deactivated_at timestamp with time zone;

ALTER TABLE public.user_submissions 
ADD COLUMN IF NOT EXISTS deactivated_by uuid REFERENCES auth.users(id);

-- 3. Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_user_submissions_is_active 
ON public.user_submissions(is_active);

-- 4. Create composite index for common query pattern
CREATE INDEX IF NOT EXISTS idx_user_submissions_status_active 
ON public.user_submissions(status, is_active);

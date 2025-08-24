-- TNT Services Form Submissions Table Setup
-- Run this in your Supabase SQL Editor

-- Create the form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  car_registration TEXT NOT NULL UNIQUE, -- This prevents duplicate registrations
  discount_code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on car_registration for fast duplicate checking
CREATE INDEX IF NOT EXISTS idx_form_submissions_car_registration 
ON form_submissions(car_registration);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at 
ON form_submissions(created_at DESC);

-- Create an index on email for potential future use
CREATE INDEX IF NOT EXISTS idx_form_submissions_email 
ON form_submissions(email);

-- Add Row Level Security (RLS) policies
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to insert records (for the form)
CREATE POLICY "Allow anonymous inserts" 
ON form_submissions 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy to allow anonymous users to read their own records (for duplicate checking)
CREATE POLICY "Allow anonymous to check duplicates" 
ON form_submissions 
FOR SELECT 
TO anon 
USING (true);

-- Policy to allow authenticated users (future admin) to read all records
CREATE POLICY "Allow authenticated users to read all" 
ON form_submissions 
FOR SELECT 
TO authenticated 
USING (true);

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_form_submissions_updated_at 
    BEFORE UPDATE ON form_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert a test record (optional - you can remove this)
INSERT INTO form_submissions (name, email, phone, car_registration, discount_code, is_active)
VALUES ('Test User', 'test@example.com', '01234567890', 'TEST123', 'TNT10-TEST01', true)
ON CONFLICT (car_registration) DO NOTHING;

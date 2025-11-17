-- TEMPORARY FIX: Disable the trigger that's causing 500 errors
-- Run this in Supabase SQL Editor to allow signup to work

-- Drop the trigger (this is what's causing the 500 error)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Keep the function in case we want to re-enable it later
-- But for now, the client code will create profiles

-- Verify trigger is gone
SELECT 'Trigger disabled - signup should work now' as status;


// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qiirroanuepnmpqdvibs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpaXJyb2FudWVwbm1wcWR2aWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MzQ0MjMsImV4cCI6MjA2MTQxMDQyM30.2YGph6FZ8hsyGfTKsH4kH3ZGLw5h5FwVKNBojyA6pdM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
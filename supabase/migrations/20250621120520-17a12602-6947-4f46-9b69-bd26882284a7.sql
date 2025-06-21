
-- Create user_activity table to track user login times
CREATE TABLE public.user_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_login TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint on user_id so we can use upsert
ALTER TABLE public.user_activity ADD CONSTRAINT unique_user_id UNIQUE (user_id);

-- Enable Row Level Security
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own activity
CREATE POLICY "Users can view their own activity" 
  ON public.user_activity 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own activity
CREATE POLICY "Users can insert their own activity" 
  ON public.user_activity 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own activity
CREATE POLICY "Users can update their own activity" 
  ON public.user_activity 
  FOR UPDATE 
  USING (auth.uid() = user_id);

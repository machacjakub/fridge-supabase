import { createClient } from '@supabase/supabase-js'

// TODO - store to env file
const supabaseURL =  'https://rtmskhdqjqocsiqqnvqh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bXNraGRxanFvY3NpcXFudnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc5MjMzNjYsImV4cCI6MTk5MzQ5OTM2Nn0.1Y8QO_RZlUfLQZ0Hq4eArCS-_MUR3c8nbDXhDq2LyBQ';

export const supabase = createClient(supabaseURL, supabaseAnonKey)
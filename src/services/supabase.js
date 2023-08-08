
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://edqjmdqwqiesvhmokbdr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcWptZHF3cWllc3ZobW9rYmRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMTQzODQsImV4cCI6MjAwNTU5MDM4NH0.4PHyQ8qTb06STh-Sv8lEXdYN5Op3pwIYpcJOqnfLBP4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase


import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database.types'

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_KEY, import.meta.env.VITE_SUPABASE_KEY)

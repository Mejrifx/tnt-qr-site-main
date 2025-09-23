import { createClient } from '@supabase/supabase-js'

// Supabase configuration with better error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging for environment variables
console.log('🔧 Supabase Environment Check:')
console.log('- VITE_SUPABASE_URL:', supabaseUrl ? 'Present' : 'MISSING')
console.log('- VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'MISSING')

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables missing!')
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  console.error('Current values:', { supabaseUrl, supabaseAnonKey })
}

// Create Supabase client with fallback handling
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types
export interface FormSubmissionDB {
  id?: number
  name: string
  email: string
  phone: string
  car_registration: string
  discount_code: string
  is_active?: boolean
  created_at?: string
}

// Check if a car registration already exists
export const checkDuplicateRegistration = async (registration: string): Promise<boolean> => {
  try {
    // If Supabase is not available, allow submission (fallback)
    if (!supabase) {
      console.warn('⚠️ Supabase not available, skipping duplicate check')
      return false
    }

    console.log('🔍 Checking for duplicate registration:', registration.toUpperCase())
    
    const { data, error } = await supabase
      .from('form_submissions')
      .select('car_registration')
      .eq('car_registration', registration.toUpperCase())
      .maybeSingle()
    
    if (error) {
      console.error('❌ Error checking duplicate:', error)
      return false // Allow submission if there's an error checking
    }
    
    const isDuplicate = !!data
    console.log('🔍 Duplicate check result:', isDuplicate)
    
    return isDuplicate
  } catch (error) {
    console.error('❌ Error in checkDuplicateRegistration:', error)
    return false // Allow submission if there's an error
  }
}

// Save form submission to Supabase
export const saveToSupabase = async (formData: FormSubmissionDB): Promise<boolean> => {
  try {
    // If Supabase is not available, skip saving but don't fail
    if (!supabase) {
      console.warn('⚠️ Supabase not available, skipping save to Supabase')
      return true // Return true so the flow continues
    }

    console.log('💾 Saving to Supabase:', formData)
    
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        car_registration: formData.car_registration.toUpperCase(),
        discount_code: formData.discount_code,
        is_active: true
      }])
      .select()
    
    if (error) {
      console.error('❌ Error saving to Supabase:', error)
      return false
    }
    
    console.log('✅ Successfully saved to Supabase:', data)
    return true
  } catch (error) {
    console.error('❌ Error in saveToSupabase:', error)
    return false
  }
}

// Get all form submissions (for admin use later)
export const getAllSubmissions = async () => {
  try {
    if (!supabase) {
      console.warn('⚠️ Supabase not available')
      return []
    }

    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Error fetching submissions:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('❌ Error in getAllSubmissions:', error)
    return []
  }
}

// Utility function to check if Supabase is available
export const isSupabaseAvailable = (): boolean => {
  return !!supabase
}

import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

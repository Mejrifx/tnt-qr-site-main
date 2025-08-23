// Airtable Integration for TNT Form Submissions

export interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  carRegistration: string;
  discountCode: string;
  submittedAt: string;
}

export const submitToAirtable = async (formData: FormSubmission): Promise<boolean> => {
  try {
    // Airtable API configuration
    const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Form Submissions';
    const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

    // Debug logging
    console.log('🔧 Airtable Debug Info:');
    console.log('- Base ID:', AIRTABLE_BASE_ID ? `${AIRTABLE_BASE_ID.substring(0, 10)}...` : 'MISSING');
    console.log('- Table Name:', AIRTABLE_TABLE_NAME);
    console.log('- API Key:', AIRTABLE_API_KEY ? `${AIRTABLE_API_KEY.substring(0, 10)}...` : 'MISSING');
    console.log('- Form Data:', formData);

    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
      console.error('❌ Airtable configuration missing. Please check environment variables.');
      console.error('Required: VITE_AIRTABLE_BASE_ID and VITE_AIRTABLE_API_KEY');
      return false;
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    console.log('📤 Sending to URL:', url);

    // Simplified payload with only essential fields
    const payload = {
      fields: {
        'Name': formData.name,
        'Email': formData.email,
        'Phone': formData.phone,
        'Car Registration': formData.carRegistration,
        'Discount Code': formData.discountCode
      }
    };
    console.log('📋 Simplified Payload:', payload);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Airtable API Error:', errorData);
      console.error('❌ Full error details:', JSON.stringify(errorData, null, 2));
      console.error('❌ Response status:', response.status);
      console.error('❌ Response statusText:', response.statusText);
      return false;
    }

    const result = await response.json();
    console.log('✅ Successfully submitted to Airtable:', result.id);
    console.log('✅ Full result:', result);
    return true;

  } catch (error) {
    console.error('❌ Error submitting to Airtable:', error);
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message);
    }
    return false;
  }
};

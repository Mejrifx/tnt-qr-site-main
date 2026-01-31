import { useState, useRef } from "react";
import { User, Mail, Phone, Car, Gift, CheckCircle, AlertCircle, X, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitToAirtable } from "@/lib/airtable";
import { checkDuplicateRegistration, saveToSupabase, isSupabaseAvailable, normalizeRegistration } from "@/lib/supabase";
import html2canvas from "html2canvas";

interface DiscountFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

const DiscountForm = ({ onClose, isModal = false }: DiscountFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carRegistration: ''
  });
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [generatedAt, setGeneratedAt] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const discountRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.carRegistration) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to generate your discount code.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Privacy policy validation
    if (!privacyPolicyAccepted) {
      toast({
        title: "Privacy Policy Required",
        description: "Please accept our privacy policy to continue.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Check for duplicate registration in Supabase
      console.log('🔍 Checking for duplicate registration...');
      const isDuplicate = await checkDuplicateRegistration(formData.carRegistration);
      
      if (isDuplicate) {
        toast({
          title: "Registration Already Used",
          description: "This car registration has already claimed a discount code. Each vehicle is eligible for one discount only.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // 2. Generate unique discount code
      const code = `TNT10-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const timestamp = new Date().toISOString();
      setDiscountCode(code);
      setGeneratedAt(timestamp);

      // 3. Save to Supabase first (for duplicate prevention)
      console.log('💾 Saving to Supabase...');
      const supabaseData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        car_registration: formData.carRegistration,
        discount_code: code
      };
      
      const supabaseSuccess = await saveToSupabase(supabaseData);
      
      if (!supabaseSuccess) {
        toast({
          title: "Database Error",
          description: "Unable to save your information. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // 4. Save to Airtable (for Make.com automation)
      console.log('📤 Saving to Airtable...');
      const airtableData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        carRegistration: formData.carRegistration,
        discountCode: code,
        submittedAt: new Date().toISOString()
      };
      
      const airtableSuccess = await submitToAirtable(airtableData);
      
      if (!airtableSuccess) {
        // Log the error but don't fail the user experience since data is in Supabase
        console.warn('Failed to submit to Airtable, but data saved to Supabase');
      }

      // 5. Show success
      setIsSuccess(true);

      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact our support team.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // If it's the car registration field, normalize it in real-time
    if (name === 'carRegistration') {
      const normalizedValue = normalizeRegistration(value);
      setFormData(prev => ({
        ...prev,
        [name]: normalizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveImage = async () => {
    if (!discountRef.current) return;
    
    setIsSaving(true);
    try {
      const canvas = await html2canvas(discountRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true
      });
      
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        const fileName = `TNT-Discount-${discountCode}.png`;
        
        // Try Web Share API first (works on mobile for saving to camera roll)
        if (navigator.share && navigator.canShare) {
          try {
            const file = new File([blob], fileName, { type: 'image/png' });
            const shareData = {
              files: [file],
              title: 'TNT Services Discount Code',
              text: `My 10% TNT Services discount code: ${discountCode}`
            };
            
            // Check if sharing files is supported
            if (navigator.canShare(shareData)) {
              await navigator.share(shareData);
              toast({
                title: "Saved Successfully!",
                description: "Your discount code has been saved to your photos.",
              });
              setIsSaving(false);
              return;
            }
          } catch (shareError) {
            // User cancelled or share failed, fall back to download
            console.log('Share cancelled or failed, falling back to download');
          }
        }
        
        // Fallback: Traditional download (desktop or if share API unavailable)
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Saved Successfully!",
          description: "Your discount code has been saved to your device.",
        });
        
        setIsSaving(false);
      }, 'image/png');
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Save Failed",
        description: "Unable to save the image. Please screenshot instead.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  if (isSuccess) {
    // Format the timestamp for display
    const formattedDate = new Date(generatedAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const formattedTime = new Date(generatedAt).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return (
      <section id="discount-form" className={isModal ? "" : "py-20 px-4 bg-white"}>
        <div className={isModal ? "mx-auto text-center" : "max-w-2xl mx-auto text-center"}>
          <div className={`bg-white rounded-3xl ${isModal ? 'p-3 sm:p-6' : 'p-8 md:p-12'} bounce-in relative`} style={{boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 30px -4px rgba(255, 107, 53, 0.4)'}}>
            {/* Close Button for Modal */}
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="absolute top-1 right-1 sm:top-3 sm:right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            
            <div className={`flex justify-center ${isModal ? 'mb-2 sm:mb-4' : 'mb-6'}`}>
              <div className={`${isModal ? 'w-10 h-10 sm:w-16 sm:h-16' : 'w-20 h-20'} bg-green-100 rounded-full flex items-center justify-center`}>
                <CheckCircle className={`${isModal ? 'w-5 h-5 sm:w-8 sm:h-8' : 'w-10 h-10'} text-green-600`} />
              </div>
            </div>
            
            <h2 className={`${isModal ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'} font-bold text-tnt-black ${isModal ? 'mb-3' : 'mb-4'}`}>
              Congratulations!
            </h2>
            
            <p className={`${isModal ? 'text-sm' : 'text-lg'} text-tnt-gray ${isModal ? 'mb-6' : 'mb-8'}`}>
              Your exclusive 10% discount code has been generated! You'll also receive special email promotions for your local TNT Services car wash.
            </p>
            
            {/* Discount Code Box */}
            <div 
              ref={discountRef}
              className="bg-gradient-to-br from-tnt-orange/10 to-tnt-orange/5 border-2 border-tnt-orange rounded-2xl p-6 mb-6"
            >
              <p className="text-sm text-tnt-gray mb-2">Your Discount Code:</p>
              <div className="text-2xl md:text-3xl font-bold text-tnt-orange font-mono mb-4">
                {discountCode}
              </div>
              
              {/* Car Registration & Timestamp */}
              <div className="space-y-2 pt-4 border-t border-tnt-orange/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-tnt-gray">Vehicle Registration:</span>
                  <span className="font-semibold text-tnt-black">{formData.carRegistration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-tnt-gray">Generated:</span>
                  <span className="font-semibold text-tnt-black">{formattedDate} at {formattedTime}</span>
                </div>
              </div>
            </div>
            
            {/* Screenshot Notice */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-blue-900 mb-1">📸 Screenshot This Now!</p>
                  <p className="text-sm text-blue-700">
                    This is your proof of discount. Screenshot or save this page before closing.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveImage}
              disabled={isSaving}
              className="w-full mb-6 py-3 px-6 bg-tnt-orange text-white rounded-xl font-semibold transition-all duration-200 hover:bg-tnt-orange-dark hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Save to Device
                </>
              )}
            </button>
            
            {/* Terms */}
            <div className="space-y-3 text-sm text-tnt-gray text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Valid for 14 days from today</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Applicable to all services (including first month of memberships)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>One-time use per customer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Valid for registration {formData.carRegistration} only</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="discount-form" className={isModal ? "" : "py-20 px-4 bg-white"}>
      <div className={isModal ? "mx-auto" : "max-w-2xl mx-auto"}>
        <div className={`bg-white rounded-3xl ${isModal ? 'p-2 sm:p-4 md:p-6' : 'p-8 md:p-12'} fade-in relative`} style={{boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 30px -4px rgba(255, 107, 53, 0.4)'}}>
          {/* Close Button for Modal */}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-1 right-1 sm:top-3 sm:right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          
          {/* Header */}
          <div className={`text-center ${isModal ? 'mb-2 sm:mb-4 md:mb-6' : 'mb-8'}`}>
            <div className={`flex justify-center ${isModal ? 'mb-1 sm:mb-2 md:mb-3' : 'mb-4'}`}>
              <div className={`${isModal ? 'w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12' : 'w-16 h-16'} bg-tnt-orange rounded-2xl flex items-center justify-center`}>
                <Gift className={`${isModal ? 'w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6' : 'w-8 h-8'} text-white`} />
              </div>
            </div>
            <h2 className={`${isModal ? 'text-sm sm:text-lg md:text-xl lg:text-2xl' : 'text-3xl md:text-4xl'} font-bold text-tnt-black ${isModal ? 'mb-1 sm:mb-2' : 'mb-4'}`}>
              Get 10% Off + Exclusive Local Promotions
            </h2>
            <p className={`${isModal ? 'text-xs sm:text-sm' : 'text-lg'} text-tnt-gray`}>
              Join our exclusive members list for special discounts and email promotions at your local TNT Services car wash
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={isModal ? "space-y-2 sm:space-y-3 md:space-y-4" : "space-y-6"}>
            {/* Name */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-semibold text-tnt-black mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tnt-gray" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input pl-12"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-semibold text-tnt-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tnt-gray" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input pl-12"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-semibold text-tnt-black mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tnt-gray" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input pl-12"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Car Registration */}
            <div className="relative">
              <label htmlFor="carRegistration" className="block text-sm font-semibold text-tnt-black mb-2">
                Car Registration
              </label>
              <div className="relative">
                <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tnt-gray" />
                <input
                  type="text"
                  id="carRegistration"
                  name="carRegistration"
                  value={formData.carRegistration}
                  onChange={handleInputChange}
                  className="form-input pl-12"
                  placeholder="e.g., AB12 CDE"
                  required
                />
              </div>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacyPolicy"
                checked={privacyPolicyAccepted}
                onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-tnt-orange border-gray-300 rounded focus:ring-tnt-orange focus:ring-2"
                required
              />
              <label htmlFor="privacyPolicy" className={`${isModal ? 'text-xs sm:text-sm' : 'text-sm'} text-tnt-gray`}>
                I agree to the{' '}
                <a 
                  href="/privacy-policy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tnt-orange hover:text-tnt-orange-dark font-semibold underline"
                >
                  Privacy Policy
                </a>
                {' '}and consent to receiving promotional emails from TNT Services.
              </label>
            </div>

            {/* Privacy notice */}
            <div className={`bg-blue-50 rounded-xl ${isModal ? 'p-2 sm:p-3 md:p-4' : 'p-4'}`}>
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className={`${isModal ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} text-blue-600 mt-1 flex-shrink-0`} />
                <div className={`${isModal ? 'text-xs sm:text-sm' : 'text-sm'} text-blue-800`}>
                  <p className={`${isModal ? 'font-medium mb-1' : 'font-semibold mb-1'}`}>Your privacy matters</p>
                  <p>We'll only use your information to send your discount code and occasional service updates. Each car registration can only claim one discount.</p>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Checking Registration...
                </div>
              ) : (
                'Get My 10% Discount Code'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DiscountForm;

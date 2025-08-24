import { useState } from "react";
import { User, Mail, Phone, Car, Gift, CheckCircle, AlertCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitToAirtable } from "@/lib/airtable";
import { checkDuplicateRegistration, saveToSupabase } from "@/lib/supabase";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
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
      setDiscountCode(code);

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

      toast({
        title: "Success!",
        description: "Your exclusive discount code has been generated and sent to your email.",
      });

      // Auto-close modal after success (if in modal mode)
      if (isModal && onClose) {
        setTimeout(() => {
          onClose();
        }, 5000); // Close after 5 seconds
      }
      
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSuccess) {
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
            
            <div className="bg-tnt-gray-light rounded-2xl p-6 mb-8">
              <p className="text-sm text-tnt-gray mb-2">Your Discount Code:</p>
              <div className="text-2xl md:text-3xl font-bold text-tnt-orange font-mono">
                {discountCode}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-blue-900">Check your email!</p>
                  <p className="text-sm text-blue-700">
                    We've sent your discount code and booking instructions to <strong>{formData.email}</strong>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-tnt-gray text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Valid for 30 days from today</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Applicable to all services (excluding memberships)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>One-time use per customer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Registration {formData.carRegistration} is now registered</span>
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
        <div className={`bg-white rounded-3xl ${isModal ? 'p-3 sm:p-6' : 'p-8 md:p-12'} fade-in relative`} style={{boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 30px -4px rgba(255, 107, 53, 0.4)'}}>
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
          <div className={`text-center ${isModal ? 'mb-3 sm:mb-6' : 'mb-8'}`}>
            <div className={`flex justify-center ${isModal ? 'mb-1 sm:mb-3' : 'mb-4'}`}>
              <div className={`${isModal ? 'w-8 h-8 sm:w-12 sm:h-12' : 'w-16 h-16'} bg-tnt-orange rounded-2xl flex items-center justify-center`}>
                <Gift className={`${isModal ? 'w-4 h-4 sm:w-6 sm:h-6' : 'w-8 h-8'} text-white`} />
              </div>
            </div>
            <h2 className={`${isModal ? 'text-base sm:text-xl md:text-2xl' : 'text-3xl md:text-4xl'} font-bold text-tnt-black ${isModal ? 'mb-1 sm:mb-2' : 'mb-4'}`}>
              Get 10% Off + Exclusive Local Promotions
            </h2>
            <p className={`${isModal ? 'text-xs sm:text-sm' : 'text-lg'} text-tnt-gray`}>
              Join our exclusive members list for special discounts and email promotions at your local TNT Services car wash
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={isModal ? "space-y-3 sm:space-y-4" : "space-y-6"}>
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

            {/* Privacy notice */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Your privacy matters</p>
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

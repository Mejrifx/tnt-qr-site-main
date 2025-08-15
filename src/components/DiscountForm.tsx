import { useState } from "react";
import { User, Mail, Phone, Car, Gift, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DiscountForm = () => {
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
      // Simulate API call - Replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate unique discount code
      const code = `TNT10-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setDiscountCode(code);
      setIsSuccess(true);

      toast({
        title: "Success!",
        description: "Your exclusive discount code has been generated and sent to your email.",
      });

      // Here you would typically:
      // 1. Store form data in database (Supabase)
      // 2. Send email with discount code (SendGrid via Supabase Edge Function)
      
    } catch (error) {
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
      <section id="discount-form" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 bounce-in" style={{boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 30px -4px rgba(255, 107, 53, 0.4)'}}>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-tnt-black mb-4">
              Congratulations!
            </h2>
            
            <p className="text-lg text-tnt-gray mb-8">
              Your exclusive 10% discount code has been generated
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
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="discount-form" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 fade-in" style={{boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 30px -4px rgba(255, 107, 53, 0.4)'}}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-tnt-orange rounded-2xl flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-tnt-black mb-4">
              Get Your Exclusive 10% Off
            </h2>
            <p className="text-lg text-tnt-gray">
              Join thousands of satisfied customers and save on your services
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  <p>We'll only use your information to send your discount code and occasional service updates. No spam, ever.</p>
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
                  Generating Your Code...
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
import { Car, Settings, Wrench, CreditCard, CheckCircle, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServicesGridProps {
  onOpenModal?: () => void;
}

const services = [
  {
    icon: Car,
    title: "Premium Car Wash",
    price: "£5 - £100",
    description: "Complete exterior and interior cleaning",
    features: ["Foam wash", "Wheel cleaning", "Interior vacuum", "Polish & wax"],
    popular: false
  },
  {
    icon: Settings,
    title: "Tyre Services",
    price: "From £15",
    description: "Professional tyre fitting and maintenance",
    features: ["Tyre fitting", "Wheel balancing", "Puncture repair", "Pressure check"],
    popular: false
  },
  {
    icon: Wrench,
    title: "Mechanics",
    price: "From £40",
    description: "Expert automotive repairs and services",
    features: ["Engine diagnostics", "Oil changes", "Brake service", "MOT prep"],
    popular: false
  },
  {
    icon: CreditCard,
    title: "VIP Membership",
    price: "£39.95/month",
    description: "Unlimited washes + exclusive perks",
    features: ["Unlimited washes", "Free air freshener", "Priority booking", "10% off extras"],
    popular: true
  },
  {
    icon: CheckCircle,
    title: "Free Tyre Check",
    price: "FREE",
    description: "Comprehensive tyre safety inspection",
    features: ["Tread depth check", "Pressure test", "Visual inspection", "Safety report"],
    popular: false
  },
  {
    icon: Gift,
    title: "Free Diagnostics",
    price: "FREE",
    description: "Complete vehicle health check",
    features: ["Engine scan", "Fault codes", "Performance check", "Written report"],
    popular: false
  }
];

const ServicesGrid = ({ onOpenModal }: ServicesGridProps) => {
  const navigate = useNavigate();

  const handleButtonClick = (service: typeof services[0]) => {
    if (service.price === 'FREE') {
      document.getElementById('discount-form')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/pricing');
    }
  };

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From premium car washes to expert mechanical services, we've got everything your vehicle needs
          </p>
          
          {/* Promotional CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => onOpenModal && onOpenModal()}
              className="relative group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Button Text */}
              <span className="relative z-10">🎁 Get a FREE Discount</span>
              
              {/* Animated Glare Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full glare-animation"></div>
            </button>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.title}
                className={`service-card relative ${service.popular ? 'ring-2 ring-orange-500' : ''} slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Title and price */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-orange-600 mb-2">{service.price}</div>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={() => handleButtonClick(service)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    service.popular 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-gray-100 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  {service.price === 'FREE' ? 'Book Free Check' : 'View Full Prices'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
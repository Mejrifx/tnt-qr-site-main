import { Car, Truck, Users, Settings, Wrench, FileCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const pricingData = [
  {
    icon: Car,
    title: "Small Cars",
    description: "Compact cars, hatchbacks, small sedans",
    services: [
      { name: "Wash & Go", price: "£5" },
      { name: "Wash & Dry", price: "£7" },
      { name: "Mini Valet", price: "£12" },
      { name: "Full Valet", price: "£50" }
    ]
  },
  {
    icon: Car,
    title: "Medium Cars",
    description: "Saloons, estate cars, family cars",
    services: [
      { name: "Wash & Go", price: "£6" },
      { name: "Wash & Dry", price: "£8" },
      { name: "Mini Valet", price: "£13" },
      { name: "Full Valet", price: "£60" }
    ]
  },
  {
    icon: Car,
    title: "Large Cars",
    description: "SUVs, large saloons, luxury vehicles",
    services: [
      { name: "Wash & Go", price: "£7" },
      { name: "Wash & Dry", price: "£9" },
      { name: "Mini Valet", price: "£15" },
      { name: "Full Valet", price: "£80" }
    ]
  },
  {
    icon: Truck,
    title: "Vans",
    description: "Commercial vans, pickup trucks",
    services: [
      { name: "Wash & Go", price: "£10" },
      { name: "Wash & Dry", price: "£15" },
      { name: "Mini Valet", price: "£20" },
      { name: "Full Valet", price: "£100" }
    ]
  },
  {
    icon: Users,
    title: "Taxi/Business",
    description: "Professional vehicle cleaning",
    services: [
      { name: "Wash & Go", price: "£7" },
      { name: "Wash & Dry", price: "£10" },
      { name: "Mini Valet", price: "£12" },
      { name: "Full Valet", price: "£40" }
    ]
  },
  {
    icon: Settings,
    title: "Services/Tyres",
    description: "Professional automotive services",
    services: [
      { name: "Part Worn", price: "From £15" },
      { name: "New Tyres", price: "From £40" },
      { name: "Puncture Repair", price: "From £5" },
      { name: "Brakes/Service", price: "From £40" },
      { name: "MOT", price: "From £45" }
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-orange-500/2 to-transparent"></div>
        
        {/* Subtle orange rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-500/8 to-transparent transform rotate-12 animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-orange-500/6 to-transparent animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        
        {/* Corner glows */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }}></div>
        
        {/* Central subtle glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '10s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-white hover:text-orange-400 transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="text-lg">Back to Home</span>
            </button>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-orange-500 mb-6 slide-up">
              Our Pricing
            </h1>
            <p className="text-xl md:text-2xl text-white font-light mb-8 slide-up" style={{ animationDelay: '0.2s' }}>
              Transparent pricing for all our services
            </p>
            <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed slide-up" style={{ animationDelay: '0.4s' }}>
              Professional car care services at competitive prices. Quality you can trust, value you can afford.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingData.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={category.title}
                  className="bg-white rounded-3xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 bounce-in"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 30px -4px rgba(255, 107, 53, 0.4)'
                  }}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title and description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>

                  {/* Services list */}
                  <div className="space-y-4">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700">{service.name}</span>
                        <span className="font-bold text-orange-600 text-lg">{service.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contact button */}
                  <button 
                    onClick={() => window.open('tel:+447459905165')}
                    className="w-full mt-6 py-3 px-6 bg-orange-500 text-white rounded-xl font-semibold transition-all duration-200 hover:bg-orange-600 hover:scale-105"
                  >
                    Call to Book
                  </button>
                </div>
              );
            })}
          </div>

          {/* Contact section */}
          <div className="text-center mt-16 fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Book?</h3>
              <p className="text-white/80 mb-6">
                Call us now or visit our location for professional car care services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('tel:+447459905165')}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold transition-all duration-200 hover:bg-orange-600 hover:scale-105"
                >
                  Call +44 745 990 5165
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold transition-all duration-200 hover:bg-white/30"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

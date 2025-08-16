import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Clock } from "lucide-react";

interface NavigationProps {
  onOpenModal?: () => void;
}

const Navigation = ({ onOpenModal }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Services', action: () => scrollToSection('services') },
    { label: 'Get Discount', action: () => onOpenModal && onOpenModal() },
    { label: 'Contact', action: () => scrollToSection('contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-gray-900/50' 
        : 'bg-black/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:grid grid-cols-3 items-center h-16 w-full">
          {/* Logo - Left Column */}
          <div className="flex items-center gap-3 cursor-pointer group justify-start" 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/tnt-logo-nobg.png" 
              alt="TNT Car Wash" 
              className="w-8 h-8 transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors duration-200">
              TNT Services
            </span>
          </div>

          {/* Desktop Navigation - Center Column */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="relative text-white hover:text-orange-400 font-medium transition-all duration-200 group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                  <span className="absolute inset-0 bg-orange-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 opacity-0 group-hover:opacity-100"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info - Right Column */}
          <div className="hidden lg:flex items-center gap-4 text-sm text-white/80 justify-end">
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-200">
              <Phone className="w-4 h-4" />
              <span>+44 745 990 5165</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-200">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat 9AM-5:30PM</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Mobile menu button - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-orange-400 transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo and Text - Center */}
          <div className="flex items-center gap-3 cursor-pointer group" 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/tnt-logo-nobg.png" 
              alt="TNT Car Wash" 
              className="w-8 h-8 transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors duration-200">
              TNT Services
            </span>
          </div>

          {/* Empty space for balance */}
          <div className="w-10"></div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-white/20">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="block w-full text-left px-4 py-3 text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Contact Info */}
            <div className="px-4 py-2 border-t border-white/20 mt-4 space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-sm">+44 745 990 5165</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">745 Ashton Old Rd, Manchester</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Mon-Sat 9AM-5:30PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

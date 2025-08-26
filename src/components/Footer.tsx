import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from "lucide-react";


const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-orange-500 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src="/tnt-logo-nobg.png" alt="TNT Car Wash" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-white">TNT Services</h3>
            </div>
            <p className="text-white mb-6 max-w-md">
              Your trusted automotive experts providing premium car washes, professional tyre services, 
              and reliable mechanical repairs. Quality you can trust, service you can rely on.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-tnt-orange transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-tnt-orange transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-tnt-orange transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-tnt-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Visit Us</p>
                  <p className="text-white/80 text-sm">
                    745 Ashton Old Rd<br />
                    Openshaw<br />
                    Manchester M11 2HB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-tnt-orange flex-shrink-0" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <a href="tel:+447459905165" className="text-white hover:text-orange-400 transition-colors">
                    +44 745 990 5165
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-tnt-orange flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email Us</p>
                  <a href="mailto:hello@tntcarwash.co.uk" className="text-white hover:text-orange-400 transition-colors">
                    hello@tntcarwash.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Opening Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-tnt-orange flex-shrink-0" />
                <div>
                  <p className="font-semibold">Mon - Sat</p>
                  <p className="text-white text-sm">9:00 AM - 5:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-tnt-orange flex-shrink-0" />
                <div>
                  <p className="font-semibold">Sunday</p>
                  <p className="text-white/80 text-sm">9:00 AM - 4:30 PM</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm">
              © 2025 TNT Services. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy-policy" className="text-white hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-orange-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
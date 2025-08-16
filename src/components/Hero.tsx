import { QrCode, Sparkles } from "lucide-react";


const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 pt-20 overflow-hidden bg-black">
      
      {/* Subtle Background Effects */}
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

      <div className="relative z-10 text-center max-w-4xl mx-auto fade-in">
        {/* QR Code indicator */}
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-16 bounce-in">
          <QrCode className="w-5 h-5 text-black" />
          <span className="text-black text-sm font-medium">Scanned from your TNT air freshener</span>
        </div>

        {/* Logo */}
        <div className="mb-8 slide-up">
          <img 
            src="/tnt-logo-nobg.png" 
            alt="TNT Car Wash Logo" 
            className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl"
          />
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-orange-500 mb-6 slide-up">
          Welcome to{" "}
          <span className="inline-flex items-center gap-3">
            TNT Services
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white font-light mb-8 slide-up" style={{ animationDelay: '0.2s' }}>
          Your Auto Experts!
        </p>

        {/* Description */}
        <p className="text-lg text-white max-w-2xl mx-auto mb-12 leading-relaxed slide-up" style={{ animationDelay: '0.4s' }}>
          Professional car washes, expert tyre services, trusted mechanics, and exclusive membership perks. 
          Everything your vehicle needs, all in one place.
        </p>

        {/* CTA Button */}
        <div className="slide-up" style={{ animationDelay: '0.6s' }}>
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-hero text-lg md:text-xl"
          >
            Explore Our Services
          </button>
        </div>


      </div>
    </section>
  );
};

export default Hero;
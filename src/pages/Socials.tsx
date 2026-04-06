import { useEffect, useState } from "react";

const Socials = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const socialLinks = [
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@tntservices.ma",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      gradient: "from-black via-[#00f2ea] to-[#ff0050]",
      hoverGlow: "group-hover:shadow-[0_0_40px_rgba(0,242,234,0.6)]",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/tntservices.ma",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      gradient: "from-[#4267B2] via-[#3b5998] to-[#2d4373]",
      hoverGlow: "group-hover:shadow-[0_0_40px_rgba(66,103,178,0.6)]",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/tntservices.ma",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      gradient: "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
      hoverGlow: "group-hover:shadow-[0_0_40px_rgba(253,29,29,0.6)]",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 py-12">
      
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-orange-500/5 to-transparent"></div>
        
        {/* Animated orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0s', animationDuration: '8s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '3s', animationDuration: '7s' }}
        ></div>
        
        {/* Subtle rays */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-500/8 to-transparent transform rotate-12 animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-md mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 bounce-in">
            <img 
              src="/tnt-logo-nobg.png" 
              alt="TNT Services" 
              className="w-24 h-24 mx-auto drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-3 slide-up">
            TNT Services
          </h1>
          
          <p className="text-white/70 text-lg slide-up" style={{ animationDelay: '0.2s' }}>
            Connect with us on social media
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block w-full transition-all duration-500 slide-up`}
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              <div className={`
                relative overflow-hidden
                bg-gradient-to-r ${social.gradient}
                rounded-2xl p-[2px]
                transition-all duration-300
                hover:scale-105 active:scale-95
                ${social.hoverGlow}
              `}>
                <div className="bg-black rounded-2xl px-8 py-5 flex items-center justify-between backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className={`
                      text-white transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-6
                    `}>
                      {social.icon}
                    </div>
                    <span className="text-white font-semibold text-xl">
                      {social.name}
                    </span>
                  </div>
                  
                  <svg 
                    className="w-6 h-6 text-white/50 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 fade-in" style={{ animationDelay: '0.9s' }}>
          <p className="text-white/40 text-sm">
            Your Auto Experts
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socials;

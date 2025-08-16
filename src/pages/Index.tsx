import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import DiscountForm from "@/components/DiscountForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [showModal, setShowModal] = useState(false);

  // Show modal after a brief delay when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000); // 1 second delay for better UX

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
          <div className="min-h-screen bg-white">
        <Navigation onOpenModal={openModal} />
        <Hero onOpenModal={openModal} />
        <ServicesGrid onOpenModal={openModal} />
        <Footer />
      
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DiscountForm onClose={closeModal} isModal={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import DiscountForm from "@/components/DiscountForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ServicesGrid />
      <DiscountForm />
      <Footer />
    </div>
  );
};

export default Index;

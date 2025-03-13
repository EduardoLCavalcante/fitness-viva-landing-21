
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Plans from "@/components/Plans";
import AppSection from "@/components/AppSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Plans />
      <AppSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

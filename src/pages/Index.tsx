
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Plans from "@/components/Plans";
import AppSection from "@/components/AppSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  // Efecto de animación para revelar elementos al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
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


import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Plans from "@/components/Plans";
import AppSection from "@/components/AppSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  // Enhanced animation effect for scroll reveal with staggered timing
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay for a more professional animation flow
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 150); // Staggered timing based on element index
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px' // Trigger slightly earlier
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
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


import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Plans from "@/components/Plans";
import AppSection from "@/components/AppSection";
import CalendarSection from "@/components/Calendar";
import GallerySection from "@/components/GallerySection";
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
          }, index * 120); // Slightly faster staggered timing
        }
      });
    }, { 
      threshold: 0.1, // Trigger earlier
      rootMargin: '0px 0px -100px 0px'
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <Navbar />
      <div className="bg-gradient-to-b from-black via-maisvida-dark to-black">
      
        <Hero />
        
        <About />
        
        <Plans />
        <CalendarSection />
        <AppSection />
        <GallerySection />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

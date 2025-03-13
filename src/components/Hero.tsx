
import { Button } from "@/components/ui/button";
import { HeartPulse, Dumbbell, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-maisvida-dark to-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="absolute inset-0 bg-gym-pattern opacity-5 z-0"></div>
      
      {/* Animated light effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-maisvida-green opacity-30 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-line"></div>
        </div>
        <div className="absolute top-2/4 left-0 right-0 h-1 bg-maisvida-red opacity-30 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-line" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left animate-on-scroll">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-white">STUDIO DE</span> 
              <br />
              <span className="bg-gradient-to-r from-maisvida-green to-emerald-400 bg-clip-text text-transparent">MUSCULAÇÃO</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-maisvida-red to-red-500 mb-6 mx-auto md:mx-0 rounded-full"></div>
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-md">
              Transforme seu corpo e sua vida com os melhores profissionais e equipamentos de última geração em um ambiente exclusivo.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Button className="bg-gradient-to-r from-maisvida-green to-emerald-500 hover:from-maisvida-green/90 hover:to-emerald-500/90 text-white px-8 py-6 rounded-md text-lg shadow-lg transform transition-all duration-300 hover:shadow-emerald-500/20 hover:scale-105">
                <HeartPulse className="mr-2" /> Comece Hoje
              </Button>
              <Button variant="outline" className="border-maisvida-red text-maisvida-red hover:bg-maisvida-red/10 px-8 py-6 rounded-md text-lg shadow-md transform transition-all duration-300 hover:shadow-red-500/20 hover:scale-105">
                <Dumbbell className="mr-2" /> Nossos Planos
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center animate-on-scroll">
            <div className="relative">
              <div className="p-8 rounded-full bg-gradient-to-br from-maisvida-green/20 to-maisvida-red/20 backdrop-blur-sm animate-heartbeat shadow-2xl">
                <img 
                  src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
                  alt="Mais Vida Academia" 
                  className="max-w-full h-auto drop-shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <div className="bg-gradient-to-r from-maisvida-green to-emerald-500 text-white text-4xl font-bold py-2 px-6 rounded-full inline-block shadow-lg">
                  <span className="text-white">+</span>
                  <span>VIDA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button 
            onClick={scrollToAbout}
            className="text-white flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
          >
            <span className="text-sm mb-2">Saiba mais</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

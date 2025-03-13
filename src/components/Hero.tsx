
import { Button } from "@/components/ui/button";
import { HeartPulse, Dumbbell } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden bg-maisvida-dark">
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      
      {/* Animated background element */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-maisvida-red overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-line"></div>
        </div>
        <div className="absolute top-2/4 left-0 right-0 h-1 bg-maisvida-green overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-line" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">STUDIO DE</span> 
              <br />
              <span className="text-maisvida-green">MUSCULAÇÃO</span>
            </h1>
            <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto md:mx-0"></div>
            <p className="text-white text-lg md:text-xl mb-8">
              Transforme seu corpo e sua vida com os melhores profissionais e equipamentos de última geração.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Button className="bg-maisvida-green hover:bg-maisvida-green/80 text-white px-8 py-6 rounded-md text-lg">
                <HeartPulse className="mr-2" /> Comece Hoje
              </Button>
              <Button variant="outline" className="border-maisvida-red text-maisvida-red hover:bg-maisvida-red/10 px-8 py-6 rounded-md text-lg">
                <Dumbbell className="mr-2" /> Nossos Planos
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
            <div className="relative">
              <div className="animate-heartbeat">
                <img 
                  src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
                  alt="Mais Vida Academia" 
                  className="max-w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="text-white text-3xl font-bold">+VIDA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

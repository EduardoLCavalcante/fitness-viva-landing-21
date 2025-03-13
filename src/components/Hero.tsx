
import { Button } from "@/components/ui/button";
import { ChevronDown, Dumbbell, HeartPulse, Trophy } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-maisvida-dark to-black z-0"></div>
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png')] bg-center bg-no-repeat bg-contain opacity-[0.03] z-0"></div>
      
      {/* Dynamic elements */}
      <div className="absolute w-full h-full z-0">
        <div className="absolute top-1/4 right-[20%] w-64 h-64 bg-maisvida-green rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[20%] w-72 h-72 bg-maisvida-red rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left section with text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-on-scroll">
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3 py-2 px-4 bg-maisvida-green/10 backdrop-blur-sm rounded-full border border-maisvida-green/20">
                <span className="w-2 h-2 bg-maisvida-green rounded-full animate-pulse"></span>
                <span className="text-white/90 text-sm font-medium tracking-wide">Academia Premium</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
              <span className="text-white">Transforme seu</span>
              <br />
              <div className="relative inline-flex">
                <span className="bg-gradient-to-r from-maisvida-green to-emerald-400 bg-clip-text text-transparent">corpo</span>
                <span className="ml-4 relative">
                  <img 
                    src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
                    alt="+ Vida Logo" 
                    className="w-16 h-16 md:w-24 md:h-24 absolute -top-2 -right-20 md:-right-28 animate-pulse"
                  />
                </span>
              </div>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed max-w-lg font-light">
              Ambiente exclusivo com equipamentos de última geração e profissionais experientes para cuidar da sua saúde e bem-estar.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-maisvida-green to-emerald-500 hover:from-emerald-500 hover:to-maisvida-green text-white font-bold px-8 py-6 rounded-lg text-lg shadow-lg shadow-maisvida-green/20 transition-all duration-300">
                <HeartPulse className="mr-2" /> Começar Agora
              </Button>
              <Button variant="outline" className="border-maisvida-green/20 bg-black/40 backdrop-blur-sm text-white hover:bg-maisvida-green/10 px-8 py-6 rounded-lg text-lg transition-all duration-300">
                <Trophy className="mr-2" /> Ver Planos
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-maisvida-green/10 backdrop-blur-sm border border-maisvida-green/20">
                  <Dumbbell className="text-maisvida-green h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">100+</p>
                  <p className="text-white/70 text-sm">Equipamentos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-maisvida-red/10 backdrop-blur-sm border border-maisvida-red/20">
                  <HeartPulse className="text-maisvida-red h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">15+</p>
                  <p className="text-white/70 text-sm">Profissionais</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20">
                  <Trophy className="text-yellow-500 h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">500+</p>
                  <p className="text-white/70 text-sm">Clientes Satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right section with logo and visual elements */}
          <div className="w-full lg:w-1/2 flex justify-center items-center animate-on-scroll">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-maisvida-green/20 to-maisvida-red/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-2 rounded-full bg-gradient-to-br from-black via-black to-maisvida-dark border-2 border-white/5 shadow-2xl">
                  <div className="p-8 rounded-full bg-gradient-to-br from-maisvida-green/20 to-maisvida-red/20 backdrop-blur-lg">
                    <img 
                      src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
                      alt="+ Vida Studio" 
                      className="w-64 h-64 object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <h2 className="text-4xl font-bold">
                    <span className="text-white">STUDIO DE</span>
                  </h2>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-maisvida-green to-emerald-400 bg-clip-text text-transparent">
                    MUSCULAÇÃO
                  </h2>
                  <div className="mt-4 px-6 py-2 bg-maisvida-green/10 backdrop-blur-sm rounded-full border border-maisvida-green/20 inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-maisvida-green rounded-full animate-pulse"></span>
                    <span className="text-white/90 text-sm font-medium">Aberto 24 horas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <button 
            onClick={scrollToAbout}
            className="group flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
          >
            <span className="text-white/60 text-sm mb-2 group-hover:text-white transition-colors">Descubra Mais</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-maisvida-green/10 backdrop-blur-sm border border-maisvida-green/20 group-hover:bg-maisvida-green/20 transition-colors">
              <ChevronDown className="text-white h-4 w-4 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

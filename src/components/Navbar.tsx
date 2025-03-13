
import { useState, useEffect } from 'react';
import { Menu, X, HeartPulse } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-lg py-3 border-b border-maisvida-green/20' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-maisvida-green to-maisvida-red rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
            <div className="relative bg-black rounded-full p-1">
              <img 
                src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
                alt="+ Vida Academia" 
                className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`}
              />
            </div>
          </div>
          <div className="ml-2">
            <h1 className="font-bold text-lg md:text-xl text-white tracking-wider">+ VIDA</h1>
            <div className="bg-gradient-to-r from-maisvida-green to-maisvida-red h-0.5 w-full"></div>
            <p className="text-white/80 text-xs tracking-wide">STUDIO DE MUSCULAÇÃO</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-white hover:text-maisvida-green transition-colors font-medium tracking-wide"
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-white hover:text-maisvida-green transition-colors font-medium tracking-wide"
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('plans')} 
            className="text-white hover:text-maisvida-green transition-colors font-medium tracking-wide"
          >
            Planos
          </button>
          <button 
            onClick={() => scrollToSection('app')} 
            className="text-white hover:text-maisvida-green transition-colors font-medium tracking-wide"
          >
            Aplicativo
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-white hover:text-maisvida-green transition-colors font-medium tracking-wide"
          >
            Contato
          </button>
          <Button className="bg-gradient-to-r from-maisvida-green to-maisvida-green/90 hover:from-maisvida-green/90 hover:to-maisvida-green text-white font-bold">
            <HeartPulse className="mr-2 h-4 w-4" /> Comece Hoje
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 rounded-full bg-maisvida-green/10 border border-maisvida-green/20 backdrop-blur-sm"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-maisvida-green/20">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2 font-medium tracking-wide"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2 font-medium tracking-wide"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('plans')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2 font-medium tracking-wide"
            >
              Planos
            </button>
            <button 
              onClick={() => scrollToSection('app')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2 font-medium tracking-wide"
            >
              Aplicativo
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2 font-medium tracking-wide"
            >
              Contato
            </button>
            <Button className="bg-gradient-to-r from-maisvida-green to-maisvida-green/90 hover:from-maisvida-green/90 hover:to-maisvida-green text-white font-bold w-full py-6">
              <HeartPulse className="mr-2 h-5 w-5" /> Comece Hoje
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

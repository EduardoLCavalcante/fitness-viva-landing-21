
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
        ? 'bg-black/90 backdrop-blur-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
            alt="+ Vida Academia" 
            className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-14'}`}
          />
          <div className="ml-2">
            <h1 className="font-bold text-lg text-white">+ VIDA</h1>
            <div className="bg-gradient-to-r from-maisvida-green to-maisvida-red h-0.5 w-full"></div>
            <p className="text-white/80 text-xs">STUDIO DE MUSCULAÇÃO</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-white hover:text-maisvida-green transition-colors"
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-white hover:text-maisvida-green transition-colors"
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('plans')} 
            className="text-white hover:text-maisvida-green transition-colors"
          >
            Planos
          </button>
          <button 
            onClick={() => scrollToSection('app')} 
            className="text-white hover:text-maisvida-green transition-colors"
          >
            Aplicativo
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-white hover:text-maisvida-green transition-colors"
          >
            Contato
          </button>
          <Button className="bg-maisvida-green hover:bg-maisvida-green/90 text-white font-bold">
            <HeartPulse className="mr-2 h-4 w-4" /> Comece Hoje
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-1 rounded-full bg-black/20 backdrop-blur-sm"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('plans')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2"
            >
              Planos
            </button>
            <button 
              onClick={() => scrollToSection('app')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2"
            >
              Aplicativo
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-white hover:text-maisvida-green transition-colors text-lg py-2"
            >
              Contato
            </button>
            <Button className="bg-maisvida-green hover:bg-maisvida-green/90 text-white font-bold w-full py-6">
              <HeartPulse className="mr-2 h-5 w-5" /> Comece Hoje
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

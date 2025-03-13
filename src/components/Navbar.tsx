
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-black bg-opacity-90 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
            alt="Mais Vida Academia" 
            className="h-14"
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-maisvida-green transition-colors">Início</a>
          <a href="#about" className="hover:text-maisvida-green transition-colors">Sobre</a>
          <a href="#plans" className="hover:text-maisvida-green transition-colors">Planos</a>
          <a href="#app" className="hover:text-maisvida-green transition-colors">Aplicativo</a>
          <a href="#contact" className="hover:text-maisvida-green transition-colors">Contato</a>
          <Button className="bg-maisvida-green hover:bg-maisvida-green/80 text-white">Comece Hoje</Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 absolute w-full">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <a href="#home" className="text-white hover:text-maisvida-green transition-colors">Início</a>
            <a href="#about" className="text-white hover:text-maisvida-green transition-colors">Sobre</a>
            <a href="#plans" className="text-white hover:text-maisvida-green transition-colors">Planos</a>
            <a href="#app" className="text-white hover:text-maisvida-green transition-colors">Aplicativo</a>
            <a href="#contact" className="text-white hover:text-maisvida-green transition-colors">Contato</a>
            <Button className="bg-maisvida-green hover:bg-maisvida-green/80 text-white w-full">Comece Hoje</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

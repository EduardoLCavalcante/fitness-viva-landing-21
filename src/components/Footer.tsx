
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-maisvida-green/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-maisvida-green to-maisvida-red rounded-full blur opacity-30"></div>
                <div className="relative p-1">
                  <img 
                    src="/lovable-uploads/53cb1129-5526-47b5-acae-8dc16b293ec6.png" 
                    alt="Mais Vida Academia" 
                    className="h-12"
                  />
                </div>
              </div>
              <div className="ml-2">
                <h3 className="font-bold text-xl text-white">MAIS VIDA</h3>
                <div className="bg-gradient-to-r from-maisvida-green to-maisvida-red h-0.5 w-full"></div>
                <p className="text-white/80 text-xs tracking-wide">Studio de Treinamento</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 font-light">
              Transformando vidas através do poderoso e principal medicamento da vida, “exercício físico”.
            </p>
            <div className="flex space-x-4">
            
              <a 
              href="https://www.instagram.com/mais.vida_studio.de.treina/" 
              target="_blank"
              rel="noreferrer"
              className="bg-maisvida-green/10 hover:bg-maisvida-green/20 p-2 rounded-full transition-colors border border-maisvida-green/20">
                <Instagram className="h-5 w-5" />
              </a>
              
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-maisvida-green transition-colors">Início</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-maisvida-green transition-colors">Sobre</a></li>
              <li><a href="#plans" className="text-gray-400 hover:text-maisvida-green transition-colors">Planos</a></li>
              <li><a href="#app" className="text-gray-400 hover:text-maisvida-green transition-colors">Aplicativo</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-maisvida-green transition-colors">Contato</a></li>
            </ul>
          </div>
          
          {/* <div>
            <h3 className="text-xl font-bold mb-6 text-white">Serviços</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Musculação</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Avaliação física</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Nutrição</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Personal Trainer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Aulas coletivas</a></li>
            </ul>
          </div> */}
          
  
        </div>
        
        <div className="mt-12 text-start pt-8 border-t border-maisvida-green/10 ">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Mais Vida Academia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

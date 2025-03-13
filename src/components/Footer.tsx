
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img 
              src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
              alt="Mais Vida Academia" 
              className="h-16 mb-6"
            />
            <p className="text-gray-400 mb-6">
              Transformando vidas através da saúde e do bem-estar. Junte-se a nós nessa jornada!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-maisvida-green p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-maisvida-green p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-maisvida-green p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-maisvida-green p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-maisvida-green transition-colors">Início</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-maisvida-green transition-colors">Sobre</a></li>
              <li><a href="#plans" className="text-gray-400 hover:text-maisvida-green transition-colors">Planos</a></li>
              <li><a href="#app" className="text-gray-400 hover:text-maisvida-green transition-colors">Aplicativo</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-maisvida-green transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Musculação</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Avaliação física</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Nutrição</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Personal Trainer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maisvida-green transition-colors">Aulas coletivas</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Horário</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-400">Segunda - Sexta:</span>
                <span className="text-maisvida-green">6:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sábado:</span>
                <span className="text-maisvida-green">8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Domingo:</span>
                <span className="text-maisvida-green">8:00 - 14:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Mais Vida Academia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { HeartPulse, Dumbbell, Users, Award } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-maisvida-dark mb-4">SOBRE A <span className="text-maisvida-green">MAIS VIDA</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fundada com a missão de proporcionar mais qualidade de vida através da musculação, a Mais Vida se destaca por oferecer um ambiente exclusivo e personalizado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <HeartPulse size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Saúde em Primeiro Lugar</h3>
            <p className="text-gray-600">
              Nosso foco é melhorar sua saúde e bem-estar através de treinamentos adequados à sua condição física.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Dumbbell size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Equipamentos Modernos</h3>
            <p className="text-gray-600">
              Contamos com equipamentos de última geração para garantir treinos eficientes e seguros.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Profissionais Qualificados</h3>
            <p className="text-gray-600">
              Nossa equipe é formada por profissionais especializados que irão acompanhar sua evolução.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Ambiente Exclusivo</h3>
            <p className="text-gray-600">
              Um espaço pensado para oferecer conforto e privacidade durante seus treinos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

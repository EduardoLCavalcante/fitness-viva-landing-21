
import { HeartPulse, Dumbbell, Users, Award, Clock, Calendar } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-black text-white">
        {/* Dynamic elements */}
        <div className="absolute w-full h-full z-0">
        <div className="absolute top-1/4 right-[20%] w-64 h-64 bg-maisvida-green rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[20%] w-72 h-72 bg-maisvida-red rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">SOBRE A <span className="text-maisvida-green">MAIS VIDA</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          A MAIS VIDA foi fundada em 2015 com a missão de proporcionar a prática regular do exercício físico em um ambiente inclusivo e acolhedor, trazendo experiências positivas e motivando as pessoas principalmente de idades avançadas e níveis baixo condicionamento físico. Há 10 anos oferecemos um trabalho ético e seguro, nossa equipe de profissionais altamente qualificados está comprometida em ajudar você a alcançar seus objetivos na melhora da qualidade de vida, saúde e longevidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-maisvida-dark p-8 rounded-lg text-center hover:shadow-lg transition-all group animate-on-scroll">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <HeartPulse size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Saúde em Primeiro Lugar</h3>
            <p className="text-gray-400">
              Nosso foco é melhorar sua saúde e bem-estar através de treinamentos adequados à sua condição física.
            </p>
          </div>
          
          <div className="bg-maisvida-dark p-8 rounded-lg text-center hover:shadow-lg transition-all group animate-on-scroll">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Dumbbell size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Equipamentos Modernos</h3>
            <p className="text-gray-400">
              Contamos com equipamentos de última geração para garantir treinos eficientes e seguros.
            </p>
          </div>
          
          <div className="bg-maisvida-dark p-8 rounded-lg text-center hover:shadow-lg transition-all group animate-on-scroll">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Profissionais Qualificados</h3>
            <p className="text-gray-400">
              Nossa equipe é formada por profissionais especializados que irão acompanhar sua evolução.
            </p>
          </div>
          
          <div className="bg-maisvida-dark p-8 rounded-lg text-center hover:shadow-lg transition-all group animate-on-scroll">
            <div className="w-16 h-16 bg-maisvida-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Ambiente Exclusivo</h3>
            <p className="text-gray-400">
              Um espaço pensado para oferecer conforto e privacidade durante seus treinos.
            </p>
          </div>
        </div>
        
        {/* Novas seções: Novas Turmas e Novos Equipamentos */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            SEMPRE TRAZENDO 
            <span className="text-maisvida-green"> NOVIDADES</span> 
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Novas Turmas */}
            <div className="bg-maisvida-dark rounded-lg overflow-hidden animate-on-scroll shadow-lg border border-maisvida-green/20">
              <div className="p-6 bg-gradient-to-r from-maisvida-green/20 to-transparent">
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-maisvida-green" />
                  Novas Turmas
                </h4>
              </div>
              
              <div className="p-6 space-y-4">
             
                
                <div className="flex items-start gap-4 p-4 bg-black/30 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-maisvida-green/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-maisvida-green" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-maisvida-green">NOVA TURMA AO SÁBADO</h5>
                    <p className="text-gray-400 mt-1">Nova turma ao sábado de manhã</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-maisvida-green/20 text-maisvida-green text-xs px-2 py-1 rounded">Sáb</span>
                      <span className="bg-maisvida-green/20 text-maisvida-green text-xs px-2 py-1 rounded">6h - 10h</span>
                    </div>
                  </div>
                </div>
                
                
              </div>
            </div>
            
            {/* Novos Equipamentos */}
            <div className="bg-maisvida-dark rounded-lg overflow-hidden animate-on-scroll shadow-lg border border-maisvida-green/20">
              <div className="p-6 bg-gradient-to-r from-maisvida-green/20 to-transparent">
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-maisvida-green" />
                  Novos Equipamentos
                </h4>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-6 p-4 bg-black/30 rounded-lg">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                    {/* Placeholder for equipment image*/}
                    <Dumbbell className="h-8 w-8 text-maisvida-green" /> 
                  </div>
                  <div>
                    {/* <h5 className="font-semibold text-lg text-maisvida-green">Esteira Profissional Elite X9</h5> */}
                    <p className="text-maisvida-green mt-1">Estamos sempre inovando, buscando trazer os melhores equipamentos para melhor performance nos treinos.</p>
                  </div>
                </div>
               </div> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

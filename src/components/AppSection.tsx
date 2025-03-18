
import { Smartphone, BarChart, Calendar, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppSection = () => {
  const features = [
    {
      icon: <BarChart className="h-8 w-8 text-maisvida-green" />,
      title: "Acompanhe seu progresso",
      description: "Visualize sua evolução ao longo do tempo através de gráficos e estatísticas."
    },
    {
      icon: <Calendar className="h-8 w-8 text-maisvida-green" />,
      title: "Agende seus treinos",
      description: "Reserve horários para suas atividades e receba lembretes personalizados."
    },
    {
      icon: <Users className="h-8 w-8 text-maisvida-green" />,
      title: "Conecte-se à comunidade",
      description: "Participe de desafios, compartilhe conquistas e motive-se com outros alunos."
    },
    {
      icon: <Heart className="h-8 w-8 text-maisvida-green" />,
      title: "Monitore sua saúde",
      description: "Acompanhe indicadores importantes de saúde e bem-estar físico."
    }
  ];

  return (
    <section id="app" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
            <h2 className="text-4xl font-bold text-maisvida-white mb-4">NOSSO <span className="text-maisvida-green">APLICATIVO</span></h2>
            <div className="w-24 h-1 bg-maisvida-red mb-6"></div>
            <p className="text-lg text-gray-300 mb-8">
              O aplicativo Mais Vida foi desenvolvido para proporcionar uma experiência completa aos nossos alunos. Com ele, você tem acesso ao seu treino, agenda, avaliações e muito mais, tudo na palma da sua mão.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-5">
                <Smartphone className="mr-2 h-5 w-5" /> Download App
              </Button>
              <Button variant="outline" className="border-maisvida-green text-maisvida-green hover:bg-maisvida-green/10 px-6 py-5">
                Saiba mais
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-maisvida-green/10 rounded-3xl md:p-8 p-4  relative">
              <div className="absolute -top-0 -right-1 w-24 h-24 bg-maisvida-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                NOVO!
              </div>
              <div className="bg-black flex justify-center mx-auto">
                  {/* Moldura externa do "celular" */}
                  <div className="w-72 my-7 h-[570px] bg-gray-500 rounded-[60px] border-[14px] border-gray-500 shadow-xl">
                    {/* Conteúdo interno */}
                    <div className="relative w-full h-full bg-black rounded-[48px] overflow-hidden">
                      {/* Imagem preenche todo o espaço */}
                      <img
                        src="ScaFIT-tela.jpeg"
                        alt="ScaFIT tela"
                        className="w-full h-full object-cover translate-y-[-1%]"
                      />

                      {/* Barra superior sobreposta à imagem */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-3xl" />
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

export default AppSection;

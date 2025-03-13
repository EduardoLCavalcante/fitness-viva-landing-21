
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
            <p className="text-lg text-gray-600 mb-8">
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
                    <p className="text-gray-600">{feature.description}</p>
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
            <div className="bg-maisvida-green/10 rounded-3xl p-8 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-maisvida-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                NOVO!
              </div>
              <div className="bg-black rounded-2xl shadow-2xl w-64 mx-auto overflow-hidden">
                <div className="h-12 bg-black relative flex items-center justify-center">
                  <div className="w-24 h-5 bg-gray-800 rounded-b-xl"></div>
                </div>
                <div className="p-4 bg-black">
                  <img 
                    src="/lovable-uploads/297c7f25-31fc-4cbb-93a9-ca3a77819f69.png" 
                    alt="App Mais Vida" 
                    className="h-12 mx-auto mb-4"
                  />
                  <div className="bg-gray-900 rounded-lg p-3 mb-3">
                    <div className="h-4 w-3/4 bg-maisvida-green/30 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-maisvida-green/20 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gray-900 rounded-lg p-2">
                      <div className="h-10 w-10 bg-maisvida-red/20 rounded-full mx-auto mb-2"></div>
                      <div className="h-2 w-12 bg-gray-800 rounded mx-auto"></div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-2">
                      <div className="h-10 w-10 bg-maisvida-green/20 rounded-full mx-auto mb-2"></div>
                      <div className="h-2 w-12 bg-gray-800 rounded mx-auto"></div>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 mb-3">
                    <div className="h-3 w-full bg-maisvida-green/20 rounded mb-2"></div>
                    <div className="h-3 w-full bg-maisvida-green/20 rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-maisvida-green/20 rounded"></div>
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

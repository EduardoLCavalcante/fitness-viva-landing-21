
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Tv, Utensils, ActivitySquare } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      id: 1,
      name: "TV Divulgação",
      price: "R$ 50,00",
      description: "Divulgue sua marca ou produto nas TVs da academia",
      icon: Tv
    },
    {
      id: 2,
      name: "Nutricionista",
      price: "R$ 150,00",
      description: "Consulta com nutricionista especializado em nutrição esportiva",
      icon: Utensils
    },
    {
      id: 3,
      name: "Avaliação Física",
      price: "R$ 50,00",
      description: "Avaliação completa do seu condicionamento físico",
      icon: ActivitySquare
    }
  ];

  const handleWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Olá, gostaria de obter mais informações sobre o serviço de ${service}.`);
    window.open(`https://api.whatsapp.com/send?phone=5588992918463&text=${message}`, "_blank");
  };

  return (
    <section id="services" className="py-16 bg-black hidden">
      <div className="absolute w-full h-full z-0">
        <div className="absolute top-1/4 right-[20%] w-64 h-64 bg-maisvida-green rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[20%] w-72 h-72 bg-maisvida-red rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Nossos </span>
            <span className="text-green-500">Serviços</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Conheça os serviços adicionais disponíveis na Mais Vida Academia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="animate-on-scroll"
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-maisvida-green/50 transition-all duration-300 h-full">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-maisvida-green/10 flex items-center justify-center mb-4 border border-maisvida-green/20">
                    <service.icon className="w-6 h-6 text-maisvida-green" />
                  </div>
                  <CardTitle className="text-white text-2xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{service.price}</span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    {service.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <button 
                    onClick={() => handleWhatsApp(service.name)}
                    className="w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 bg-maisvida-green hover:bg-green-900 text-white"
                  >
                    Saiba Mais <ArrowRight size={16} />
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

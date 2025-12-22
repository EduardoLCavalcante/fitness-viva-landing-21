
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TemporaryRate } from "@/integrations/supabase/schema";

const DailyWeeklyRates = () => {
  // Fetch temporary rates from Supabase
  const { data: rates, isLoading } = useQuery({
    queryKey: ['temporary_rates-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('temporary_rates')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data as TemporaryRate[];
    }
  });

  const handleWhatsApp = (option: string) => {
    const message = encodeURIComponent(`Olá, gostaria de obter mais informações sobre o plano ${option}.`);
    window.open(`https://api.whatsapp.com/send?phone=5588992918463&text=${message}`, "_blank");
  };

  // Loading state
  if (isLoading) {
    return (
      <section id="daily-weekly" className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-12"></div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="h-64 bg-gray-800 rounded-lg"></div>
              <div className="h-64 bg-gray-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="daily-weekly" className="py-16 bg-black hidden">
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
            <span className="text-white">Planos </span>
            <span className="text-green-500">Temporários</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Opções flexíveis para quem precisa de acesso por períodos mais curtos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {rates?.map((rate, index) => (
            <motion.div
              key={rate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-maisvida-green/50 transition-all duration-300 h-full">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-maisvida-green/10 flex items-center justify-center mb-4 border border-maisvida-green/20">
                    {rate.name === "Diária" ? (
                      <Clock className="w-6 h-6 text-maisvida-green" />
                    ) : (
                      <Calendar className="w-6 h-6 text-maisvida-green" />
                    )}
                  </div>
                  <CardTitle className="text-white text-2xl">{rate.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{rate.price}</span>
                    <span className="text-gray-400 ml-2">/{rate.name === "Diária" ? "dia" : "semana"}</span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    {rate.description}
                  </p>
                  <ul className="space-y-2">
                    <li className="text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-maisvida-green rounded-full"></span>
                      Acesso à musculação
                    </li>
                    <li className="text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-maisvida-green rounded-full"></span>
                      Horário integral
                    </li>
                    {rate.name === "Semanal" && (
                      <li className="text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-maisvida-green rounded-full"></span>
                        Economia de mais de 50% vs. diárias
                      </li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <button 
                    onClick={() => handleWhatsApp(rate.name)}
                    className="w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 bg-maisvida-green hover:bg-green-900 text-white"
                  >
                    Obter Agora <ArrowRight size={16} />
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

export default DailyWeeklyRates;

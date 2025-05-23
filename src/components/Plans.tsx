
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plan, PlanFeature } from "@/integrations/supabase/schema";

const Plans = () => {
  const [annual, setAnnual] = useState(false);
  const [formData, setFormData] = useState({
    message: "Olá, gostaria de obter o  "
  });

  // Fetch plans from Supabase
  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['plans-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data as Plan[];
    }
  });

  // Fetch plan features from Supabase
  const { data: features, isLoading: featuresLoading } = useQuery({
    queryKey: ['plan_features-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plan_features')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data as PlanFeature[];
    }
  });

  const type = annual ? "fidelidade" : "mensal";

  const handleSubmit = (index: number) => {
    // Filtra os planos novamente para obter o mesmo array usado no map
    const filteredPlanos = plans?.filter(plan => plan.type === type) || [];

    // Obtém o plano correspondente ao índice clicado
    const selectedPlan = filteredPlanos[index];
    if (!selectedPlan) return;
    
    const whatsappMessage = encodeURIComponent(formData.message);
    window.location.href = `https://api.whatsapp.com/send?phone=5588992918463&text=${whatsappMessage}${selectedPlan.name}`;
    window.open("_blank");
  };
  // Loading state
  if (plansLoading || featuresLoading) {
    return (
      <section id="plans" className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-12"></div>
            <div className="grid md:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-96 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="plans" className="py-20 bg-black ">
      <div className="absolute w-full h-full z-0">
        <div className="absolute top-1/4 right-[20%] w-64 h-64 bg-maisvida-green rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[20%] w-72 h-72 bg-maisvida-red rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Escolha seu </span>
            <span className="text-green-500">Plano</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Oferecemos planos flexíveis para atender às suas necessidades e objetivos. Comece sua jornada de
            transformação hoje mesmo.
          </p>

         
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${annual ? "text-gray-400" : "text-white font-medium"}`}>Mensal</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full ${annual ? "bg-maisvida-green" : "bg-gray-800"} transition-colors focus:outline-none`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  annual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`ml-3 ${annual ? "text-white font-medium" : "text-gray-400"}`}>Fidelidade</span>
            <span className="ml-2 inline-flex items-center rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-500">
              Economize 20%
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans
            ?.filter(plan => plan.type === type)
            .map((plan, index) => {
              const planFeatures = features?.filter(feature => feature.plan_id === plan.id) || [];
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative rounded-2xl hover:border-maisvida-green/50 overflow-hidden border ${
                    plan.highlighted ? "border-green-500" : "border-gray-700"
                  } bg-gray-900/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        {annual ? 
                          plan.class === "default" ? 
                            `${plan.loyalty_price}` : 
                            `${plan.loyalty_price}` : 
                          `${plan.price}`
                        }
                      </span>
                      <span className="text-gray-400 ml-2">
                        {annual ? 
                          plan.class === "default" ? 
                            "/mês" : 
                            "" : 
                          "/mês"
                        }
                      </span>
                    </div>
                    <button
                      onClick={() => handleSubmit(index)}
                      className="w-full py-3 rounded-lg mb-6 flex items-center justify-center gap-2 transition-all duration-300 bg-maisvida-green hover:bg-green-900 text-white"
                    >
                      Assinar Agora <ArrowRight size={16} />
                    </button>

                    <div className="space-y-3">
                      {}
                      <p className="font-medium text-sm"></p>
                      {planFeatures.map((feature) => (
                        <div key={feature.id} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature.feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
        
        {/* Payment notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
              <div className="inline-block bg-gray-800/70 backdrop-blur-sm px-5 py-3 rounded-lg border border-gray-700">
            <p className="text-gray-300 text-sm">
              <span className="text-maisvida-green font-medium">Todas as formas de pagamento</span> 
              
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Plans;

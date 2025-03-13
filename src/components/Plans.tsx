
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Plans = () => {
  const plans = [
    {
      name: "Básico",
      price: "89,90",
      period: "mensal",
      features: [
        "Acesso à área de musculação",
        "Avaliação física inicial",
        "Plano de treino personalizado",
        "Acesso ao aplicativo básico"
      ],
      highlight: false,
      buttonText: "Assinar Agora"
    },
    {
      name: "Premium",
      price: "149,90",
      period: "mensal",
      features: [
        "Todos os benefícios do plano Básico",
        "Consulta com nutricionista",
        "Acesso a aulas coletivas",
        "Acesso completo ao aplicativo",
        "Acompanhamento semanal"
      ],
      highlight: true,
      buttonText: "Assinar Agora"
    },
    {
      name: "Família",
      price: "199,90",
      period: "mensal",
      features: [
        "Benefícios do plano Premium",
        "Até 3 dependentes",
        "Horários exclusivos",
        "Desconto em produtos parceiros",
        "Estacionamento gratuito"
      ],
      highlight: false,
      buttonText: "Assinar Agora"
    }
  ];

  return (
    <section id="plans" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-maisvida-dark mb-4">NOSSOS <span className="text-maisvida-green">PLANOS</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Escolha o plano perfeito para atingir seus objetivos e transformar sua vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-lg overflow-hidden ${plan.highlight ? 'transform md:-translate-y-4 shadow-xl border-2 border-maisvida-green' : 'shadow-lg'}`}
            >
              <div className={`p-8 ${plan.highlight ? 'bg-maisvida-green text-white' : 'bg-white text-maisvida-dark'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">R$ {plan.price}</span>
                  <span className="ml-1 text-sm opacity-80">/{plan.period}</span>
                </div>
                {plan.highlight && (
                  <div className="bg-white text-maisvida-green text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
                    Mais Popular
                  </div>
                )}
              </div>
              <div className="bg-white p-8">
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-maisvida-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-6 ${
                    plan.highlight 
                      ? 'bg-maisvida-green hover:bg-maisvida-green/80 text-white' 
                      : 'bg-white border-2 border-maisvida-green text-maisvida-green hover:bg-maisvida-green/10'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;

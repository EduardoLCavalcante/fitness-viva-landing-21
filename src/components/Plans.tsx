import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"

const Plans = () => {

  const [annual, setAnnual] = useState(false)
  const [formData, setFormData] = useState({
  
    message: "Olá, gostaria de obter o  "
  });

  const planos = [
    {
      nome: "Plano Básico",
      type: "mensal",
      class: "default" ,
      preco: "R$ 90,00",
      precofidelidade: "R$ 79,90",
      descricao: "Ideal para iniciantes",
      recursos: ["Acesso à musculação", "Horário comercial", "Avaliação física trimestral", "Acesso ao app básico"],
    },
    {
      nome: "Plano Anual",
      type: "fidelidade",
      class: "default" ,
      preco: "R$ 129,90",
      precofidelidade: "R$ 75,00",
      descricao: "Nosso plano mais popular.\nPAGAMENTO MENSAL." ,
      destaque: true,
      recursos: [
        "Acesso à musculação",
        
        "Horário integral",
        
        "Acesso ao app completo",
        
      ],
    },
    {
      nome: "Plano Semestral",
      type: "fidelidade",
      class: "default" ,
      preco: "R$ 199,90",
      precofidelidade: "R$ 80,00",
      descricao: "PAGAMENTO MENSAL",
      recursos: [
        "Acesso à musculação",
        
        "Horário integral",
        
        "Acesso ao app completo",
        
      ],
    },
    {
      nome: "Plano Trimestral",
      type: "fidelidade",
      class: "default" ,
      preco: "R$ 199,90",
      precofidelidade: "R$ 85,00",
      descricao: "PAGAMENTO MENSAL",
      recursos: [
        "Acesso à musculação",
        
        "Horário integral",
        
        "Acesso ao app completo",
        
      ],
    },
    {
      nome: "Plano Anual PREMIUM",
      type: "fidelidade",
      class: "premium" ,
      preco: "R$ 199,90",
      precofidelidade: "Escolha a opção",
      descricao: "PAGAMENTO MENSAL",
      recursos: [
        "Acesso à musculação",
        `Avaliação física a cada 3 meses - R$ 90,00`,	
        "Horário integral",
        "Mudança no treino a cada 3 meses - R$ 90,00",
        "Acesso ao app completo",
        "PC + Divulgação da marca na TV - R$ 120,00",
        "EBR - Participação no projeto Em Busca do resultado - R$ 90,00",
        "Nutricionista (1x por mês) + Prescrição de treino - R$ 150,00",
      ],
    },
    {
      nome: "Plano Semestral GOLD",
      type: "fidelidade",
      class: "gold" ,
      preco: "R$ 199,90",
      precofidelidade: "Escolha a opção",
      descricao: "PAGAMENTO MENSAL",
      recursos: [
        "Acesso à musculação",
        "Avaliação física a cada 2 meses - R$ 100,00",
        "Horário integral",
        "Mudança no treino a cada 2 meses - R$ 100,00",
        "Acesso ao app completo",
        "PC + Divulgação da marca na TV - R$ 125,00",
        "EBR - Participação no projeto Em Busca do resultado - R$ 95,00",
        "Nutricionista (1x por mês) + Prescrição de treino - R$ 155,00",
      ],
    },
    {
      nome: "Plano Trimestral SILVER",
      type: "fidelidade",
      class: "silver" ,
      preco: "R$ 199,90",
      precofidelidade: "Escolha a opção",
      descricao: "PAGAMENTO MENSAL",
      recursos: [
        "Acesso à musculação",
        "Avaliação física a cada mes - R$ 130,00",
        "Horário integral",
        "Mudança no treino a cada mes - R$ 130,00",
        "Acesso ao app completo",
        "PC + Divulgação da marca na TV - R$ 125,00",
      ],
    },
  ]

const pacotes = [
    {
      nome: "Casal",
      preco: "R$ 85,00",
      descricao: "Plano Premium para duas pessoas",
      desconto: "Economia de R$ 10,00",
    },
    {
      nome: "Família",
      preco: "R$ 85,00",
      descricao: "Plano Premium para até 4 pessoas",
      desconto: "Economia de R$ 20,00",
    },
  ]

const daysAndWeeks = [
  {
    nome: "Diária",
    descricao: "Acesso à musculação por um dia",
    preco: "R$ 15,00",
  },
  {
    nome: "Semanal",
    descricao: "Acesso à musculação durante a semana",
    preco: "R$ 30,00",
  },
  ]

  
const type = annual? "fidelidade" : "mensal"

 const pcView = "max-w-6xl "

 const handleSubmit = (index) => {

  // Filtra os planos novamente para obter o mesmo array usado no map
  const filteredPlanos = planos.filter(plan => plan.type === type);

  // Obtém o plano correspondente ao índice clicado
  const selectedPlan = filteredPlanos[index];
  const whatsappMessage = encodeURIComponent(formData.message);
  window.location.href = `https://api.whatsapp.com/send?phone=5588992918463&text=${whatsappMessage}${selectedPlan.nome}`;

  window.open("_blank");
};

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
          {planos.filter(planos => planos.type === type ).map((plan, index) => (
            <motion.div
              key={plan.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden border ${
                plan.destaque ? "border-green-500" : "border-gray-700"
              } bg-gray-900/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300`}
            >
              {plan.destaque && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{plan.nome}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.descricao}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {annual ? plan.class ==="default"? `${plan.precofidelidade}`: `${plan.precofidelidade}` : `${plan.preco}`}
                  </span>
                  <span className="text-gray-400 ml-2">{annual ? plan.class ==="default"? "/ano" :"" : "/mês"}</span>
                </div>
              {/* {console.log(index)} */}
                <button
                  onClick={()=> handleSubmit(index)}
                  className="w-full py-3 rounded-lg mb-6 flex items-center justify-center gap-2 transition-all duration-300 bg-maisvida-green hover:bg-green-900 text-white"
                >
                  Assinar Agora <ArrowRight size={16} />
                </button>

                <div className="space-y-3">
                  <p className="font-medium text-sm">Escolha uma opção :</p>
                  {plan.recursos.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}

                  {/* {plan.notIncluded.length > 0 && (
                    <>
                      <p className="font-medium text-sm mt-4">Não incluído:</p>
                      {plan.notIncluded.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <X className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </>
                  )} */}
                </div>
              </div>
            </motion.div>
          ))}
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
              <span className="text-maisvida-green font-medium">Aviso: </span> 
              Para pagamentos com Débito há acréscimo de R$ 3,00 e para Crédito R$ 5,00.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Plans;

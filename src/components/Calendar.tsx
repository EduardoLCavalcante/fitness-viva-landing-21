
import { AlertCircle, Calendar, ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SpecialDate } from '@/integrations/supabase/schema';

const CalendarSectionComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())



  

  // Fetch special dates from Supabase
  const { data: eventosEspeciais, isLoading } = useQuery({
    queryKey: ['special_dates-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('special_dates')
        .select('*')
        .order('month');
      
      if (error) {
        console.error('Error fetching special dates:', error);
        throw error;
      }
      
      console.log('Special dates fetched:', data);
      return data as SpecialDate[];
    }
  });

  // Funções do calendário
  const navegarMes = (direcao: number) => {
    const novoMes = new Date(currentMonth)
    novoMes.setMonth(novoMes.getMonth() + direcao)
    setCurrentMonth(novoMes)
    setSelectedEvent(null)
  }

  const formatarMesAno = (data: Date) => {
    return data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
  }

  // Get the current month in YYYY-MM format
  const getCurrentMonthString = () => {
    const year = currentMonth.getFullYear();
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  const getEventosDoMes = () => {
    if (!eventosEspeciais) return [];
    
    const mesAtual = getCurrentMonthString();
    console.log('Current month string:', mesAtual);
    console.log('Eventos especiais:', eventosEspeciais);
    
    const filtered = eventosEspeciais
      .filter(evento => evento.month === mesAtual)
      .sort((a, b) => {
        // Sort by id or any other criteria if needed
        return a.id - b.id;
      });
      
    console.log('Filtered events:', filtered);
    return filtered;
  }

  const getIconePorTipo = (tipo: string) => {
    switch (tipo) {
      case "fechado":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      case "evento":
        return <Calendar className="h-5 w-5 text-primary" />
      case "confraternizacao":
        return <PartyPopper className="h-5 w-5 text-yellow-400" />
      default:
        return <Calendar className="h-5 w-5 text-gray-400" />
    }
  }

  const getCorPorTipo = (tipo: string) => {
    switch (tipo) {
      case "fechado":
        return "bg-red-900/20 text-red-200 border-red-800"
      case "evento":
        return "bg-primary/20 text-primary border-primary/50"
      case "confraternizacao":
        return "bg-yellow-900/20 text-yellow-200 border-yellow-800"
      default:
        return "bg-gray-800 text-gray-200 border-gray-700"
    }
  }

  const getNomeTipo = (tipo: string) => {
    switch (tipo) {
      case "fechado":
        return "Academia Fechada"
      case "evento":
        return "Evento"
      case "confraternizacao":
        return "Confraternização"
      default:
        return "Outro"
    }
  }

  
  const eventosDoMes = getEventosDoMes();
  const temEventos = eventosDoMes.length > 0;

  

  // // Loading state
  // if (isLoading) {
  //   return (
  //     <section id="calendar" className="py-16 md:py-24 bg-black">
  //       <div className="container mx-auto px-4 text-center">
  //         <div className="animate-pulse flex flex-col items-center">
  //           <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
  //           <div className="h-4 bg-gray-700 rounded w-1/2 mb-12"></div>
  //           <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 w-full">
  //             <div className="h-96 bg-gray-800 rounded-lg"></div>
  //             <div className="space-y-4">
  //               <div className="h-40 bg-gray-800 rounded-lg"></div>
  //               <div className="h-40 bg-gray-800 rounded-lg"></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  console.log("Eventos a serem renderizados:", eventosDoMes);


  return (
    <section id="calendar" className="py-16 md:py-24 bg-black">
      <div className="absolute w-full h-full z-0">
        <div className="absolute top-1/4 right-[20%] w-64 h-64 bg-maisvida-green rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[20%] w-72 h-72 bg-maisvida-red rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CALENDÁRIO <span className="text-maisvida-green">MAIS VIDA</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Confira os próximos eventos, dias fechados e confraternizações da academia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div className="bg-maisvida-dark border-maisvida-green/30 rounded-lg shadow-md p-6 border animate-on-scroll">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navegarMes(-1)}
                className="p-2 rounded-full hover:bg-gray-800 text-gray-300"
                aria-label="Mês anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-semibold capitalize text-white">{formatarMesAno(currentMonth)}</h3>
              <button
                onClick={() => navegarMes(1)}
                className="p-2 rounded-full hover:bg-gray-800 text-gray-300"
                aria-label="Próximo mês"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {temEventos ? (
              <div className="space-y-4">
                {eventosDoMes.map((evento, index) => (
                  <div
                    key={evento.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedEvent === index ? getCorPorTipo(evento.type) : "border-gray-700 hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getIconePorTipo(evento.type)}
                        <span className="font-medium text-white">{evento.title}</span>
                      </div>
                    </div>

                    {selectedEvent === index && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="mb-2">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full ${getCorPorTipo(evento.type)}`}
                          >
                            {getNomeTipo(evento.type)}
                          </span>
                        </div>
                        <p className="text-gray-300">{evento.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-300">Nenhum evento neste mês</h4>
                <p className="text-gray-500 mt-2">Confira outros meses para ver eventos programados.</p>
              </div>
            )}
          </div>

          <div className="space-y-4 ">
            <div className="bg-maisvida-dark rounded-lg shadow-md p-6 border border-maisvida-green/30">
              <h3 className="text-xl font-semibold mb-4 text-white">Legenda</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-900/20 border border-red-800"></div>
                  <span className="text-gray-300">Academia Fechada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary/50"></div>
                  <span className="text-gray-300">Eventos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-900/20 border border-yellow-800"></div>
                  <span className="text-gray-300">Confraternizações</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-maisvida-dark shadow-md p-6 border border-maisvida-green/30">
              <h3 className="text-xl font-semibold mb-2 text-white">Eventos Anuais</h3>
              <p className="text-gray-400 mb-4">
                Nossa academia realiza diversos eventos ao longo do ano. Fique atento ao calendário para não perder
                nenhum!
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Em Busca do Resultado - 2 vezes no ano</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Crossvida - 4 vezes no ano</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Festa Junina - Junho</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Confraternização de Natal e Fim de Ano - Dezembro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalendarSectionComponent

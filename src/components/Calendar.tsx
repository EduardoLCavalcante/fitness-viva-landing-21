import { AlertCircle, Calendar, ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react'
import  { useState } from 'react'

  // Dados do calendário
  const diasEspeciais = [
    { data: "2025-01-05", tipo: "confraternizacao", titulo: "Confraternização Universal", descricao: "Retorno às atividades da academia" },
    { data: "2025-02-09", tipo: "confraternizacao", titulo: "Aniversário MaisVida", descricao: "Comemoração especial de aniversário" },
    { data: "2025-02-17", tipo: "evento", titulo: "CrossVida", descricao: "Evento especial de treinamento funcional" },
    { data: "2025-02-17", tipo: "fechado", titulo: "Carnaval", descricao: "Academia fechada" },
    { data: "2025-02-18", tipo: "fechado", titulo: "Cinzas", descricao: "Academia fechada" },
    { data: "2025-03-05", tipo: "fechado", titulo: "Data Magna", descricao: "A Data Magna, celebrada em 25 de março, é um feriado estadual no Ceará que comemora a abolição da escravidão no estado em 1884, quatro anos antes da Lei Áurea no Brasil." },
    { data: "2025-03-05", tipo: "evento", titulo: "Em Busca do Resultado", descricao: "Programa motivacional para alunos" },
    { data: "2025-03-08", tipo: "fechado", titulo: "Dia da Mulher", descricao: "Academia fechada" },
    { data: "2025-03-19", tipo: "fechado", titulo: "São José", descricao: "Academia fechada" },
    { data: "2025-04-10", tipo: "fechado", titulo: "Semana Santa", descricao: "Sexta e Sábado para Semana Santa" },
    { data: "2025-04-12", tipo: "evento", titulo: "Resultados EBR", descricao: "Academia fechada" },
    { data: "2025-04-21", tipo: "evento", titulo: "Crossvida", descricao: "Evento especial de treinamento funcional" },
    { data: "2025-04-21", tipo: "fechado", titulo: "Tiradentes", descricao: "Academia fechada" },
    { data: "2025-05-04", tipo: "fechado", titulo: "Dia do Trabalho", descricao: "Academia fechada" },
    { data: "2025-05-12", tipo: "fechado", titulo: "Dia das Mães", descricao: "O Dia das Mães, celebrado no segundo domingo de maio, é uma data especial dedicada a homenagear e celebrar todas as mães." },
    { data: "2025-06-08", tipo: "fechado", titulo: "Corpus Christi", descricao: "Corpus Christi é um feriado religioso celebrado na quinta-feira após o domingo da Santíssima Trindade. " },
    { data: "2025-06-21", tipo: "evento", titulo: "Crossvida", descricao: "Evento especial de treinamento funcional" },
    { data: "2025-06-12", tipo: "fechado", titulo: "Dia dos Namorados", descricao: "Dia especial para os casais" },
    { data: "2025-06-20", tipo: "confraternizacao", titulo: "Arraiá", descricao: "Festa junina na academia" },
    { data: "2025-07-20", tipo: "evento", titulo: "Dia do Amigo", descricao: "Treine com um amigo" },
    { data: "2025-08-15", tipo: "fechado", titulo: "Dia do Município", descricao: "Academia fechada" },
    { data: "2025-08-21", tipo: "evento", titulo: "Crossvida", descricao: "Evento especial de treinamento funcional" },
    { data: "2025-08-25", tipo: "fechado", titulo: "Dia dos Pais", descricao: "Academia fechada" },
    { data: "2025-09-07", tipo: "fechado", titulo: "Independência do Brasil", descricao: "Academia fechada" },
    { data: "2025-09-15", tipo: "evento", titulo: "Dia do Profissional de Educação Física", descricao: "Homenagem aos professores" },
    { data: "2025-10-12", tipo: "fechado", titulo: "Nossa Senhora Aparecida", descricao: "Academia fechada" },
    { data: "2025-10-31", tipo: "evento", titulo: "Halloween", descricao: "Treino temático" },
    { data: "2025-10-21", tipo: "evento", titulo: "Crossvida", descricao: "Evento especial de treinamento funcional" },
    { data: "2025-11-05", tipo: "evento", titulo: "Em Busca do Resultado", descricao: "Programa motivacional para alunos" },
    { data: "2025-11-02", tipo: "fechado", titulo: "Finados", descricao: "Academia fechada" },
    { data: "2025-11-15", tipo: "fechado", titulo: "Proclamação da República", descricao: "Academia fechada" },
    { data: "2025-11-20", tipo: "fechado", titulo: "Consciência Negra", descricao: "Academia fechada" },
    { data: "2025-12-10", tipo: "fechado", titulo: "Padroeira de Limoeiro", descricao: "Academia fechada" },
    { data: "2025-12-13", tipo: "fechado", titulo: "Santa Luzia", descricao: "Academia fechada" },
    { data: "2025-12-21", tipo: "evento", titulo: "Crossvida", descricao: "Evento especial de treinamento funcional" },
    { data: "2025-12-20", tipo: "confraternizacao", titulo: "Confraternização de Fim de Ano", descricao: "Encerramento das atividades do ano" },
    { data: "2025-12-25", tipo: "fechado", titulo: "Recesso (Natal e Réveillon)", descricao: "Academia fechada" },
    { data: "2025-12-12", tipo: "evento", titulo: "Resultados EBR", descricao: "Academia fechada" },
  ];
  

const CalendarSectionComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())


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

  const getEventosDoMes = () => {
    const mes = currentMonth.getMonth() + 1
    const ano = currentMonth.getFullYear()

    return diasEspeciais
      .filter((evento) => {
        const dataEvento = new Date(evento.data)
        return dataEvento.getMonth() + 1 === mes && dataEvento.getFullYear() === ano
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())  }


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

  const eventosDoMes = getEventosDoMes()
  const temEventos = eventosDoMes.length > 0


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
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedEvent === index ? getCorPorTipo(evento.tipo) : "border-gray-700 hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getIconePorTipo(evento.tipo)}
                      <span className="font-medium text-white">{evento.titulo}</span>
                    </div>
                    {/* <span className="text-sm text-gray-400">{formatarData(evento.data)}</span> */}
                  </div>

                  {selectedEvent === index && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="mb-2">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs rounded-full ${getCorPorTipo(evento.tipo)}`}
                        >
                          {getNomeTipo(evento.tipo)}
                        </span>
                      </div>
                      <p className="text-gray-300">{evento.descricao}</p>
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
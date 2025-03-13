
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { CalendarIcon, Calendar as CalendarSchedule, AlertTriangle, PartyPopper } from "lucide-react";

type Event = {
  id: number;
  date: Date;
  title: string;
  type: "event" | "closed" | "party";
  description: string;
};

const CalendarSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample events data
  const events: Event[] = [
    {
      id: 1,
      date: new Date(2024, 6, 15), // July 15, 2024
      title: "Avaliação Física",
      type: "event",
      description: "Avaliações físicas gratuitas para novos alunos."
    },
    {
      id: 2,
      date: new Date(2024, 6, 20), // July 20, 2024
      title: "Academia Fechada",
      type: "closed",
      description: "Academia fechada para manutenção de equipamentos."
    },
    {
      id: 3,
      date: new Date(2024, 7, 5), // August 5, 2024
      title: "Confraternização de Aniversário",
      type: "party",
      description: "Celebração do 3º aniversário da Mais Vida."
    },
    {
      id: 4,
      date: new Date(2024, 7, 10), // August 10, 2024
      title: "Workshop de Nutrição",
      type: "event",
      description: "Workshop sobre nutrição esportiva com especialistas."
    }
  ];

  // Find events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      )
    : [];

  // Find upcoming events (next 30 days)
  const today = new Date();
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(today.getDate() + 30);
  
  const upcomingEvents = events.filter(event => 
    event.date >= today && event.date <= thirtyDaysLater
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <section id="calendar" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CALENDÁRIO <span className="text-maisvida-green">MAIS VIDA</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Confira os próximos eventos, dias fechados e confraternizações da academia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 animate-on-scroll">
            <Card className="bg-maisvida-dark border-maisvida-green/30 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-maisvida-green" />
                  <span>Calendário de Eventos</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Selecione uma data para ver os eventos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar 
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md bg-maisvida-dark text-white p-0"
                  classNames={{
                    day_today: "bg-maisvida-green/20 text-white",
                    day_selected: "bg-maisvida-green text-black hover:bg-maisvida-green hover:text-black",
                  }}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1 lg:col-span-2 animate-on-scroll">
            <Tabs defaultValue="selected" className="h-full">
              <TabsList className="bg-maisvida-dark border border-maisvida-green/30 mb-6">
                <TabsTrigger value="selected" className="data-[state=active]:bg-maisvida-green data-[state=active]:text-black">
                  Data Selecionada
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-maisvida-green data-[state=active]:text-black">
                  Próximos Eventos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="selected" className="mt-0 h-full">
                <Card className="bg-maisvida-dark border-maisvida-green/30 h-full">
                  <CardHeader>
                    <CardTitle>
                      {date ? date.toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : "Nenhuma data selecionada"}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {selectedDateEvents.length 
                        ? `${selectedDateEvents.length} evento${selectedDateEvents.length > 1 ? 's' : ''} nesta data` 
                        : "Nenhum evento nesta data"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-4">
                        {selectedDateEvents.map(event => (
                          <div key={event.id} className="bg-black/50 p-4 rounded-lg border border-maisvida-green/20 flex">
                            <div className="mr-4 pt-1">
                              {event.type === "event" && (
                                <CalendarSchedule className="h-6 w-6 text-maisvida-green" />
                              )}
                              {event.type === "closed" && (
                                <AlertTriangle className="h-6 w-6 text-maisvida-red" />
                              )}
                              {event.type === "party" && (
                                <PartyPopper className="h-6 w-6 text-maisvida-green" />
                              )}
                            </div>
                            <div>
                              <h4 className={`text-lg font-semibold ${
                                event.type === "event" ? "text-maisvida-green" : 
                                event.type === "closed" ? "text-maisvida-red" : 
                                "text-maisvida-green"
                              }`}>
                                {event.title}
                              </h4>
                              <p className="text-gray-400 mt-1">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-500 mb-4" />
                        <p className="text-gray-400 text-center">
                          Não há eventos programados para esta data. <br />
                          Selecione outra data ou confira os próximos eventos.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-0 h-full">
                <Card className="bg-maisvida-dark border-maisvida-green/30 h-full">
                  <CardHeader>
                    <CardTitle>Próximos 30 Dias</CardTitle>
                    <CardDescription className="text-gray-400">
                      {upcomingEvents.length 
                        ? `${upcomingEvents.length} evento${upcomingEvents.length > 1 ? 's' : ''} nos próximos 30 dias` 
                        : "Nenhum evento nos próximos 30 dias"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingEvents.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingEvents.map(event => (
                          <div key={event.id} className="bg-black/50 p-4 rounded-lg border border-maisvida-green/20 flex">
                            <div className="mr-4 pt-1">
                              {event.type === "event" && (
                                <CalendarSchedule className="h-6 w-6 text-maisvida-green" />
                              )}
                              {event.type === "closed" && (
                                <AlertTriangle className="h-6 w-6 text-maisvida-red" />
                              )}
                              {event.type === "party" && (
                                <PartyPopper className="h-6 w-6 text-maisvida-green" />
                              )}
                            </div>
                            <div>
                              <div className="flex justify-between">
                                <h4 className={`text-lg font-semibold ${
                                  event.type === "event" ? "text-maisvida-green" : 
                                  event.type === "closed" ? "text-maisvida-red" : 
                                  "text-maisvida-green"
                                }`}>
                                  {event.title}
                                </h4>
                                <span className="text-sm text-gray-400">
                                  {event.date.toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <p className="text-gray-400 mt-1">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <CalendarIcon className="h-12 w-12 text-gray-500 mb-4" />
                        <p className="text-gray-400 text-center">
                          Não há eventos programados para os próximos 30 dias.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;

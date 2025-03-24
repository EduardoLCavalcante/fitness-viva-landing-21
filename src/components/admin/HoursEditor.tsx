
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessHour } from "@/integrations/supabase/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, X, Check, Clock, Plus } from "lucide-react";

export const HoursEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingHour, setEditingHour] = useState<BusinessHour | null>(null);
  const [addingNewHour, setAddingNewHour] = useState(false);
  const [newHour, setNewHour] = useState<Partial<BusinessHour>>({
    day_of_week: "",
    opening_time: "",
    closing_time: "",
    type: "Semana"
  });

  // Fetch business hours
  const { data: hours, isLoading } = useQuery({
    queryKey: ['business_hours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .order('type')
        .order('id');
      
      if (error) throw error;
      return data as BusinessHour[];
    }
  });

  // Update business hour mutation
  const updateHour = useMutation({
    mutationFn: async (hour: BusinessHour) => {
      const { data, error } = await supabase
        .from('business_hours')
        .update(hour)
        .eq('id', hour.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business_hours'] });
      toast({
        title: "Horário atualizado",
        description: "O horário de funcionamento foi atualizado com sucesso.",
      });
      setEditingHour(null);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao atualizar horário",
        description: "Ocorreu um erro ao atualizar o horário de funcionamento.",
        variant: "destructive",
      });
    }
  });

  // Add new business hour mutation
  const addHour = useMutation({
    mutationFn: async (hour: Partial<BusinessHour>) => {
      const { data, error } = await supabase
        .from('business_hours')
        .insert({
          day_of_week: hour.day_of_week!,
          opening_time: hour.opening_time!,
          closing_time: hour.closing_time!,
          type: hour.type || "Semana",
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business_hours'] });
      toast({
        title: "Horário adicionado",
        description: "O novo horário de funcionamento foi adicionado com sucesso.",
      });
      setAddingNewHour(false);
      setNewHour({
        day_of_week: "",
        opening_time: "",
        closing_time: "",
        type: "Semana"
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao adicionar horário",
        description: "Ocorreu um erro ao adicionar o horário de funcionamento.",
        variant: "destructive",
      });
    }
  });

  // Delete business hour mutation
  const deleteHour = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('business_hours')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business_hours'] });
      toast({
        title: "Horário removido",
        description: "O horário de funcionamento foi removido com sucesso.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao remover horário",
        description: "Ocorreu um erro ao remover o horário de funcionamento.",
        variant: "destructive",
      });
    }
  });

  const handleUpdateHour = (hour: BusinessHour) => {
    updateHour.mutate(hour);
  };

  const handleAddHour = () => {
    if (!newHour.day_of_week && newHour.type === "Final de Semana" || !newHour.opening_time || !newHour.closing_time) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para adicionar um novo horário.",
        variant: "destructive",
      });
      return;
    }
    addHour.mutate(newHour);
  };

  const handleDeleteHour = (id: number) => {
    if (confirm("Tem certeza que deseja remover este horário?")) {
      deleteHour.mutate(id);
    }
  };

  // Group hours by type
  const groupedHours = hours?.reduce((acc, hour) => {
    if (!acc[hour.type]) {
      acc[hour.type] = [];
    }
    acc[hour.type].push(hour);
    return acc;
  }, {} as Record<string, BusinessHour[]>) || {};

  if (isLoading) {
    return <div className="text-center py-12">Carregando horários de funcionamento...</div>;
  }

  const AddTypeDay = newHour.type === "Semana" ? "hidden":"";
  const EditTypeDay = editingHour?.type === "Semana" ? "hidden":"";
  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Horários de Funcionamento</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setAddingNewHour(!addingNewHour)}
              className="border-gray-700 hover:bg-gray-800"
            >
              {addingNewHour ? <X size={16} className="mr-1" /> : <Plus size={16} className="mr-1" />}
              {addingNewHour ? "Cancelar" : "Adicionar Horário"}
            </Button>
          </CardHeader>
          
          {addingNewHour && (
            <CardContent className="border-b border-gray-800 pb-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Tipo</Label>
                    <Select 
                      value={newHour.type} 
                      onValueChange={(value) => setNewHour({...newHour, type: value})}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="Semana">Semana</SelectItem>
                        <SelectItem value="Final de Semana">Final de Semana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className={`${AddTypeDay}`}>
                    <Label className="text-white">Dia da Semana</Label>
                    <Input 
                      value={newHour.day_of_week} 
                      onChange={(e) => setNewHour({...newHour, day_of_week: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Ex: Segunda-Sexta ou Sábado"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Abertura</Label>
                    <Input 
                      value={newHour.opening_time} 
                      onChange={(e) => setNewHour({...newHour, opening_time: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Ex: 05:00"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Fechamento</Label>
                    <Input 
                      value={newHour.closing_time} 
                      onChange={(e) => setNewHour({...newHour, closing_time: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Ex: 10:00"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleAddHour}
                    className="bg-maisvida-green hover:bg-green-700"
                  >
                    <Plus size={16} className="mr-1" /> Adicionar
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
          
          <CardContent className="space-y-6">
            {Object.keys(groupedHours).length > 0 ? (
              Object.entries(groupedHours).map(([type, typeHours]) => (
                <div key={type} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">{type == "Semana" ? "Horários": type} </h3>
                  <div className="space-y-4">
                    {typeHours.map((hour) => (
                      <div key={hour.id} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium text-white">{type == "Semana" ? "":hour.day_of_week}</div>
                          <div className="flex items-center gap-2">
                            {editingHour?.id !== hour.id && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setEditingHour(hour)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Pencil size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeleteHour(hour.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-400"
                                >
                                  <X size={16} />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {editingHour?.id === hour.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              {/* <div>
                                <Label className="text-white">Tipo</Label>
                                <Select 
                                  value={editingHour.type} 
                                  onValueChange={(value) => setEditingHour({...editingHour, type: value})}
                                >
                                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Selecione o tipo" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                    <SelectItem value="Semana">Semana</SelectItem>
                                    <SelectItem value="Final de Semana">Final de Semana</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div> */}
                              <div className={`${EditTypeDay}`}>
                                <Label className="text-white">Dia da Semana</Label>
                                <Input 
                                  value={editingHour.day_of_week} 
                                  onChange={(e) => setEditingHour({...editingHour, day_of_week: e.target.value})}
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-white">Abertura</Label>
                                <Input 
                                  value={editingHour.opening_time} 
                                  onChange={(e) => setEditingHour({...editingHour, opening_time: e.target.value})}
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-white">Fechamento</Label>
                                <Input 
                                  value={editingHour.closing_time} 
                                  onChange={(e) => setEditingHour({...editingHour, closing_time: e.target.value})}
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setEditingHour(null)}
                                className="border-gray-700 hover:bg-gray-800"
                              >
                                <X size={16} className="mr-1" /> Cancelar
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm" 
                                onClick={() => handleUpdateHour(editingHour)}
                                className="bg-maisvida-green hover:bg-green-700"
                              >
                                <Check size={16} className="mr-1" /> Salvar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock size={16} className="text-gray-500" />
                            {hour.opening_time === "Fechado" ? (
                              <span>Fechado</span>
                            ) : (
                              <span>{hour.opening_time} - {hour.closing_time}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">Nenhum horário cadastrado. Adicione o primeiro horário utilizando o botão acima.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

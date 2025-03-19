
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
import { Pencil, X, Check, Clock } from "lucide-react";

export const HoursEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingHour, setEditingHour] = useState<BusinessHour | null>(null);

  // Fetch business hours
  const { data: hours, isLoading } = useQuery({
    queryKey: ['business_hours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
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

  const handleUpdateHour = (hour: BusinessHour) => {
    updateHour.mutate(hour);
  };

  if (isLoading) {
    return <div className="text-center py-12">Carregando horários de funcionamento...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Horários de Funcionamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hours?.map((hour) => (
              <div key={hour.id} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-white">{hour.day_of_week}</div>
                  {editingHour?.id !== hour.id && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditingHour(hour)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil size={16} />
                    </Button>
                  )}
                </div>
                
                {editingHour?.id === hour.id ? (
                  <div className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

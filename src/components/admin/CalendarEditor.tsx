
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SpecialDate } from "@/integrations/supabase/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2, X, Check, Calendar } from "lucide-react";

// Define the shape of the new date object to ensure required fields
type NewSpecialDate = {
  month: string;
  type: string;
  title: string;
  description: string | null;
};

export const CalendarEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [editingDate, setEditingDate] = useState<SpecialDate | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newDate, setNewDate] = useState<NewSpecialDate>({
    month: "",
    type: "evento",
    title: "",
    description: null
  });

  // Fetch special dates
  const { data: specialDates, isLoading } = useQuery({
    queryKey: ['special_dates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('special_dates')
        .select('*')
        .order('month');
      
      if (error) throw error;
      return data as SpecialDate[];
    }
  });

  // Update date mutation
  const updateDate = useMutation({
    mutationFn: async (date: SpecialDate) => {
      const { data, error } = await supabase
        .from('special_dates')
        .update(date)
        .eq('id', date.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special_dates'] });
      toast({
        title: "Data atualizada",
        description: "A data especial foi atualizada com sucesso.",
      });
      setEditingDate(null);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao atualizar data",
        description: "Ocorreu um erro ao atualizar a data especial.",
        variant: "destructive",
      });
    }
  });

  // Add date mutation - now properly typed
  const addDate = useMutation({
    mutationFn: async (date: NewSpecialDate) => {
      const { data, error } = await supabase
        .from('special_dates')
        .insert(date)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special_dates'] });
      toast({
        title: "Data adicionada",
        description: "A data especial foi adicionada com sucesso.",
      });
      setIsAddingNew(false);
      setNewDate({
        month: "",
        type: "evento",
        title: "",
        description: null
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao adicionar data",
        description: "Ocorreu um erro ao adicionar a data especial.",
        variant: "destructive",
      });
    }
  });

  // Delete date mutation
  const deleteDate = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('special_dates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special_dates'] });
      toast({
        title: "Data removida",
        description: "A data especial foi removida com sucesso.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao remover data",
        description: "Ocorreu um erro ao remover a data especial.",
        variant: "destructive",
      });
    }
  });

  const handleUpdateDate = (date: SpecialDate) => {
    updateDate.mutate(date);
  };

  const handleAddDate = () => {
    if (!newDate.month || !newDate.title) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha o mês e o título.",
        variant: "destructive",
      });
      return;
    }
    
    // Now we're passing a properly typed object with all required fields
    addDate.mutate(newDate);
  };

  const handleDeleteDate = (id: number) => {
    if (confirm("Tem certeza que deseja remover esta data especial?")) {
      deleteDate.mutate(id);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "fechado":
        return "Academia Fechada";
      case "evento":
        return "Evento";
      case "confraternizacao":
        return "Confraternização";
      default:
        return "Outro";
    }
  };

  // Helper to format month for display
  const formatMonth = (monthString: string) => {
    try {
      const [year, month] = monthString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    } catch (e) {
      return monthString;
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Carregando datas especiais...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Datas Especiais</h2>
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="bg-maisvida-green hover:bg-green-700"
          disabled={isAddingNew}
        >
          <Plus size={16} className="mr-2" /> Adicionar Data
        </Button>
      </div>

      {isAddingNew && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Nova Data Especial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Mês (YYYY-MM)</Label>
              <Input 
                value={newDate.month} 
                onChange={(e) => setNewDate({...newDate, month: e.target.value})}
                placeholder="2025-01"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Formato: YYYY-MM (Ex: 2025-01 para Janeiro de 2025)</p>
            </div>

            <div>
              <Label className="text-white">Tipo</Label>
              <Select 
                value={newDate.type} 
                onValueChange={(value) => setNewDate({...newDate, type: value})}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="fechado">Academia Fechada</SelectItem>
                  <SelectItem value="evento">Evento</SelectItem>
                  <SelectItem value="confraternizacao">Confraternização</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Título</Label>
              <Input 
                value={newDate.title} 
                onChange={(e) => setNewDate({...newDate, title: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Descrição</Label>
              <Textarea 
                value={newDate.description || ''} 
                onChange={(e) => setNewDate({...newDate, description: e.target.value || null})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsAddingNew(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              <X size={16} className="mr-1" /> Cancelar
            </Button>
            <Button 
              variant="default" 
              onClick={handleAddDate}
              className="bg-maisvida-green hover:bg-green-700"
            >
              <Check size={16} className="mr-1" /> Adicionar
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4">
        {specialDates?.map((date) => (
          <Card key={date.id} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                {editingDate?.id === date.id ? (
                  <Input 
                    value={editingDate.title} 
                    onChange={(e) => setEditingDate({...editingDate, title: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <div className="flex justify-between w-full">
                    <span>{date.title}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingDate(date)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteDate(date.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {editingDate?.id === date.id ? (
                  <div className="space-y-4 pt-2">
                    <div>
                      <Label className="text-white">Mês (YYYY-MM)</Label>
                      <Input 
                        value={editingDate.month} 
                        onChange={(e) => setEditingDate({...editingDate, month: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Tipo</Label>
                      <Select 
                        value={editingDate.type} 
                        onValueChange={(value) => setEditingDate({...editingDate, type: value})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="fechado">Academia Fechada</SelectItem>
                          <SelectItem value="evento">Evento</SelectItem>
                          <SelectItem value="confraternizacao">Confraternização</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white">Descrição</Label>
                      <Textarea 
                        value={editingDate.description || ''} 
                        onChange={(e) => setEditingDate({...editingDate, description: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-1">
                    <Calendar size={14} className="text-gray-500" />
                    <span>{formatMonth(date.month)}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs" 
                      style={{
                        backgroundColor: 
                          date.type === 'fechado' ? 'rgba(220, 38, 38, 0.2)' : 
                          date.type === 'evento' ? 'rgba(16, 185, 129, 0.2)' : 
                          'rgba(245, 158, 11, 0.2)',
                        color: 
                          date.type === 'fechado' ? '#ef4444' : 
                          date.type === 'evento' ? '#10b981' : 
                          '#f59e0b',
                        border: `1px solid ${
                          date.type === 'fechado' ? '#b91c1c' : 
                          date.type === 'evento' ? '#059669' : 
                          '#d97706'
                        }`
                      }}>
                      {getTypeLabel(date.type)}
                    </span>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!editingDate || editingDate.id !== date.id ? (
                <p className="text-sm text-gray-300">{date.description}</p>
              ) : null}
            </CardContent>
            
            {editingDate?.id === date.id && (
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditingDate(null)}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  <X size={16} className="mr-1" /> Cancelar
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => handleUpdateDate(editingDate)}
                  className="bg-maisvida-green hover:bg-green-700"
                >
                  <Check size={16} className="mr-1" /> Salvar
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

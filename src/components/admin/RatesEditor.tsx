
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TemporaryRate } from "@/integrations/supabase/schema";
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
import { Label } from "@/components/ui/label";
import { Pencil, X, Check } from "lucide-react";

export const RatesEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingRate, setEditingRate] = useState<TemporaryRate | null>(null);

  // Fetch rates
  const { data: rates, isLoading } = useQuery({
    queryKey: ['temporary_rates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('temporary_rates')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data as TemporaryRate[];
    }
  });

  // Update rate mutation
  const updateRate = useMutation({
    mutationFn: async (rate: TemporaryRate) => {
      const { data, error } = await supabase
        .from('temporary_rates')
        .update(rate)
        .eq('id', rate.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temporary_rates'] });
      toast({
        title: "Taxa atualizada",
        description: "A taxa temporária foi atualizada com sucesso.",
      });
      setEditingRate(null);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao atualizar taxa",
        description: "Ocorreu um erro ao atualizar a taxa temporária.",
        variant: "destructive",
      });
    }
  });

  const handleUpdateRate = (rate: TemporaryRate) => {
    updateRate.mutate(rate);
  };

  if (isLoading) {
    return <div className="text-center py-12">Carregando taxas temporárias...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {rates?.map((rate) => (
          <Card key={rate.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>
                {editingRate?.id === rate.id ? (
                  <Input 
                    value={editingRate.name} 
                    onChange={(e) => setEditingRate({...editingRate, name: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <div className="flex justify-between">
                    <span>{rate.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditingRate(rate)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil size={16} />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {editingRate?.id === rate.id ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Preço</Label>
                    <Input 
                      value={editingRate.price} 
                      onChange={(e) => setEditingRate({...editingRate, price: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Descrição</Label>
                    <Textarea 
                      value={editingRate.description} 
                      onChange={(e) => setEditingRate({...editingRate, description: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white text-xl">{rate.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{rate.description}</p>
                </>
              )}
            </CardContent>
            
            {editingRate?.id === rate.id && (
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditingRate(null)}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  <X size={16} className="mr-1" /> Cancelar
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => handleUpdateRate(editingRate)}
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

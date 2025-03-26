
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plan, PlanFeature } from "@/integrations/supabase/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { 
  Pencil, 
  Plus, 
  Trash2, 
  X, 
  Check, 
  AlertCircle, 
  PlusCircle 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const PlansEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [editingFeature, setEditingFeature] = useState<{planId: number, feature: string, id?: number} | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: "",
    type: "mensal",
    class: "default",
    price: "",
    loyalty_price: "",
    description: "",
    highlighted: false
  });

  // Fetch plans
  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data as Plan[];
    }
  });

  // Fetch plan features
  const { data: features, isLoading: featuresLoading } = useQuery({
    queryKey: ['plan_features'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plan_features')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data as PlanFeature[];
    }
  });

  // Update plan mutation
  const updatePlan = useMutation({
    mutationFn: async (plan: Plan) => {
      const { data, error } = await supabase
        .from('plans')
        .update(plan)
        .eq('id', plan.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: "Plano atualizado",
        description: "O plano foi atualizado com sucesso.",
      });
      setEditingPlan(null);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao atualizar plano",
        description: "Ocorreu um erro ao atualizar o plano.",
        variant: "destructive",
      });
    }
  });

  // Create plan mutation
  const createPlan = useMutation({
    mutationFn: async (plan: Partial<Plan>) => {
      const { data, error } = await supabase
        .from('plans')
        .insert([{
          name: plan.name,
          type: plan.type,
          class: plan.class,
          price: plan.price,
          loyalty_price: plan.loyalty_price,
          description: plan.description,
          highlighted: plan.highlighted
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: "Plano criado",
        description: "O plano foi criado com sucesso.",
      });
      setIsNewPlanDialogOpen(false);
      setNewPlan({
        name: "",
        type: "mensal",
        class: "default",
        price: "",
        loyalty_price: "",
        description: "",
        highlighted: false
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao criar plano",
        description: "Ocorreu um erro ao criar o plano.",
        variant: "destructive",
      });
    }
  });

  // Delete plan mutation
  const deletePlan = useMutation({
    mutationFn: async (planId: number) => {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', planId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      queryClient.invalidateQueries({ queryKey: ['plan_features'] });
      toast({
        title: "Plano removido",
        description: "O plano foi removido com sucesso.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao remover plano",
        description: "Ocorreu um erro ao remover o plano.",
        variant: "destructive",
      });
    }
  });

  // Update feature mutation
  const updateFeature = useMutation({
    mutationFn: async ({ id, feature }: { id: number, feature: string }) => {
      const { data, error } = await supabase
        .from('plan_features')
        .update({ feature })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan_features'] });
      toast({
        title: "Recurso atualizado",
        description: "O recurso do plano foi atualizado com sucesso.",
      });
      setEditingFeature(null);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao atualizar recurso",
        description: "Ocorreu um erro ao atualizar o recurso do plano.",
        variant: "destructive",
      });
    }
  });

  // Add feature mutation
  const addFeature = useMutation({
    mutationFn: async ({ plan_id, feature }: { plan_id: number, feature: string }) => {
      const { data, error } = await supabase
        .from('plan_features')
        .insert({ plan_id, feature })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan_features'] });
      toast({
        title: "Recurso adicionado",
        description: "O recurso foi adicionado ao plano com sucesso.",
      });
      setNewFeature("");
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao adicionar recurso",
        description: "Ocorreu um erro ao adicionar o recurso ao plano.",
        variant: "destructive",
      });
    }
  });

  // Delete feature mutation
  const deleteFeature = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('plan_features')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan_features'] });
      toast({
        title: "Recurso removido",
        description: "O recurso foi removido do plano com sucesso.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao remover recurso",
        description: "Ocorreu um erro ao remover o recurso do plano.",
        variant: "destructive",
      });
    }
  });

  const handleUpdatePlan = (plan: Plan) => {
    updatePlan.mutate(plan);
  };

  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.price || !newPlan.loyalty_price) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    createPlan.mutate(newPlan);
  };

  const handleDeletePlan = (planId: number) => {
    if (confirm("Tem certeza que deseja remover este plano? Esta ação não pode ser desfeita e removerá todos os recursos associados.")) {
      deletePlan.mutate(planId);
    }
  };

  const handleUpdateFeature = (id: number, feature: string) => {
    updateFeature.mutate({ id, feature });
  };

  const handleAddFeature = (planId: number) => {
    if (!newFeature.trim()) {
      toast({
        title: "Campo vazio",
        description: "Por favor, digite um recurso para adicionar.",
        variant: "destructive",
      });
      return;
    }
    
    addFeature.mutate({ plan_id: planId, feature: newFeature });
  };

  const handleDeleteFeature = (id: number) => {
    if (confirm("Tem certeza que deseja remover este recurso?")) {
      deleteFeature.mutate(id);
    }
  };

  if (plansLoading || featuresLoading) {
    return <div className="text-center py-12">Carregando planos...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Lista de Planos</h3>
        <Dialog open={isNewPlanDialogOpen} onOpenChange={setIsNewPlanDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-maisvida-green hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Plano</DialogTitle>
              <DialogDescription className="text-gray-400">
                Preencha os detalhes do novo plano abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do plano *</Label>
                <Input
                  id="name"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de plano *</Label>
                <Select 
                  value={newPlan.type} 
                  onValueChange={(value) => setNewPlan({...newPlan, type: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="fidelidade">Fidelidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Classe *</Label>
                <Select 
                  value={newPlan.class} 
                  onValueChange={(value) => setNewPlan({...newPlan, class: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione a classe" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="ex: R$ 99,90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loyalty_price">Preço Fidelidade *</Label>
                <Input
                  id="loyalty_price"
                  value={newPlan.loyalty_price}
                  onChange={(e) => setNewPlan({...newPlan, loyalty_price: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="ex: R$ 89,90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newPlan.description || ''}
                  onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="highlighted"
                  type="checkbox"
                  checked={newPlan.highlighted || false}
                  onChange={(e) => setNewPlan({...newPlan, highlighted: e.target.checked})}
                  className="h-4 w-4"
                />
                <Label htmlFor="highlighted">Plano destacado</Label>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsNewPlanDialogOpen(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Cancelar
              </Button>
              <Button 
                className="bg-maisvida-green hover:bg-green-700"
                onClick={handleCreatePlan}
              >
                Adicionar Plano
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans?.map((plan) => (
          <Card key={plan.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>
                {editingPlan?.id === plan.id ? (
                  <Input 
                    value={editingPlan.name} 
                    onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <div className="flex justify-between">
                    <span>{plan.name}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingPlan(plan)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeletePlan(plan.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </CardTitle>
              
              {editingPlan?.id === plan.id ? (
                <div className="space-y-2">
                  <div>
                    <Label className="text-white">Tipo</Label>
                    <Select 
                      value={editingPlan.type} 
                      onValueChange={(value) => setEditingPlan({...editingPlan, type: value})}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="fidelidade">Fidelidade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-white">Classe</Label>
                    <Select 
                      value={editingPlan.class} 
                      onValueChange={(value) => setEditingPlan({...editingPlan, class: value})}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecione a classe" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-white">Preço</Label>
                    <Input 
                      value={editingPlan.price} 
                      onChange={(e) => setEditingPlan({...editingPlan, price: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Preço Fidelidade</Label>
                    <Input 
                      value={editingPlan.loyalty_price} 
                      onChange={(e) => setEditingPlan({...editingPlan, loyalty_price: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Descrição</Label>
                    <Textarea 
                      value={editingPlan.description || ''} 
                      onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Destacado</Label>
                    <input 
                      type="checkbox" 
                      checked={editingPlan.highlighted} 
                      onChange={(e) => setEditingPlan({...editingPlan, highlighted: e.target.checked})}
                      className="h-4 w-4"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingPlan(null)}
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <X size={16} className="mr-1" /> Cancelar
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleUpdatePlan(editingPlan)}
                      className="bg-maisvida-green hover:bg-green-700"
                    >
                      <Check size={16} className="mr-1" /> Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <CardDescription className="text-gray-400">
                  Tipo: {plan.type === 'mensal' ? 'Mensal' : 'Fidelidade'}<br />
                  Preço: {plan.price}<br />
                  Preço Fidelidade: {plan.loyalty_price}
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent className="space-y-4">
              <h4 className="font-medium text-white">Recursos</h4>
              <ul className="space-y-2">
                {features
                  ?.filter(feature => feature.plan_id === plan.id)
                  .map(feature => (
                    <li key={feature.id} className="flex items-start gap-2 group">
                      {editingFeature?.id === feature.id ? (
                        <div className="flex flex-col w-full gap-2">
                          <Input 
                            value={editingFeature.feature} 
                            onChange={(e) => setEditingFeature({...editingFeature, feature: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setEditingFeature(null)}
                              className="border-gray-700 hover:bg-gray-800"
                            >
                              <X size={16} /> Cancelar
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm" 
                              onClick={() => handleUpdateFeature(feature.id, editingFeature.feature)}
                              className="bg-maisvida-green hover:bg-green-700"
                            >
                              <Check size={16} /> Salvar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Check size={16} className="text-maisvida-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300 flex-grow">{feature.feature}</span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingFeature({planId: plan.id, feature: feature.feature, id: feature.id})}
                              className="h-6 w-6 p-0"
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteFeature(feature.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-400"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <div className="w-full">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Novo recurso..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => handleAddFeature(plan.id)}
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

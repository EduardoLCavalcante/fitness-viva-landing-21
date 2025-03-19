
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PlansEditor } from "@/components/admin/PlansEditor";
import { RatesEditor } from "@/components/admin/RatesEditor";
import { CalendarEditor } from "@/components/admin/CalendarEditor";
import { HoursEditor } from "@/components/admin/HoursEditor";

const AdminPage = () => {
  return (
    <AdminLayout>
      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="mb-8 bg-gray-900 border border-gray-800 p-1">
          <TabsTrigger 
            value="plans"
            className="data-[state=active]:bg-maisvida-green data-[state=active]:text-white"
          >
            Planos
          </TabsTrigger>
          <TabsTrigger 
            value="rates"
            className="data-[state=active]:bg-maisvida-green data-[state=active]:text-white"
          >
            Taxas Temporárias
          </TabsTrigger>
          <TabsTrigger 
            value="calendar"
            className="data-[state=active]:bg-maisvida-green data-[state=active]:text-white"
          >
            Calendário
          </TabsTrigger>
          <TabsTrigger 
            value="hours"
            className="data-[state=active]:bg-maisvida-green data-[state=active]:text-white"
          >
            Horários
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Editar Planos</h2>
          <PlansEditor />
        </TabsContent>
        
        <TabsContent value="rates" className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Editar Taxas Temporárias</h2>
          <RatesEditor />
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Editar Calendário</h2>
          <CalendarEditor />
        </TabsContent>
        
        <TabsContent value="hours" className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Editar Horários de Funcionamento</h2>
          <HoursEditor />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminPage;

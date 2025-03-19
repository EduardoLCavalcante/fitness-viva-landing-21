
import { useState, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "./LoginForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, LogOut, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut, loading } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-maisvida-green"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold">Painel Administrativo - Mais Vida</h1>
          
          {isMobile ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              
              {mobileMenuOpen && (
                <div className="absolute top-16 right-0 left-0 bg-gray-900 border-b border-gray-800 p-4 z-50 md:hidden">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
                      <User size={18} className="text-maisvida-green" />
                      <span className="text-sm overflow-hidden text-ellipsis">{user.email}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={signOut}
                      className="border-gray-700 hover:bg-gray-800 w-full"
                    >
                      <LogOut size={16} className="mr-2" /> Sair
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={18} className="text-maisvida-green" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="border-gray-700 hover:bg-gray-800"
              >
                <LogOut size={16} className="mr-2" /> Sair
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
};


import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import LocationMap from "./LocationMap";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Coordenadas para São Paulo (puedes cambiar estas coordenadas a la ubicación exacta de tu gimnasio)
  const gymLocation: [number, number] = [-23.550520, -46.633308];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Patrones decorativos */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-maisvida-green/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-maisvida-red/5 rounded-full blur-2xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-maisvida-dark mb-4">ENTRE EM <span className="text-maisvida-green">CONTATO</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para ajudar você a iniciar sua jornada de transformação. Fale conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-maisvida-green/10 p-3 rounded-full mr-4 group-hover:bg-maisvida-green/20 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-maisvida-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Localização</h4>
                    <p className="text-gray-600">Av. Principal, 1000 - Centro</p>
                    <p className="text-gray-600">São Paulo, SP - Brasil</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-maisvida-green/10 p-3 rounded-full mr-4 group-hover:bg-maisvida-green/20 transition-all duration-300">
                    <Phone className="h-6 w-6 text-maisvida-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Telefone</h4>
                    <p className="text-gray-600">+55 (11) 99999-9999</p>
                    <p className="text-gray-600">+55 (11) 3333-3333</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-maisvida-green/10 p-3 rounded-full mr-4 group-hover:bg-maisvida-green/20 transition-all duration-300">
                    <Mail className="h-6 w-6 text-maisvida-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">contato@maisvida.com.br</p>
                    <p className="text-gray-600">suporte@maisvida.com.br</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6">Horário de Funcionamento</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Segunda - Sexta:</span>
                  <span className="text-gray-600">6:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sábado:</span>
                  <span className="text-gray-600">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Domingo:</span>
                  <span className="text-gray-600">8:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                    className="w-full transition-all duration-300 focus:ring-maisvida-green"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                      className="w-full transition-all duration-300 focus:ring-maisvida-green"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className="w-full transition-all duration-300 focus:ring-maisvida-green"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Digite sua mensagem aqui..."
                    rows={4}
                    required
                    className="w-full transition-all duration-300 focus:ring-maisvida-green"
                  />
                </div>
                
                <Button type="submit" className="bg-maisvida-green hover:bg-maisvida-green/80 text-white w-full py-6 transition-all duration-300 transform hover:scale-[1.02]">
                  <Send className="mr-2 h-5 w-5" /> Enviar Mensagem
                </Button>
              </form>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              <h3 className="text-2xl font-bold mb-4">Nossa Localização</h3>
              <LocationMap position={gymLocation} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

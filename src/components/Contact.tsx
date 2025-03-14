
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
 
    message: ""
  });

  // Coordenadas para MAIS VIDA Studio de Musculação em Russas, Ceará, Brasil
  const gymLocation: [number, number] = [-5.1538788, -38.0926763];

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
    
      message: ""
    });

    const whatsappMessage = encodeURIComponent(formData.message);
    window.location.href = `https://api.whatsapp.com/send?phone=5588992918463&text=${whatsappMessage}`;

    window.open("_blank");
  };


    console.log(formData.message)
  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden">
      {/* Patrones decorativos */}
      <div className="absolute top-0 left-0 w-full h-40  opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-maisvida-green/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-maisvida-red/5 rounded-full blur-2xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-maisvida-white mb-4">ENTRE EM <span className="text-maisvida-green">CONTATO</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Estamos prontos para ajudar você a iniciar sua jornada de transformação. Fale conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-maisvida-dark p-8 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-maisvida-green/10 p-3 rounded-full mr-4 group-hover:bg-maisvida-green/20 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-maisvida-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold ">Localização</h4>
                    <p className="text-gray-200">R. Joaquim Saraiva, 84 - Populares</p>
                    <p className="text-gray-200">Limoeiro do Norte, Ceará - Brasil</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-maisvida-green/10 p-3 rounded-full mr-4 group-hover:bg-maisvida-green/20 transition-all duration-300">
                    <Phone className="h-6 w-6 text-maisvida-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold ">Telefone</h4>
                    <p className="text-gray-200">+55 (88) 99291-8463</p>
                   
                  </div>
                </div>
                
              
              </div>
            </div>
            
            <div className="bg-maisvida-dark  p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6">Horário de Funcionamento</h3>
              <div className="space-y-3 ">
                <div className="flex justify-center">
                  <ul className="text-center">
                  <span className="font-semibold text-center">Segunda - Sexta:</span>
                  <li className="text-gray-200">5:00 - 10:00</li>
                  <li className="text-gray-200">12:00 - 13:00</li>
                  <li className="text-gray-200">15:00 - 21:00</li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <ul className="text-center">
                    <span className="font-semibold ">Sábado:</span>
                    <li className="text-gray-200">6:00 - 10:00</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 gap-8">
            <div className="bg-maisvida-dark p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-6 ">Envie uma Mensagem</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
   
                
       
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
                    className="w-full h-[200px] transition-all duration-300 focus:ring-maisvida-green"
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

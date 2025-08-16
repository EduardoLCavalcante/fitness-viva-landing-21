import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const gymSectors = [
  {
    id: 1,
    src: "/lovable-uploads/80063009-e50d-4b91-b035-6ee1ab313805.png",
    title: "FUNCIONAL",
    description: "Espaço dedicado ao treinamento funcional com equipamentos modernos para desenvolver força, mobilidade e resistência.",
    color: "text-blue-400"
  },
  {
    id: 2,
    src: "/lovable-uploads/6bda925c-886d-41b5-b03e-447697d06a5d.png",
    title: "KIDS",
    description: "Área especial para crianças com piso emborrachado colorido, proporcionando um ambiente seguro e divertido.",
    color: "text-yellow-400"
  },
  {
    id: 3,
    src: "/lovable-uploads/dd62cbe6-dcb3-44ef-9d3d-4f7bc320e651.png",
    title: "CARDIO",
    description: "Zona cardiovascular completa com esteiras, bikes e equipamentos de última geração para treinos aeróbicos.",
    color: "text-red-400"
  },
  {
    id: 4,
    src: "/lovable-uploads/4d4a429c-ad59-493a-80de-e2a6c260bb10.png",
    title: "MUSCULAÇÃO",
    description: "Área principal de musculação com equipamentos profissionais para hipertrofia e fortalecimento muscular.",
    color: "text-maisvida-green"
  }
];

const GallerySection = () => {

  const [activeSector,setActiveSector] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);


   useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold mb-4">
            NOSSOS <span className="text-maisvida-green">SETORES</span>
          </h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore os diferentes setores da nossa academia, cada um projetado especialmente para atender suas necessidades de treino.
          </p>
        </div>
        
        <div className="animate-on-scroll">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {gymSectors.map((sector) => { 
                const isActive = activeSector === sector.id;

                return (
                  <CarouselItem
                    key={sector.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2"
                  >
                    <div
                    onClick={() =>
                        isMobile && setActiveSector(isActive ? null : sector.id)
                    }
                      className="relative overflow-hidden rounded-lg shadow-xl group h-96 cursor-pointer"
                    >
                      {/* Image Background */}
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 
                          ${
                            isMobile
                              ? isActive && "scale-110"
                              : "group-hover:scale-110"
                          }
                        `}
                        style={{
                          backgroundImage: `url(${sector.src})`,
                        }}
                      />

                      {/* Overlay */}
                      <div
                        className={`absolute inset-0 transition-all duration-300
                          ${
                            isMobile
                              ? isActive
                                ? "bg-black/20"
                                : "bg-black/40"
                              : "bg-black/40 group-hover:bg-black/20"
                          }
                        `}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                        <h3
                          className={`text-4xl font-bold mb-4 ${sector.color} transition-transform duration-300
                          ${
                            isMobile
                              ? isActive && "scale-110"
                              : "group-hover:scale-110"
                          }
                        `}
                        >
                          {sector.title}
                        </h3>
                        <p
                          className={`text-white text-lg max-w-md transition-all duration-500 transform
                          ${
                            isMobile
                              ? isActive
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                              : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                          }
                        `}
                        >
                          {sector.description}
                        </p>
                      </div>

                      {/* Bottom Border Effect */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                          from-${sector.color.split("-")[1]}-400 to-maisvida-green transform transition-transform duration-500
                          ${
                            isMobile
                              ? isActive
                                ? "scale-x-100"
                                : "scale-x-0"
                              : "scale-x-0 group-hover:scale-x-100"
                          }
                        `}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-maisvida-green hover:bg-maisvida-green/80 border-maisvida-green text-white" />
            <CarouselNext className="bg-maisvida-green hover:bg-maisvida-green/80 border-maisvida-green text-white" />
          </Carousel>
        </div>
        
        {/* Additional Info */}
        <div className="text-center mt-12 animate-on-scroll">
          <p className="text-gray-400 text-sm">
            Deslize para conhecer todos os nossos setores especializados
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
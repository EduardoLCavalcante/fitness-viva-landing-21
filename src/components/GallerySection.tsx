
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images = [
  {
    id: 1,
    src: "/img/gym-1.jpg",
    alt: "Área de musculação com equipamentos modernos",
    description: "Área principal de musculação com equipamentos de última geração"
  },
  {
    id: 2,
    src: "/img/gym-2.jpg",
    alt: "Área de treino funcional",
    description: "Espaço exclusivo para treino funcional e CrossFit"
  },
  {
    id: 3,
    src: "/img/gym-3.jpg",
    alt: "Área de cardio",
    description: "Zona cardiovascular com esteiras e elípticos de ponta"
  },
  {
    id: 4,
    src: "/img/gym-4.jpg",
    alt: "Área de alongamento",
    description: "Espaço dedicado para alongamento e recuperação"
  },
  {
    id: 5,
    src: "/img/gym-5.jpg",
    alt: "Sala de avaliação física",
    description: "Ambiente exclusivo para avaliações físicas"
  },
  {
    id: 6,
    src: "/img/gym-6.jpg",
    alt: "Recepção da academia",
    description: "Recepção acolhedora com atendimento personalizado"
  }
];

const GallerySection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  return (
    <section id="gallery" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CONHEÇA NOSSA <span className="text-maisvida-green">ESTRUTURA</span></h2>
          <div className="w-24 h-1 bg-maisvida-red mb-6 mx-auto"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore as instalações da Mais Vida e descubra um ambiente moderno e acolhedor para seus treinos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-lg shadow-lg animate-on-scroll cursor-pointer group h-64"
              onClick={() => handleImageClick(index)}
            >
              <div className="absolute inset-0 bg-maisvida-green/20 group-hover:bg-maisvida-green/10 transition-all duration-300 z-10"></div>
              <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                {/* Placeholder for actual images - you would replace this with real images */}
                <div 
                  className={`absolute inset-0 bg-gray-800 flex items-center justify-center`}
                  style={{ 
                    backgroundImage: `url(${image.src})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="font-semibold text-white group-hover:text-maisvida-green transition-colors">
                    {image.alt}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger className="hidden">Open</DialogTrigger>
          <DialogContent className="sm:max-w-4xl bg-black border-maisvida-green/30 p-0">
            <div className="relative overflow-hidden">
              <div className="absolute top-2 right-2 z-50">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-maisvida-green/80 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="relative h-[60vh]">
                {/* Placeholder for full-size image - replace with actual image display */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ 
                    backgroundImage: `url(${images[currentImageIndex].src})`, 
                    backgroundSize: 'contain', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button 
                    onClick={handlePrevious}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-maisvida-green/80 transition-colors"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-maisvida-green/80 transition-colors"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70">
                  <p className="text-white text-center">
                    {images[currentImageIndex].description}
                  </p>
                </div>
              </div>
              
              <div className="bg-maisvida-dark p-4">
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {images.map((image, index) => (
                    <div 
                      key={image.id}
                      className={`h-16 w-24 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'ring-2 ring-maisvida-green' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      {/* Thumbnail - replace with actual thumbnail image */}
                      <div 
                        className="h-full w-full bg-gray-700"
                        style={{ 
                          backgroundImage: `url(${image.src})`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center' 
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;

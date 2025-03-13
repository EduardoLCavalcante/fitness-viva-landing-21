
import { useState, useEffect, useRef } from 'react';
import { Dumbbell, Clock, Plus, Activity, CalendarDays, Phone } from 'lucide-react';


const Navbar = () => {


  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const heroRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)

    // Detectar seção ativa no scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Função para scroll suave
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const pcView = "md:h-8 md:w-8"

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-primary/30 shadow-lg shadow-primary/20">
    <ul className="flex space-x-2 md:space-x-6">
      <li>
        <button
          onClick={() => scrollToSection("home")}
          className={`p-2 rounded-full transition-all ${activeSection === "sobre" ? "bg-primary text-black" : "text-white hover:bg-primary/20"}`}
          aria-label="Sobre"
        >
          <Dumbbell className={`${pcView} h-5 w-5`} />
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("horarios")}
          className={`p-2 rounded-full transition-all ${activeSection === "horarios" ? "bg-primary text-black" : "text-white hover:bg-primary/20"}`}
          aria-label="Horários"
        >
          <Clock className={`${pcView} h-5 w-5`} />
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("about")}
          className={`p-2 rounded-full transition-all ${activeSection === "novidades" ? "bg-primary text-black" : "text-white hover:bg-primary/20"}`}
          aria-label="Novidades"
        >
          <Plus className={`${pcView} h-5 w-5`} />
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("plans")}
          className={`p-2 rounded-full transition-all ${activeSection === "planos" ? "bg-primary text-black" : "text-white hover:bg-primary/20"}`}
          aria-label="Planos"
        >
          <Activity className={`${pcView} h-5 w-5`} />
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("calendar")}
          className={`p-2 rounded-full transition-all ${activeSection === "calendario" ? "bg-primary text-black" : "text-white hover:bg-primary/20"}`}
          aria-label="Calendário"
        >
          <CalendarDays className={`${pcView} h-5 w-5`} />
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("contact")}
          className={`p-2 rounded-full transition-all ${activeSection === "contato" ? "bg-primary text-black" : "text-white hover:bg-primary/20"}`}
          aria-label="Contato"
        >
          <Phone className={`${pcView} h-5 w-5`} />
        </button>
      </li>
    </ul>
  </nav>
  );
};

export default Navbar;

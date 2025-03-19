
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-6">Página não encontrada</p>
        <p className="mb-6 text-gray-500">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link 
          to="/" 
          className="text-maisvida-green hover:text-green-400 underline"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

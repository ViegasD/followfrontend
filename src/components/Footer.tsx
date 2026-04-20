import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <img src={logo} alt="Comprando Fama" className="h-8 w-8 rounded-lg object-contain" />
              <span className="text-white font-semibold text-lg">Comprando Fama</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Impulsione suas redes sociais com serviços de qualidade, entrega rápida e preços acessíveis.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/servicos" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">
                Serviços
              </Link>
              <Link to="/rastrear" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">
                Rastrear Pedido
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Suporte</h4>
            <p className="text-gray-500 text-sm">
              WhatsApp:{' '}
              <a
                href="https://api.whatsapp.com/send?phone=558899470575"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                +55 88 99947-0575
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Comprando Fama. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

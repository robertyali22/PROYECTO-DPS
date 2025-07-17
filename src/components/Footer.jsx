import { useState } from 'react';
import { 
  Leaf, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Heart,
  ChevronUp,
  ArrowUp,
  TreePine,
  ShieldCheck
} from 'lucide-react';

export function Footer() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(true);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-400', name: 'Facebook' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-300', name: 'Twitter' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400', name: 'Instagram' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-500', name: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Sección principal */}
        <div className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Columna 1: Marca */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    EcoMarket
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Tu marketplace sostenible de confianza en Perú. Productos eco-amigables de empresas locales comprometidas con el planeta.
                </p>
                
                {/* Redes sociales */}
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Columna 2: Categorías */}
              <div>
                <button
                  onClick={() => toggleSection('categories')}
                  className="md:cursor-default flex items-center justify-between w-full md:w-auto mb-6 md:mb-4"
                >
                  <h4 className="text-lg font-semibold text-white">Categorías</h4>
                  <ChevronUp className={`w-5 h-5 md:hidden transition-transform duration-300 ${expandedSection === 'categories' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`space-y-3 ${expandedSection === 'categories' || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}>
                  {['Moda Sostenible', 'Tecnología Verde', 'Hogar Eco', 'Belleza Natural', 'Deportes'].map((category, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm py-1 hover:pl-2 transform transition-all"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>

              {/* Columna 3: Ayuda */}
              <div>
                <button
                  onClick={() => toggleSection('help')}
                  className="md:cursor-default flex items-center justify-between w-full md:w-auto mb-6 md:mb-4"
                >
                  <h4 className="text-lg font-semibold text-white">Ayuda</h4>
                  <ChevronUp className={`w-5 h-5 md:hidden transition-transform duration-300 ${expandedSection === 'help' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`space-y-3 ${expandedSection === 'help' || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}>
                  {['Centro de Ayuda', 'Política de Envíos', 'Política de Devoluciones', 'Términos y Condiciones', 'Privacidad'].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm py-1 hover:pl-2 transform transition-all"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Columna 4: Contacto */}
              <div>
                <button
                  onClick={() => toggleSection('contact')}
                  className="md:cursor-default flex items-center justify-between w-full md:w-auto mb-6 md:mb-4"
                >
                  <h4 className="text-lg font-semibold text-white">Contacto</h4>
                  <ChevronUp className={`w-5 h-5 md:hidden transition-transform duration-300 ${expandedSection === 'contact' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`space-y-4 ${expandedSection === 'contact' || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}>
                  <div className="flex items-start space-x-3 text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Av. Javier Prado Este 1234, San Isidro, Lima</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">+51 907 896 648</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">hola@ecomarket.pe</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">Lun - Vie: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria con gradiente */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Footer inferior */}
        <div className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  &copy; 2025 EcoMarket Perú. Todos los derechos reservados.
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center justify-center md:justify-start">
                  Desarrollado por Robert Yali, Efrain Hinostroza y Carlos Vega.
                </p>
              </div>
              
              {/* Certificaciones/Badges */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300">
                  <TreePine className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-gray-300 font-medium">Carbono Neutro</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-300 font-medium">Comercio Justo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 z-10"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}
    </footer>
  );
}

import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Por favor ingresa tu email');
      setStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Por favor ingresa un email válido');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simular llamada a API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
      
      // Auto-hide después del éxito
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Error al suscribirse. Inténtalo nuevamente.');
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 animate-gradient-x"></div>
      
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-lg animate-bounce delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Icono y título */}
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Únete a nuestra comunidad
            </h2>
          </div>

          <p className="text-xl text-emerald-50 mb-12 max-w-2xl mx-auto leading-relaxed">
            Recibe descuentos exclusivos, nuevos productos y contenido sobre sostenibilidad 
            directamente en tu bandeja de entrada.
          </p>

          {/* Formulario */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    placeholder="tu@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === 'loading' || status === 'success'}
                  className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[140px]"
                >
                  {status === 'loading' && (
                    <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  )}
                  {status === 'success' && (
                    <Check className="w-5 h-5 mr-2" />
                  )}
                  {status === 'idle' && 'Suscribirse'}
                  {status === 'loading' && 'Enviando...'}
                  {status === 'success' && '¡Listo!'}
                  {status === 'error' && 'Intentar'}
                </button>
              </div>
            </div>

            {/* Mensajes de estado */}
            {status === 'error' && (
              <div className="mt-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl flex items-center justify-center text-red-100 animate-shake">
                <AlertCircle className="w-5 h-5 mr-2" />
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div className="mt-4 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl flex items-center justify-center text-green-100 animate-bounce">
                <Check className="w-5 h-5 mr-2" />
                ¡Gracias por suscribirte! Revisa tu email para confirmar.
              </div>
            )}
          </div>



          {/* Nota de privacidad */}
          <p className="mt-8 text-sm text-emerald-200/80 max-w-lg mx-auto">
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
}
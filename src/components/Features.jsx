import { Leaf, Shield, Truck } from 'lucide-react';

export function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-white rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Truck className="w-9 h-9 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-3">Envío Gratuito</h3>
            <p className="text-gray-600 text-base">
              En compras mayores a S/.100 en Lima y Callao.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-9 h-9 text-blue-600" />
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-3">Compra Segura</h3>
            <p className="text-gray-600 text-base">
              Protección total en todas tus transacciones.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white rounded-3xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-9 h-9 text-purple-600" />
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-3">Eco-Friendly</h3>
            <p className="text-gray-600 text-base">
              Productos sostenibles y responsables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

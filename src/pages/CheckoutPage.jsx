import { useState } from "react";
import { CreditCard, MapPin, Truck, ShoppingCart, Lock, CheckCircle } from "lucide-react";

export function CheckoutPage() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    apartamento: '',
    ciudad: '',
    codigo_postal: '',
    telefono: '',
    metodoEnvio: 'estandar',
    metodoPago: 'tarjeta',
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const calculateTotal = () => {
    const subtotal = 150.00;
    const envio = form.metodoEnvio === 'express' ? 15.00 : 0;
    return subtotal + envio;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar compra</h1>
          <p className="text-gray-600">Completa tu pedido de forma segura</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario de checkout */}
          <div className="space-y-6">
            {/* Información de contacto */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" /> 
                Información de contacto
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    name="newsletter"
                    id="newsletter"
                    checked={form.newsletter}
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-700">
                    Recibir ofertas y novedades por email
                  </label>
                </div>
                
                <input
                  name="correo"
                  type="email"
                  placeholder="Correo electrónico"
                  value={form.correo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" /> 
                Dirección de envío
              </h2>
              
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  <input
                    name="apellido"
                    placeholder="Apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                
                <input
                  name="direccion"
                  placeholder="Dirección"
                  value={form.direccion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
                
                <input
                  name="apartamento"
                  placeholder="Apartamento, suite, etc. (opcional)"
                  value={form.apartamento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
                
                <div className="grid sm:grid-cols-3 gap-4">
                  <input
                    name="ciudad"
                    placeholder="Ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  <input
                    name="codigo_postal"
                    placeholder="Código postal"
                    value={form.codigo_postal}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  <input
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Método de envío */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Método de envío
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="metodoEnvio"
                      value="estandar"
                      checked={form.metodoEnvio === "estandar"}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Envío estándar</div>
                      <div className="text-sm text-gray-600">5-7 días hábiles</div>
                    </div>
                  </div>
                  <span className="font-semibold text-emerald-600">Gratis</span>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="metodoEnvio"
                      value="express"
                      checked={form.metodoEnvio === "express"}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Envío express</div>
                      <div className="text-sm text-gray-600">1-2 días hábiles</div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">S/ 15.00</span>
                </label>
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                Método de pago
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="tarjeta"
                      checked={form.metodoPago === "tarjeta"}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Tarjeta de crédito/débito</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-gray-400" />
                </label>
                
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="yape"
                      checked={form.metodoPago === "yape"}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Yape / Plin</div>
                      <div className="text-sm text-gray-600">Pago inmediato</div>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </label>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                Resumen del pedido
              </h3>
              
              {/* Producto ejemplo */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Producto ejemplo</h4>
                  <p className="text-sm text-gray-600">Cantidad: 1</p>
                </div>
                <span className="font-semibold text-gray-900">S/ 150.00</span>
              </div>
              
              {/* Código de descuento */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de descuento"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                    Aplicar
                  </button>
                </div>
              </div>
              
              {/* Desglose de precios */}
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>S/ 150.00</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Envío</span>
                  <span>{form.metodoEnvio === 'express' ? 'S/ 15.00' : 'Gratis'}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 mb-6">
                <span className="text-xl font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-emerald-600">
                  S/ {calculateTotal().toFixed(2)}
                </span>
              </div>
              
              {/* Botón de compra */}
              <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                Confirmar compra
              </button>
              
              {/* Información de seguridad */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Pago 100% seguro y encriptado</span>
              </div>
            </div>
            
            {/* Beneficios adicionales */}
            <div className="bg-emerald-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-emerald-800 mb-3">Beneficios de tu compra</h4>
              <div className="space-y-2 text-sm text-emerald-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Envío gratis en pedidos mayores a S/ 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Garantía de satisfacción 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Soporte al cliente 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
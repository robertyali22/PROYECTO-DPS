import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, Menu, X, Search, Star, Leaf, Shield, Truck, Heart, 
  User, ChevronDown, ChevronRight, ArrowRight, Filter, Grid, List, 
  Plus, Minus, Trash2, Eye, Bell, MapPin, Phone, Mail, 
  Home, Smartphone, Shirt, Palette, Dumbbell, Coffee 
} from 'lucide-react';

export function EcommercePrueba() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [notification, setNotification] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Simulación de datos
  const categories = [
    { id: 'fashion', name: 'Moda', icon: Shirt, count: 45, color: 'bg-pink-100 text-pink-700' },
    { id: 'tech', name: 'Tecnología', icon: Smartphone, count: 32, color: 'bg-blue-100 text-blue-700' },
    { id: 'home', name: 'Hogar', icon: Home, count: 28, color: 'bg-orange-100 text-orange-700' },
    { id: 'beauty', name: 'Belleza', icon: Palette, count: 24, color: 'bg-purple-100 text-purple-700' },
    { id: 'sports', name: 'Deportes', icon: Dumbbell, count: 19, color: 'bg-green-100 text-green-700' },
    { id: 'food', name: 'Alimentos', icon: Coffee, count: 8, color: 'bg-amber-100 text-amber-700' }
  ];

  const searchSuggestionsData = [
    'Sweater de alpaca',
    'Smartphone Xiaomi',
    'Cerámica artesanal',
    'Skincare natural',
    'Zapatillas running',
    'Café orgánico'
  ];

  // Simulación de productos en carrito
  const sampleCartItem = {
    id: 1,
    name: "Sweater de Alpaca Premium",
    price: 299,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    quantity: 1
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Efectos
  useEffect(() => {
    // Simular algunos items en el carrito para demostración
    setCart([sampleCartItem]);
    setWishlist([sampleCartItem]);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manejar búsqueda con sugerencias
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filtered = searchSuggestionsData.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  }, []);

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
  };

  const formatPrice = (price) => `S/. ${price.toLocaleString()}`;

  // Componentes mejorados
  const EnhancedSearchBar = () => (
    <div className="relative flex-1 max-w-2xl mx-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
        <input
          type="text"
          placeholder="¿Qué estás buscando? (Ej: sweater, smartphone, café...)"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => searchQuery && setShowSearchSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400"
        />
        
        {/* Sugerencias de búsqueda */}
        {showSearchSuggestions && searchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-2 shadow-lg z-50 max-h-60 overflow-y-auto">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const CategoryMenu = () => (
    <div className="relative">
      <button
        onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
      >
        <Menu className="w-5 h-5" />
        <span>Categorías</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showCategoriesMenu ? 'rotate-180' : ''}`} />
      </button>

      {showCategoriesMenu && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Todas las Categorías</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowCategoriesMenu(false);
                    }}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.count} productos</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const UserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
      </button>

      {showUserMenu && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Usuario Demo</div>
                <div className="text-sm text-gray-500">demo@ecomarket.pe</div>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Mi Perfil</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <ShoppingCart className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Mis Pedidos</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Mis Direcciones</span>
            </button>
            <hr className="my-2 border-gray-100" />
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors text-left text-red-600">
              <X className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const CartSidebar = () => (
    showCart && (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Carrito de Compras</h3>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">{cartItemsCount} artículo(s) en tu carrito</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-2">Tu carrito está vacío</p>
                  <p className="text-sm text-gray-400">¡Agrega algunos productos increíbles!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-xl" 
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-emerald-600 font-semibold">{formatPrice(item.price)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button className="p-1 rounded-lg bg-white hover:bg-gray-100 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium text-gray-700 min-w-[20px] text-center">{item.quantity}</span>
                          <button className="p-1 rounded-lg bg-white hover:bg-gray-100 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatPrice(cartTotal)}</span>
                </div>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl">
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar - Información adicional */}
      <div className="bg-emerald-600 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+51 999 888 777</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>hola@ecomarket.pe</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>🚚 Envío gratis desde S/. 100</span>
            <span>🌱 Productos eco-amigables</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo mejorado */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-800">EcoMarket</span>
                <p className="text-xs text-gray-500 hidden sm:block">Comercio Sostenible</p>
              </div>
            </div>

            {/* Navegación principal - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <CategoryMenu />
              <EnhancedSearchBar />
              
              {/* Botones de acción mejorados */}
              <div className="flex items-center space-x-2">
                <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <button
                  onClick={() => setShowWishlist(true)}
                  className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors group"
                >
                  <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setShowCart(true)}
                  className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors group"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
                
                <UserMenu />
              </div>
            </div>

            {/* Botón menú móvil */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              <div className="space-y-4">
                <EnhancedSearchBar />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowWishlist(true)}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Favoritos ({wishlist.length})</span>
                    </button>
                    <button
                      onClick={() => setShowCart(true)}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Carrito ({cartItemsCount})</span>
                    </button>
                  </div>
                  <UserMenu />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <CategoryMenu />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartSidebar />
    </div>
  );
}
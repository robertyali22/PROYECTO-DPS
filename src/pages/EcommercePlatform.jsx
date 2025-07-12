import { useState, useEffect, useCallback, useMemo } from 'react';
import { ShoppingCart, Menu, X, Search, Star, Leaf, Heart, User, Filter, Grid, List, Plus, Minus, Trash2, Eye, ChevronDown, Truck, Phone, Mail, RefreshCw, Package, Shield, ArrowRight, Shirt, Smartphone, Home, Palette, Dumbbell, Coffee, Store } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { Features } from '../components/Features';
import { Hero } from '../components/Hero';

export function EcommercePlatform() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [notification, setNotification] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const categories = [
    { id: 'all', name: 'Todo', icon: Store, count: 156, color: 'bg-gray-100 text-gray-700' },
    { id: 'fashion', name: 'Moda', icon: Shirt, count: 45, color: 'bg-pink-100 text-pink-700' },
    { id: 'tech', name: 'Tecnología', icon: Smartphone, count: 32, color: 'bg-blue-100 text-blue-700' },
    { id: 'home', name: 'Hogar', icon: Home, count: 28, color: 'bg-orange-100 text-orange-700' },
    { id: 'beauty', name: 'Belleza', icon: Palette, count: 24, color: 'bg-purple-100 text-purple-700' },
    { id: 'sports', name: 'Deportes', icon: Dumbbell, count: 19, color: 'bg-green-100 text-green-700' },
    { id: 'food', name: 'Alimentos', icon: Coffee, count: 8, color: 'bg-amber-100 text-amber-700' }
  ];

  const products = [
    {
      id: 1,
      name: "Sweater de Alpaca Premium",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: 'fashion',
      sustainable: true,
      badge: "Eco-friendly",
      description: "Sweater tejido a mano con lana de alpaca 100% peruana. Suave, cálido y duradero.",
      inStock: true,
      stockCount: 15
    },
    {
      id: 2,
      name: "Smartphone Xiaomi 13",
      price: 1299,
      originalPrice: 1499,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 89,
      category: 'tech',
      sustainable: false,
      badge: "Best Seller",
      description: "Último modelo con cámara profesional y batería de larga duración.",
      inStock: true,
      stockCount: 8
    },
    {
      id: 3,
      name: "Cerámica Artesanal Shipibo",
      price: 89,
      originalPrice: 129,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 67,
      category: 'home',
      sustainable: true,
      badge: "Hecho a mano",
      description: "Pieza única inspirada en el arte ancestral shipibo-konibo.",
      inStock: true,
      stockCount: 3
    },
    {
      id: 4,
      name: "Skincare Natural Amazónico",
      price: 159,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 203,
      category: 'beauty',
      sustainable: true,
      badge: "Orgánico",
      description: "Crema facial con ingredientes naturales de la selva peruana.",
      inStock: true,
      stockCount: 22
    },
    {
      id: 5,
      name: "Zapatillas Running Eco",
      price: 249,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 156,
      category: 'sports',
      sustainable: true,
      badge: "Nuevo",
      description: "Zapatillas fabricadas con materiales reciclados y suela biodegradable.",
      inStock: true,
      stockCount: 12
    },
    {
      id: 6,
      name: "Café Orgánico Premium",
      price: 45,
      originalPrice: 65,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 312,
      category: 'food',
      sustainable: true,
      badge: "Comercio Justo",
      description: "Café de altura cultivado en los Andes peruanos, tostado artesanalmente.",
      inStock: true,
      stockCount: 45
    },
    {
      id: 7,
      name: "Tablet para Diseño",
      price: 899,
      originalPrice: 1099,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 76,
      category: 'tech',
      sustainable: false,
      badge: "Profesional",
      description: "Tablet con stylus incluido, perfecta para diseñadores y artistas.",
      inStock: false,
      stockCount: 0
    },
    {
      id: 8,
      name: "Miel de Abeja Orgánica",
      price: 35,
      originalPrice: 45,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 189,
      category: 'food',
      sustainable: true,
      badge: "Pura",
      description: "Miel 100% natural de abejas criadas en apiarios sostenibles.",
      inStock: true,
      stockCount: 28
    }
  ];

  // ============================================================================
  // COMPUTED VALUES Y FILTROS
  // ============================================================================
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // ============================================================================
  // EFECTOS Y FUNCIONES
  // ============================================================================

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generar sugerencias de búsqueda
  useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
      const suggestions = products
        .filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  // Función para mostrar notificaciones
  const showNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  }, []);

  // Funciones del carrito
  const addToCart = useCallback((product) => {
    if (!product.inStock) return;

    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    showNotification(`${product.name} agregado al carrito`);
  }, [showNotification]);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showNotification('Producto eliminado del carrito');
  }, [showNotification]);

  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stockCount) }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    showNotification('Carrito vaciado');
  }, [showNotification]);

  // Funciones del wishlist
  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const isInWishlist = prev.some(item => item.id === product.id);
      if (isInWishlist) {
        showNotification(`${product.name} eliminado de favoritos`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showNotification(`${product.name} agregado a favoritos`);
        return [...prev, product];
      }
    });
  }, [showNotification]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    showNotification('Producto eliminado de favoritos');
  }, [showNotification]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    setShowSearchSuggestions(true);
  }, []);

  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSearchSuggestions(false);
  }, []);

  const formatPrice = useCallback((price) => {
    return `S/. ${price.toLocaleString()}`;
  }, []);

  // ============================================================================
  // COMPONENTES AUXILIARES
  // ============================================================================

  const Notification = () => (
    notification && (
      <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
        {notification}
      </div>
    )
  );

  const SearchSuggestions = () => (
    showSearchSuggestions && searchSuggestions.length > 0 && (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 mt-1 max-h-96 overflow-y-auto">
        <div className="p-2">
          <div className="text-xs text-gray-500 mb-2 px-2">Sugerencias de productos</div>
          {searchSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3 text-left transition-colors"
            >
              <img
                src={suggestion.image}
                alt={suggestion.name}
                className="w-10 h-10 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">{suggestion.name}</div>
                <div className="text-xs text-gray-500">{formatPrice(suggestion.price)}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    )
  );

  const CategoriesDropdown = () => (
    showCategoriesDropdown && (
      <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 mt-1 w-64">
        <div className="p-2">
          <div className="text-xs text-gray-500 mb-2 px-2">Categorías</div>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setShowCategoriesDropdown(false);
                }}
                className={`w-full p-3 hover:bg-gray-50 rounded-lg flex items-center space-x-3 text-left transition-colors ${selectedCategory === category.id ? 'bg-emerald-50 text-emerald-700' : ''
                  }`}
              >
                <div className={`p-2 rounded-full ${category.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} productos</div>
                </div>
              </button>
            );
          })}

        </div>
      </div>
    )
  );

  const ProfileDropdown = () => (
    showProfileDropdown && (
      <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 mt-1 w-64">
        <div className="p-2">
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="font-medium text-sm text-gray-800">Mi Cuenta</div>
            <div className="text-xs text-gray-500">usuario@ejemplo.com</div>
          </div>
          <div className="py-1">
            <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Mi Perfil</span>
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center space-x-3">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Mis Pedidos</span>
            </button>
            <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center space-x-3">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Configuración</span>
            </button>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg text-sm text-red-600">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

const CartSidebar = () => (
  showCart && (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop con animación */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={() => setShowCart(false)} 
      />
      
      {/* Panel del carrito */}
      <div className="absolute right-0 top-0 h-full w-[480px] bg-white shadow-2xl transform transition-transform duration-300 ease-out">
        
        {/* Header mejorado */}
        <div className="relative p-8 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Mi Carrito</h3>
                <p className="text-sm text-gray-600">
                  {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowCart(false)}
              className="p-3 hover:bg-white/50 rounded-xl transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-240px)]">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">Tu carrito está vacío</h4>
              <p className="text-gray-500">¡Agrega algunos productos!</p>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div key={item.id} className="group relative bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-200">
                  
                  {/* Imagen del producto */}
                  <div className="flex items-start space-x-5">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-xl border border-gray-200" 
                      />
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    
                    {/* Información del producto */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-base truncate">{item.name}</h4>
                      <p className="text-emerald-600 font-bold text-xl">{formatPrice(item.price)}</p>
                      
                      {/* Controles de cantidad */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-2 rounded-lg hover:bg-white transition-colors duration-200 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-sm font-bold px-4 py-2 bg-white rounded-lg min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-2 rounded-lg hover:bg-white transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        
                        {/* Botón eliminar */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors duration-200 group-hover:opacity-100 opacity-60"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="mt-3 text-right">
                        <span className="text-sm text-gray-500">Subtotal: </span>
                        <span className="text-base font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y botones */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-8 space-y-6">
            
            {/* Resumen del total */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 text-base">Subtotal</span>
                <span className="font-semibold text-lg">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 text-base">Envío</span>
                <span className="font-semibold text-emerald-600 text-lg">Gratis</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="space-y-4">
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                Proceder al Pago
              </button>
              
              <button
                onClick={clearCart}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-2xl font-medium text-base transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                Vaciar Carrito
              </button>
            </div>
            
            {/* Mensaje de seguridad */}
            <p className="text-sm text-gray-500 text-center">
              Pago seguro y encriptado
            </p>
          </div>
        )}
      </div>
    </div>
  )
);

  const WishlistSidebar = () => (
    showWishlist && (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/50" onClick={() => setShowWishlist(false)} />
        <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lista de Deseos</h3>
              <button onClick={() => setShowWishlist(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Tu lista de deseos está vacía</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-emerald-600 font-semibold">{formatPrice(item.price)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => addToCart(item)}
                          disabled={!item.inStock}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.inStock
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                          {item.inStock ? 'Añadir al carrito' : 'Agotado'}
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-emerald-200">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.sustainable
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-blue-100 text-blue-700'
            }`}>
            {product.badge}
          </span>
          {!product.inStock && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              Agotado
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm"
          aria-label={`${wishlist.some(item => item.id === product.id) ? 'Quitar de' : 'Agregar a'} favoritos`}
        >
          <Heart
            className={`w-4 h-4 ${wishlist.some(item => item.id === product.id)
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400'
              }`}
          />
        </button>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
            <Eye className="w-4 h-4 inline mr-2" />
            Vista rápida
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
          {product.sustainable && (
            <Leaf className="w-4 h-4 text-emerald-500" title="Producto sostenible" />
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {product.inStock ? `${product.stockCount} disponibles` : 'Sin stock'}
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all shadow-sm ${product.inStock
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-105'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          {product.inStock ? 'Añadir al carrito' : 'Producto agotado'}
        </button>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER PRINCIPAL
  // ============================================================================
  return (
    <div className="min-h-screen bg-gray-50">
      <Notification />
      <CartSidebar />
      <WishlistSidebar />
      {/* ======================= TOP BAR ======================= */}
      <div className="bg-emerald-600 text-white py-4 px-4 text-base">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>+51 907 896 648</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>hola@ecomarket.pe</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span>Envío gratis desde S/. 100</span>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" />
              <span>Productos eco-amigables</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== NAVBAR PRINCIPAL ==================== */}
      <nav className={`sticky top-0 z-40 bg-white border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'shadow-md backdrop-blur-md bg-white/95' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* ==================== LOGO Y MENU MOBILE ==================== */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-800">EcoMarket</span>
                  <p className="text-xs text-gray-500 hidden sm:block">Comercio Sostenible</p>
                </div>
              </div>
            </div>

            {/* ==================== CATEGORIAS DROPDOWN (DESKTOP) ==================== */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onBlur={() => setTimeout(() => setShowCategoriesDropdown(false), 200)}
              >
                <span className="font-medium text-gray-700">Categorías</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
              </button>
              <CategoriesDropdown />
            </div>

            {/* ==================== BARRA DE BÚSQUEDA ==================== */}
            <div className="flex-1 max-w-2xl mx-6 relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="¿Qué estás buscando? (Ej: sweater, smartphone, café...)"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setShowSearchSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchSuggestions(false);
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <SearchSuggestions />
            </div>

            {/* ==================== ACCIONES USUARIO ==================== */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              <button onClick={() => setShowWishlist(true)} className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group" aria-label="Lista de deseos">
                <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Carrito */}
              <button onClick={() => setShowCart(true)} className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group" aria-label="Carrito de compras">
                <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-emerald-500 transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Perfil */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  onBlur={() => setTimeout(() => setShowProfileDropdown(false), 200)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Perfil de usuario"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </button>
                <ProfileDropdown />
              </div>
            </div>
          </div>

          {/* ==================== MENU MOBILE ==================== */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-4 space-y-4">
                {/* Categorías Mobile */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-3">Categorías</div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsMenuOpen(false);
                          }}
                          className={`p-3 rounded-lg text-left transition-colors border ${selectedCategory === category.id
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-full ${category.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{category.name}</div>
                              <div className="text-xs text-gray-500">{category.count}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}

                  </div>
                </div>

                {/* Filtros y Ordenamiento Mobile */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filtros</span>
                  </button>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-low">Menor precio</option>
                    <option value="price-high">Mayor precio</option>
                    <option value="rating">Mejor valorados</option>
                  </select>
                </div>

                {/* Acciones Rápidas Mobile */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        setShowWishlist(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">Favoritos ({wishlist.length})</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowCart(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span className="text-sm">Carrito ({cartItemsCount})</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Total: {formatPrice(cartTotal)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ==================== BARRA DE FILTROS (DESKTOP) ==================== */}
      <div className="hidden md:block bg-white border-b border-gray-200 sticky top-[83px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Filtros de Categoría */}
            <div className="flex items-center space-x-1 overflow-x-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${selectedCategory === category.id
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <div className={`p-1 rounded-full ${category.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </button>
                );
              })}


            </div>

            {/* Controles de Vista y Ordenamiento */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Menor precio</option>
                  <option value="price-high">Mayor precio</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Vista:</span>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {filteredProducts.length} productos encontrados
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <Hero />

      {/* ==================== FEATURES SECTION ==================== */}
      <Features />

      {/* ==================== PRODUCTOS SECTION ==================== */}
      <section className="relative py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-100 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
              Productos Destacados
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra selección de productos sostenibles y de calidad premium,
              <span className="text-emerald-600 font-semibold"> cuidadosamente seleccionados</span> para ti
            </p>

            {/* Decorative line */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
              <div className="mx-4 w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col justify-center items-center py-24">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-gray-700 mb-2">Cargando productos increíbles...</p>
                <p className="text-sm text-gray-500">Esto solo tomará un momento</p>
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Oops! No encontramos productos
              </h3>

              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                No hay productos que coincidan con tu búsqueda.
                Prueba con otros filtros o términos de búsqueda.
              </p>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSortBy('featured');
                }}
                className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
              >
                <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="mb-16">
              <div className={`grid gap-8 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto'
                }`}>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load More Button */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="text-center">
              <button className="group bg-white hover:bg-gray-50 text-gray-700 px-10 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto">
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Cargar más productos
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
      `}</style>
      </section>

      {/* ==================== NEWSLETTER SECTION ==================== */}
      <Newsletter />

      {/* ==================== FOOTER ==================== */}
      <Footer />
    </div>
  );
}
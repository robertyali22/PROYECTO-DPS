import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, ShoppingCart, Shield, Truck, RefreshCw, Share2, Plus, Minus, ChevronLeft, ChevronRight, Check, X, ThumbsUp, ThumbsDown, User, Verified, Leaf, Award, MessageCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [notification, setNotification] = useState('');
  const [reviewsPage, setReviewsPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);

  const product = {
    id: 1,
    name: "Sweater de Alpaca Premium",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 15,
    sku: "ALV-SW-001",
    brand: "Alpaca Peruana",
    category: "Moda Sostenible",
    sustainable: true,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop"
    ],
    description: {
      short: "Sweater tejido a mano con lana de alpaca 100% peruana. Suave, cálido y duradero, perfecto para cualquier ocasión.",
      full: "Este hermoso sweater está confeccionado con la mejor lana de alpaca peruana, conocida mundialmente por su suavidad excepcional y propiedades térmicas superiores. Cada pieza es tejida a mano por artesanos locales de la región andina, preservando técnicas ancestrales transmitidas de generación en generación.\n\nLa lana de alpaca es naturalmente hipoalergénica, resistente al agua y más cálida que la lana tradicional, manteniendo su forma y color original por años. Este sweater no solo es una prenda de vestir, sino una obra de arte que representa la rica tradición textil peruana.\n\nCada compra apoya directamente a las comunidades andinas y promueve el comercio justo, asegurando que los artesanos reciban una compensación justa por su trabajo excepcional."
    },
    features: [
      "100% lana de alpaca peruana",
      "Tejido a mano por artesanos locales",
      "Hipoalergénico y antibacteriano",
      "Resistente al agua y al viento",
      "Comercio justo certificado",
      "Cuidado fácil - lavado en frío"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Natural", hex: "#F5F5DC", available: true },
      { name: "Marrón", hex: "#8B4513", available: true },
      { name: "Gris", hex: "#808080", available: true },
      { name: "Negro", hex: "#000000", available: false }
    ],
    specifications: {
      "Material": "100% Fibra de Alpaca",
      "Peso": "350g",
      "Origen": "Cusco, Perú",
      "Tipo de tejido": "Punto jersey",
      "Cuidado": "Lavado en frío, secado al aire",
      "Temporada": "Otoño/Invierno"
    },
    shipping: {
      standard: { days: "3-5 días hábiles", price: 15 },
      express: { days: "1-2 días hábiles", price: 25 },
      free: { threshold: 100, message: "Envío gratis en compras mayores a S/.100" }
    }
  };

  const reviews = [
    {
      id: 1,
      user: "María González",
      rating: 5,
      date: "2025-01-15",
      verified: true,
      title: "Excelente calidad",
      comment: "El sweater es hermoso y de muy buena calidad. La lana es súper suave y abriga mucho. Definitivamente lo recomiendo.",
      helpful: 23,
      images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop"],
      size: "M",
      color: "Natural"
    },
    {
      id: 2,
      user: "Carlos Mendoza",
      rating: 5,
      date: "2025-01-10",
      verified: true,
      title: "Muy cómodo y elegante",
      comment: "Me encanta este sweater. Es muy cómodo para el día a día y se ve elegante. La talla es exacta y el color es tal como se ve en las fotos.",
      helpful: 18,
      images: [],
      size: "L",
      color: "Marrón"
    },
    {
      id: 3,
      user: "Ana Rodríguez",
      rating: 4,
      date: "2025-01-05",
      verified: true,
      title: "Buena compra",
      comment: "El producto llegó en perfectas condiciones. La calidad es buena aunque esperaba que fuera un poco más grueso. Aún así, cumple con mis expectativas.",
      helpful: 12,
      images: [],
      size: "S",
      color: "Gris"
    },
    {
      id: 4,
      user: "Luis Paredes",
      rating: 5,
      date: "2025-01-01",
      verified: true,
      title: "Perfecto para el invierno",
      comment: "Excelente para el frío limeño. La lana de alpaca realmente hace la diferencia. El tejido es impecable y se nota el trabajo artesanal.",
      helpful: 31,
      images: [],
      size: "XL",
      color: "Natural"
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Poncho Tradicional Andino",
      price: 199,
      originalPrice: 259,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
      rating: 4.7,
      sustainable: true
    },
    {
      id: 3,
      name: "Bufanda de Alpaca",
      price: 89,
      originalPrice: 119,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop",
      rating: 4.9,
      sustainable: true
    },
    {
      id: 4,
      name: "Gorro Tejido Artesanal",
      price: 45,
      originalPrice: 65,
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=300&h=300&fit=crop",
      rating: 4.6,
      sustainable: true
    },
    {
      id: 5,
      name: "Cardigan Premium",
      price: 349,
      originalPrice: 449,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
      rating: 4.8,
      sustainable: true
    }
  ];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showNotification('Por favor selecciona una talla');
      return;
    }
    showNotification(`${product.name} agregado al carrito`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const formatPrice = (price) => `S/. ${price.toLocaleString()}`;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 72 },
    { stars: 4, count: 23, percentage: 19 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      <Navbar />

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.sustainable && (
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Eco-Friendly
                </div>
              )}
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{product.discount}%
                </div>
              )}
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-emerald-600 font-medium">{product.brand}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description.short}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount} reseñas)
                  </span>
                </div>
                {product.sustainable && (
                  <div className="flex items-center space-x-1 text-emerald-600">
                    <Leaf className="w-4 h-4" />
                    <span className="text-sm">Sostenible</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                  Ahorra {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className={`${product.inStock ? 'text-emerald-600' : 'text-red-600'}`}>
                  {product.inStock ? `${product.stockCount} disponibles` : 'Agotado'}
                </span>
                <span>•</span>
                <span>Precio incluye IGV</span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Talla <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${selectedSize === size
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#" className="text-sm text-emerald-600 hover:underline mt-2 inline-block">
                Guía de tallas
              </a>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color: {selectedColor && <span className="text-gray-600">{selectedColor}</span>}
              </label>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.name
                      ? 'border-emerald-500 ring-2 ring-emerald-200'
                      : 'border-gray-300'
                      } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {!color.available && (
                      <X className="w-4 h-4 text-white m-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Máximo {product.stockCount} unidades
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${product.inStock
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.inStock ? 'Agregar al carrito' : 'Producto agotado'}</span>
              </button>

              <button className="w-full py-3 px-6 border-2 border-emerald-500 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                Comprar ahora
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Información de envío</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    Envío estándar: {product.shipping.standard.days} - {formatPrice(product.shipping.standard.price)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    Envío express: {product.shipping.express.days} - {formatPrice(product.shipping.express.price)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    {product.shipping.free.message}
                  </span>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-600">Cambios gratis</span>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-600">Compra segura</span>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-600">Garantía 1 año</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap gap-4 sm:gap-8">
              {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-3 px-2 sm:px-4 text-sm font-medium transition-colors duration-200 focus:outline-none ${activeTab === tab
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab === 'description' && 'Descripción'}
                  {tab === 'specifications' && 'Especificaciones'}
                  {tab === 'reviews' && `Reseñas (${product.reviewCount})`}
                  {tab === 'shipping' && 'Envío y devoluciones'}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content Wrapper */}
          <div className="py-10 animate-fade-in">
            {/* Descripción */}
            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-6">
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {showFullDescription ? product.description.full : product.description.short}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-sm text-emerald-600 hover:underline"
                >
                  {showFullDescription ? 'Ver menos' : 'Ver más'}
                </button>

                {/* Características */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Características principales</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 mt-1 text-emerald-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Especificaciones */}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-white rounded-xl shadow-sm p-4">
                    <dt className="text-sm font-semibold text-gray-900">{key}</dt>
                    <dd className="text-sm text-gray-600 mt-1">{value}</dd>
                  </div>
                ))}
              </div>
            )}

            {/* Reseñas */}
            {activeTab === 'reviews' && (
              <div className="max-w-6xl mx-auto space-y-12">
                {/* Rating Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                    <p className="text-5xl font-bold text-gray-900">{product.rating}</p>
                    <div className="flex justify-center mt-2 mb-1">{renderStars(product.rating)}</div>
                    <p className="text-sm text-gray-500">Basado en {product.reviewCount} reseñas</p>

                    <div className="mt-6 space-y-3">
                      {ratingDistribution.map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-3">
                          <span className="w-6 text-sm text-gray-600">{rating.stars}★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${rating.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 w-6 text-right">{rating.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="lg:col-span-2 space-y-8">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 flex items-center gap-1">
                                {review.user}
                                {review.verified && <Verified className="w-4 h-4 text-emerald-500" />}
                              </p>
                              <p className="text-sm text-gray-500">
                                {review.date} &bull; Talla {review.size} &bull; {review.color}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1">{renderStars(review.rating)}</div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">{review.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>

                        {review.images.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`img-${index}`}
                                className="w-20 h-20 object-cover rounded-xl shadow-sm"
                              />
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
                          <div className="flex gap-4">
                            <button className="flex items-center gap-1 hover:text-gray-700">
                              <ThumbsUp className="w-4 h-4" />
                              Útil ({review.helpful})
                            </button>
                            <button className="flex items-center gap-1 hover:text-gray-700">
                              <MessageCircle className="w-4 h-4" />
                              Comentar
                            </button>
                          </div>
                          <div className="flex gap-3">
                            <button className="hover:text-emerald-600">
                              <ThumbsUp className="w-5 h-5" />
                            </button>
                            <button className="hover:text-rose-500">
                              <ThumbsDown className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Load more button */}
                    <div className="text-center">
                      <button
                        onClick={() => setReviewsPage(reviewsPage + 1)}
                        className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                      >
                        Cargar más reseñas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}




            {/* Envío */}
            {activeTab === 'shipping' && (
              <div className="max-w-2xl space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Envío y devoluciones</h3>
                <p className="text-gray-600">
                  Ofrecemos envío estándar y express a todo el país. Las devoluciones son gratuitas dentro de los 30 días posteriores a la compra.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Envío estándar: 3-5 días hábiles</li>
                  <li>Envío express: 1-2 días hábiles</li>
                  <li>Devoluciones gratuitas dentro de los 30 días</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ==================== PRODUCTOS RELACIONADOS ==================== */}
        <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          {/* Efectos decorativos */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-10 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 right-10 w-64 h-64 bg-teal-100 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
                Productos relacionados
              </h2>
              <p className="text-lg text-gray-600">
                Explora productos similares con gran calidad y sostenibilidad
              </p>


            </div>

            {/* Grid de productos */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-5 animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  {product.sustainable && (
                    <div className="flex items-center gap-1 text-emerald-600 mb-3 text-sm">
                      <Leaf className="w-4 h-4" />
                      <span>Sostenible</span>
                    </div>
                  )}

                  <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all">
                    Ver producto
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Animación personalizada */}
          <style jsx>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
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

      </div>
    </div>
  );
}
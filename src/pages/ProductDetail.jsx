import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, ShoppingCart, Shield, Truck, RefreshCw, Share2, Plus, Minus, ChevronLeft, ChevronRight, Check, X, ThumbsUp, ThumbsDown, User, Verified, Leaf, Award, MessageCircle } from 'lucide-react';

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
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop"
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

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Inicio</span>
            <ChevronRight className="w-4 h-4" />
            <span>Moda</span>
            <ChevronRight className="w-4 h-4" />
            <span>Sweaters</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

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
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
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
                    className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size
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
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name 
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
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  product.inStock
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
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
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

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">
                    {showFullDescription ? product.description.full : product.description.short}
                  </p>
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {showFullDescription ? 'Ver menos' : 'Ver más'}
                </button>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Características principales</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4">
                      <dt className="font-medium text-gray-900 mb-1">{key}</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Rating Summary */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {product.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(product.rating)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Basado en {product.reviewCount} reseñas
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ratingDistribution.map((rating) => (
                        <div key={rating.stars} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 w-8">{rating.stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${rating.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{rating.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900">{review.user}</span>
                                  {review.verified && (
                                    <Verified className="w-4 h-4 text-emerald-500" />
                                  )}
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <span>{review.date}</span>
                                  <span>•</span>
                                  <span>Talla {review.size}</span>
                                  <span>•</span>
                                  <span>{review.color}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>

                          <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                          <p className="text-gray-600 mb-4">{review.comment}</p>

                          {review.images.length > 0 && (
                            <div className="flex space-x-2 mb-4">
                              {review.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Review ${review.id} image ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                                <ThumbsUp className="w-4 h-4" />
                                <span>Útil ({review.helpful})</span>
                              </button>
                              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800">
                                <MessageCircle className="w-4 h-4" />
                                <span>Comentar</span>
                              </button>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="text-gray-600 hover:text-gray-800">
                                <ThumbsUp className="w-5 h-5" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-800">
                                <ThumbsDown className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-center mt-6">
                        <button
                          onClick={() => setReviewsPage(reviewsPage + 1)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cargar más reseñas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="max-w-2xl">
                <h3 className="font-semibold text-gray-900 mb-3">Envío y devoluciones</h3>
                <p className="text-gray-600 mb-4">
                  Ofrecemos envío estándar y express a todo el país. Las devoluciones son gratuitas dentro de los 30 días posteriores a la compra.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Envío estándar: 3-5 días hábiles</li>
                  <li>Envío express: 1-2 días hábiles</li>
                  <li>Devoluciones gratuitas dentro de los 30 días</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Related Products */}
        <div className="mb-12"> 
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                {product.sustainable && (
                  <div className="flex items-center space-x-1 text-emerald-600 mb-3">
                    <Leaf className="w-4 h-4" />
                    <span className="text-sm">Sostenible</span>
                  </div>
                )}
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Ver producto
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
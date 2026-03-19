'use client';

import { useRouter, useParams } from 'next/navigation';
import { mockProducts, mockNews } from '@/src/data/mockData';
import { useState, useEffect } from 'react';
import { ChevronRight, Phone, Heart, ShoppingCart, Zap, Calendar, Building2, Gauge, Share2, Check, Facebook, Twitter, Linkedin, Mail, MessageCircle, X, ZoomIn, Tag, Clock } from 'lucide-react';
import { SEO } from '@/src/components/common/SEO';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState(mockProducts.find((p) => p.id === Number(id)));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    const product = mockProducts.find((p) => p.id === Number(id));
    setProduct(product);

    if (product) {
      // Check wishlist
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          const wishlist = JSON.parse(savedWishlist);
          setIsWishlisted(wishlist.some((item: any) => item.id === product.id));
        } catch {
          setIsWishlisted(false);
        }
      }

      // Check cart
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          setInCart(cart.some((item: any) => item.id === product.id));
        } catch {
          setInCart(false);
        }
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 md:pt-40 flex items-center justify-center p-4 transition-colors">
        <div className="text-center bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-md w-full transition-colors">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Không tìm thấy sản phẩm</p>
          <button
            onClick={() => router.push("/san-pham")}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const allImages = [product.image];
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productUrl = `https://duy-gia-phat.vercel.app/san-pham/${product.id}`;
  const productTitle = product.name || 'Sản phẩm điện công nghiệp';
  const shareText = `Xem sản phẩm: ${productTitle}`;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareLinks: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      email: `mailto:?subject=${encodeURIComponent(productTitle)}&body=${encodedText}%20${encodedUrl}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(productUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } else if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  const toggleWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    let wishlist = [];
    if (savedWishlist) {
      try {
        wishlist = JSON.parse(savedWishlist);
      } catch {
        wishlist = [];
      }
    }

    if (isWishlisted) {
      wishlist = wishlist.filter((item: any) => item.id !== product.id);
    } else {
      const existingProduct = wishlist.find((item: any) => item.id === product.id);
      if (!existingProduct) {
        wishlist.push(product);
      }
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
    window.dispatchEvent(new Event('wishlistUpdated'));

    setNotificationText(isWishlisted ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleAddToCart = () => {
    if (!product) return;

    const savedCart = localStorage.getItem('cart');
    let cart: any[] = [];
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch {
        cart = [];
      }
    }

    const existingIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingIndex >= 0) {
      cart.splice(existingIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      setInCart(false);
      setNotificationText('Đã xóa khỏi giỏ hàng');
    } else {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      setInCart(true);
      setNotificationText('Đã thêm vào giỏ hàng');
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 md:pt-40 transition-colors">
      <SEO
        title={`${product.name} | Chi tiết sản phẩm`}
        description={`${product.name} - Giá: Liên hệ. Mô tả: ${product.description || 'Thiết bị điện công nghiệp'}`}
        url={`https://duy-gia-phat.vn/san-pham/${product.id}`}
        image={`https://duy-gia-phat.vn/products/${product.id}.jpg`}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
          <button onClick={() => router.push("/")} className="hover:text-amber-600 dark:hover:text-amber-400 transition">Trang chủ</button>
          <ChevronRight size={16} className="text-gray-400" />
          <button onClick={() => router.push("/san-pham")} className="hover:text-amber-600 dark:hover:text-amber-400 transition">Thiết bị cơ điện</button>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-900 dark:text-white font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square flex items-center justify-center cursor-pointer group transition-colors" onClick={() => setIsZoomed(true)}>
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                  <ZoomIn size={24} className="text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all aspect-square ${
                      selectedImage === idx
                        ? "border-amber-500 ring-2 ring-amber-300 dark:ring-amber-600"
                        : "border-gray-200 dark:border-gray-700 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold w-fit mb-4 transition-colors">
              ✓ Sẵn hàng
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Mã sản phẩm: <span className="font-semibold text-gray-900 dark:text-white">DGP-{String(product.id).padStart(3, '0')}</span></p>

            {/* Price Box */}
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 transition-colors">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">Liên hệ báo giá</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">(Đã bao gồm VAT)</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {product.description || "Sản phẩm chất lượng cao, giải pháp điện công nghiệp hàng đầu."}
            </p>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {product.specs?.slice(0, 4).map((spec: any, idx: number) => {
                const getSpecIcon = () => {
                  const label = spec.label.toLowerCase();
                  if (label.includes('công suất') || label.includes('power') || label.includes('kw')) return <Zap className="text-amber-500" size={20} />;
                  if (label.includes('bảo hành') || label.includes('warranty') || label.includes('tháng')) return <Calendar className="text-blue-500" size={20} />;
                  if (label.includes('thương hiệu') || label.includes('brand') || label.includes('siemens')) return <Building2 className="text-purple-500" size={20} />;
                  return <Gauge className="text-green-500" size={20} />;
                };
                return (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-colors">
                    {getSpecIcon()}
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border-2 ${
                  inCart
                    ? "bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-400 border-amber-500"
                    : "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white border-amber-500"
                }`}
              >
                <ShoppingCart size={20} />
                <span>{inCart ? "Loại bỏ" : "Thêm vào"}</span>
              </button>
              <a
                href="tel:0976707297"
                className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border-2 border-amber-500 text-amber-600 dark:text-amber-400 font-bold py-4 px-6 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
              >
                <Phone size={20} />
                LIÊN HỆ BÁO GIÁ
              </a>
            </div>

            {/* Share & Wishlist */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <button
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <Share2 size={18} /> Chia sẻ
                </button>

                {/* Share Modal */}
                {isShareOpen && (
                  <div className="absolute top-12 left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-40 w-56 transition-colors">
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-3 px-2">Chia sẻ trên</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => { handleShare('facebook'); setIsShareOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Facebook size={18} className="text-blue-600" />
                        <span className="text-sm font-medium">Facebook</span>
                      </button>
                      <button
                        onClick={() => { handleShare('twitter'); setIsShareOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-blue-400"
                      >
                        <Twitter size={18} className="text-blue-400" />
                        <span className="text-sm font-medium">Twitter</span>
                      </button>
                      <button
                        onClick={() => { handleShare('linkedin'); setIsShareOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-blue-700"
                      >
                        <Linkedin size={18} className="text-blue-700" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </button>
                      <button
                        onClick={() => { handleShare('whatsapp'); setIsShareOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-green-500"
                      >
                        <MessageCircle size={18} className="text-green-500" />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </button>
                      <button
                        onClick={() => { handleShare('telegram'); setIsShareOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-blue-500"
                      >
                        <MessageCircle size={18} className="text-blue-500" />
                        <span className="text-sm font-medium">Telegram</span>
                      </button>
                      <button
                        onClick={() => { handleShare('email'); setIsShareOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-amber-600"
                      >
                        <Mail size={18} className="text-amber-600" />
                        <span className="text-sm font-medium">Email</span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <button
                        onClick={() => { handleShare('copy'); setIsShareOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        {copySuccess ? (
                          <>
                            <Check size={18} className="text-green-500" />
                            <span className="text-sm font-medium text-green-500">Đã sao chép!</span>
                          </>
                        ) : (
                          <>
                            <Share2 size={18} />
                            <span className="text-sm font-medium">Sao chép liên kết</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={toggleWishlist}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition ${
                  isWishlisted
                    ? "bg-red-500 dark:bg-red-600 border-red-500 text-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Heart size={18} className={isWishlisted ? "fill-current" : ""} /> Yêu thích
              </button>
            </div>

            {showNotification && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg text-center transition-colors">
                {notificationText}
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          {/* Tab Buttons */}
          <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
            {["description", "specs", "documents"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold text-sm whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-amber-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab === "description" && "Mô tả chi tiết"}
                {tab === "specs" && "Thông số kỹ thuật"}
                {tab === "documents" && "Tài liệu hướng dẫn"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === "description" && (
                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                  <section>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tổng quan sản phẩm</h3>
                    <p className="leading-relaxed">
                      {product.description || "Sản phẩm chất lượng cao, giải pháp điện công nghiệp hàng đầu."}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tính năng nổi bật</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-amber-500 flex-shrink-0">✓</span>
                        <span>Tích hợp bộ lọc EMC lớp A chống nhiễu điện từ</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-amber-500 flex-shrink-0">✓</span>
                        <span>Chế độ điều khiển Vector không cần cảm biến cho momen xoắn cao</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-amber-500 flex-shrink-0">✓</span>
                        <span>Giao thức truyền thông RS485/USS/Modbus RTU tích hợp sẵn</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-amber-500 flex-shrink-0">✓</span>
                        <span>Cấp bảo vệ IP54, chống bụi và tia nước bắn từ mọi phía</span>
                      </li>
                    </ul>
                  </section>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="space-y-4">
                  {product.specs?.map((spec: any, idx: number) => (
                    <div key={idx} className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{spec.label}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-4">
                  {[
                    { name: "Catalog sản phẩm.pdf", size: "2.4 MB" },
                    { name: "Hướng dẫn lắp đặt tủ.pdf", size: "1.8 MB" },
                    { name: "Sơ đồ đấu nối mạch.pdf", size: "3.1 MB" },
                  ].map((doc, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition group"
                    >
                      <div className="text-red-500 shrink-0 text-2xl">📄</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-1">{doc.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{doc.size}</p>
                      </div>
                      <div className="text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition shrink-0">⬇️</div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - Basic Info */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 h-fit transition-colors">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Thông số cơ bản</h3>
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Hãng SX</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">Siemens</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Series</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">G120</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Kiểu lắp</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">Treo tường</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Bảo hành</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">24 tháng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => router.push(`/san-pham/${p.id}`)}
                  className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 h-48 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{p.category}</p>
                    <p className="font-bold text-gray-900 dark:text-white line-clamp-2">{p.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* News & Articles Section */}
        <div className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Tin tức & Bài viết liên quan</h2>
            <button
              onClick={() => router.push("/tin-tuc")}
              className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Xem tất cả <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.slice(0, 3).map((article) => (
              <button
                key={article.id}
                onClick={() => router.push(`/tin-tuc/${article.id}`)}
                className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-amber-200 dark:hover:border-amber-700 transition-all text-left"
              >
                {/* Article Image */}
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Article Content */}
                <div className="p-5">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-amber-500" />
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">{article.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={14} />
                      {article.date}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition text-gray-900 dark:text-white">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="text-amber-600 dark:text-amber-400 font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                    Đọc thêm <ChevronRight size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/80 dark:bg-black/90 z-50 flex items-center justify-center p-4 transition-colors">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <X size={32} />
            </button>

            {/* Main Zoomed Image */}
            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg bg-black">
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                style={{ transform: `scale(${zoomLevel / 100})` }}
                className="max-w-full max-h-full object-contain transition-transform duration-200 cursor-zoom-in"
                onClick={() => setZoomLevel(zoomLevel === 100 ? 150 : 100)}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 mt-4 px-4">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 rounded-lg p-2 backdrop-blur">
                <button
                  onClick={() => setZoomLevel(Math.max(50, zoomLevel - 20))}
                  className="px-3 py-1 text-white hover:bg-white/20 rounded transition text-sm"
                >
                  −
                </button>
                <span className="text-white text-sm min-w-12 text-center">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(200, zoomLevel + 20))}
                  className="px-3 py-1 text-white hover:bg-white/20 rounded transition text-sm"
                >
                  +
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto flex-1 justify-center">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setZoomLevel(100); }}
                    className={`w-12 h-12 rounded border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx
                        ? "border-amber-500"
                        : "border-white/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsZoomed(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

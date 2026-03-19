'use client';

import { useRouter, useParams } from 'next/navigation';
import { mockProducts } from '@/src/data/mockData';
import { useState, useEffect } from 'react';
import { ChevronLeft, Heart, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { SEO } from '@/src/components/common/SEO';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState(mockProducts.find((p) => p.id === Number(id)));
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  useEffect(() => {
    const product = mockProducts.find((p) => p.id === Number(id));
    setProduct(product);

    if (product) {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          const wishlist = JSON.parse(savedWishlist);
          setIsWishlisted(wishlist.some((item: any) => item.id === product.id));
        } catch (error) {
          console.error('Error parsing wishlist:', error);
        }
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 md:pt-32 flex items-center justify-center transition-colors">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Sản phẩm không tìm thấy</p>
          <button
            onClick={() => router.push('/san-pham')}
            className="px-6 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded hover:bg-amber-600 dark:hover:bg-amber-700 transition"
          >
            Về danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    let wishlist = [];
    if (savedWishlist) {
      try {
        wishlist = JSON.parse(savedWishlist);
      } catch (error) {
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

  const addToCart = () => {
    const savedCart = localStorage.getItem('cart');
    let cart = [];
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch (error) {
        cart = [];
      }
    }

    const existingProduct = cart.find((item: any) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    setNotificationText('Đã thêm vào giỏ hàng');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  // Related products
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 md:pt-32 transition-colors duration-300">
      <SEO
        title={`${product.name} | Chi tiết sản phẩm`}
        description={`${product.name} - Giá: Liên hệ. Mô tả: ${product.description || 'Thiết bị điện công nghiệp'}`}
        url={`https://duygiaphat.vn/san-pham/${product.id}`}
        image={`https://duygiaphat.vn/products/${product.id}.jpg`}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mb-6 font-medium transition"
        >
          <ChevronLeft size={20} />
          Quay lại
        </button>

        {/*Product Details */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden lg:flex mb-12 transition-colors">
          {/* Image */}
          <div className="lg:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-8 min-h-96 transition-colors">
            <p className="text-gray-500 dark:text-gray-400">Hình ảnh sản phẩm</p>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">({product.rating} sao)</span>
                <span className="text-gray-600 dark:text-gray-400">• {product.sales} đã bán</span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Giá:</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  'Liên hệ'
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg transition-colors">
                <p className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" />
                  {product.inStock ? (
                    <span className="text-green-600 dark:text-green-400">Còn hàng (Có sẵn)</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">Hết hàng</span>
                  )}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border dark:border-gray-700 rounded-lg transition-colors">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center border-0 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={toggleWishlist}
                  className={`px-4 py-2 border rounded-lg font-medium transition ${
                    isWishlisted
                      ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-red-300'
                  }`}
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? 'fill-current' : ''}
                  />
                </button>
              </div>

              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`w-full py-3 rounded-lg font-bold text-white transition flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700'
                    : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                Thêm vào giỏ hàng
              </button>

              {showNotification && (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg text-center transition-colors">
                  {notificationText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

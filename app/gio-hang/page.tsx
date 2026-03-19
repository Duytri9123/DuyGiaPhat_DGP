'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === 'number' ? item.price * (item.quantity || 1) : 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 md:pt-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-6 font-medium hover:opacity-80 transition"
        >
          <ChevronLeft size={20} />
          Quay lại
        </button>

        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg p-12 text-center transition-colors">
            <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">Giỏ hàng của bạn trống</p>
            <button
              onClick={() => router.push('/san-pham')}
              className="bg-amber-500 dark:bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 transition"
            >
              Tiếp tục mua hàng
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow transition-colors">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-6 ${
                      index !== cartItems.length - 1 ? 'border-b dark:border-gray-800' : ''
                    }`}
                  >
                    <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center transition-colors">
                      {item.image ? (
                        <img
                          src={typeof item.image === 'string' ? item.image : item.image.src}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400 dark:text-gray-600 text-center text-sm">Không có hình</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-amber-600 dark:text-amber-400 font-bold text-lg">
                        {typeof item.price === 'number'
                          ? `${item.price.toLocaleString('vi-VN')} đ`
                          : 'Liên hệ'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg transition-colors">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-bold min-w-[30px] text-center">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow sticky top-24 transition-colors">
                <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Tóm tắt đơn hàng</h3>
                <div className="space-y-3 mb-6 pb-6 border-b dark:border-gray-800">
                  <div className="flex justify-between text-gray-900 dark:text-gray-100">
                    <span className="text-gray-600 dark:text-gray-400">Số sản phẩm:</span>
                    <span className="font-bold">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tổng tiền:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {totalPrice.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>
                <button className="w-full bg-amber-500 dark:bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 flex items-center justify-center gap-2 transition mb-3">
                  <ShoppingCart size={20} />
                  Thanh toán
                </button>
                <button
                  onClick={() => router.push('/san-pham')}
                  className="w-full border-2 border-amber-500 dark:border-amber-600 text-amber-600 dark:text-amber-400 py-3 rounded-lg font-bold hover:bg-amber-50 dark:hover:bg-amber-950/30 transition"
                >
                  Tiếp tục mua hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

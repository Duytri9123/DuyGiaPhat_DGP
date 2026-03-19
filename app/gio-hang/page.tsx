'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SEO } from '@/src/components/common/SEO';

interface CartItem {
  id: number;
  name: string;
  price?: number;
  image?: string;
  quantity?: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      if (typeof window === 'undefined') return;
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) {
        setCartItems([]);
        return;
      }
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCartItems([]);
      }
    };

    loadCart();

    if (typeof window !== 'undefined') {
      window.addEventListener('cartUpdated', loadCart);
      return () => window.removeEventListener('cartUpdated', loadCart);
    }
  }, []);

  const persistCart = (items: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemove = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    persistCart(updated);
  };

  const handleQuantityChange = (id: number, qty: number) => {
    if (qty <= 0) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    persistCart(updated);
  };

  const total = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
    return sum + price * quantity;
  }, 0);

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems.length) {
      alert('Vui lòng thêm sản phẩm vào giỏ hàng');
      return;
    }
    setSubmitting(true);
    try {
      console.log('Quote request:', {
        customerName,
        phone,
        email,
        company,
        note,
        items: cartItems,
        total,
      });
      alert('Gửi yêu cầu báo giá thành công! Chúng tôi sẽ liên hệ lại sớm nhất.');
      setCustomerName('');
      setPhone('');
      setEmail('');
      setCompany('');
      setNote('');
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Gửi yêu cầu thất bại, vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 md:pt-40">
      <SEO
        title="Giỏ hàng"
        description="Giỏ hàng & yêu cầu báo giá sản phẩm"
        url="https://duy-gia-phat.vn/gio-hang"
      />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-3 font-medium"
          >
            <ChevronLeft size={20} />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Giỏ hàng</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Bạn có {cartItems.length} sản phẩm trong giỏ
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                >
                  {item.image && (
                    <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Mã: DGP-{String(item.id).padStart(3, '0')}
                    </p>
                    <p className="text-amber-600 dark:text-amber-400 font-bold mt-1">
                      {typeof item.price === 'number'
                        ? `${item.price.toLocaleString()}đ`
                        : 'Liên hệ'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      <button
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        className="p-1 disabled:opacity-50"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        className="p-1"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 h-fit">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Yêu cầu báo giá</h3>
              <div className="space-y-2 pb-4 border-b border-gray-200 dark:border-gray-700 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tạm tính:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {total.toLocaleString()}đ
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmitQuote} className="space-y-3 text-sm">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email (nếu có)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Công ty / đơn vị"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder="Ghi chú thêm về yêu cầu"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold py-2.5 rounded disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {submitting ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu báo giá'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-lg p-12 text-center">
            <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng
            </p>
            <button
              onClick={() => router.push('/san-pham')}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-8 py-3 rounded font-bold"
            >
              <ShoppingCart size={20} />
              Khám phá sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

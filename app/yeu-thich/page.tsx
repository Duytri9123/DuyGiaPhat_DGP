'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-amber-600 mb-6 font-medium"
        >
          <ChevronLeft size={20} />
          Quay lại
        </button>

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Heart size={32} className="text-red-500 fill-red-500" />
          Danh sách yêu thích
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 mb-4">Chưa có sản phẩm yêu thích</p>
            <button
              onClick={() => router.push('/san-pham')}
              className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
            >
              Khám phá sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/san-pham/${product.id}`)}
              >
                <div className="h-48 bg-gray-200 rounded mb-3" />
                <h3 className="font-bold line-clamp-2">{product.name}</h3>
                <p className="text-amber-600 font-bold mt-2">Liên hệ</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

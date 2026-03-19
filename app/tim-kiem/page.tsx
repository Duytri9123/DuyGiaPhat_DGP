'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { mockProducts } from '@/src/data/mockData';
import { Suspense } from 'react';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') || '';

  const results = q
    ? mockProducts.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
      )
    : [];

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

        <h1 className="text-4xl font-bold mb-2">Tìm kiếm</h1>
        <p className="text-gray-600 mb-8">Kết quả tìm kiếm cho: "{q}"</p>

        {results.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 mb-4">Không tìm thấy sản phẩm nào</p>
            <button
              onClick={() => router.push('/san-pham')}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-4"
                onClick={() => router.push(`/san-pham/${product.id}`)}
              >
                <div className="h-40 bg-gray-200 rounded mb-3" />
                <h3 className="font-bold line-clamp-2">{product.name}</h3>
                <p className="text-amber-600 font-bold mt-2">
                  'Liên hệ'
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

'use client';

import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { mockProducts } from '@/src/data/mockData';
import { categories } from '@/src/data/categories';
import { Suspense } from 'react';

function CategoryContent() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params?.category as string;

  const category = categories.find((c) => c.slug === categorySlug);
  const products = categorySlug
    ? mockProducts.filter((p) => p.category === categorySlug)
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

        <h1 className="text-4xl font-bold mb-12">
          {category ? category.name : 'Danh mục sản phẩm'}
        </h1>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600">Không tìm thấy sản phẩm trong danh mục này</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <span>⭐ {product.rating}</span>
                  <span className="text-gray-600">({product.sales} đã bán)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20">Loading...</div>}>
      <CategoryContent />
    </Suspense>
  );
}

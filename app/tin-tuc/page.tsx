'use client';

import { mockNews } from '@/src/data/mockData';
import { CalendarDays, ChevronRight, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Helper function
const getImageUrl = (img: any): string => {
  if (typeof img === 'string' && img) return img;
  if (img?.src && typeof img.src === 'string') return img.src;
  return '';
};

export default function NewsPage() {
  const router = useRouter();
  const article = mockNews[0];
  const related = mockNews.slice(1, 4);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-24 pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] sm:tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-8">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="cursor-pointer hover:text-amber-500 whitespace-nowrap"
          >
            Trang chủ
          </button>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 dark:text-slate-100">Tin tức</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main content */}
          <section className="lg:col-span-8 space-y-6">
            <h1 className="text-3xl lg:text-4xl font-black text-slate-950 dark:text-white">TIN TỨC & KIẾN THỨC KỸ THUẬT</h1>
            
            {/* Featured article */}
            {article && (
              <article
                onClick={() => router.push(`/tin-tuc/${article.id}`)}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-80 h-48 md:h-64 flex-shrink-0 bg-slate-200 dark:bg-slate-700 overflow-hidden group">
                    {getImageUrl(article.image) ? (
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center text-6xl">
                      📰
                    </div>
                  </div>
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-3">
                        {article.title}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 pt-4 border-t dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-amber-500" />
                        <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-amber-500" />
                        <span>{(article.views || 0).toLocaleString('vi-VN')} lượt xem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Articles list */}
            <div className="space-y-6">
              {mockNews.slice(1).map((item) => (
                <article
                  key={item.id}
                  onClick={() => router.push(`/tin-tuc/${item.id}`)}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-32 sm:h-40 flex-shrink-0 bg-slate-200 dark:bg-slate-700 overflow-hidden group relative">
                      {getImageUrl(item.image) ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div className={`absolute inset-0 ${getImageUrl(item.image) ? 'hidden' : ''} w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center text-4xl`}>
                        📰
                      </div>
                    </div>
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-3 border-t dark:border-slate-800 mt-3">
                        <div className="flex items-center gap-1">
                          <CalendarDays size={14} className="text-amber-500" />
                          <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={14} className="text-amber-500" />
                          <span>{(item.views || 0).toLocaleString('vi-VN')} lượt xem</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:space-y-8">
            {/* Latest posts widget */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b-2 border-amber-500 inline-block text-slate-900 dark:text-white">
                BÀI VIẾT MỚI NHẤT
              </h4>
              <div className="space-y-5">
                {mockNews.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => router.push(`/tin-tuc/${item.id}`)}
                    className="flex gap-4 group cursor-pointer text-left w-full"
                  >
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden shrink-0 relative">
                      {getImageUrl(item.image) ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div className={`absolute inset-0 ${getImageUrl(item.image) ? 'hidden' : ''} w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center text-2xl`}>
                        📰
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">
                        {new Date(item.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA banner */}
            <div className="bg-slate-900 dark:bg-black p-7 rounded-lg relative overflow-hidden text-white shadow-md">
              <div className="absolute inset-0 bg-amber-500/5" />
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-2 leading-tight">
                  CẦN TƯ VẤN KỸ THUẬT?
                </h4>
                <p className="text-slate-300 text-sm mb-5">
                  Đội ngũ kỹ sư giàu kinh nghiệm sẵn sàng hỗ trợ 24/7 cho dự án điện công nghiệp.
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/lien-he')}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-black uppercase tracking-[0.18em] text-xs rounded hover:scale-[1.02] transition-transform"
                >
                  Gửi yêu cầu ngay
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

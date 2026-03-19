'use client';

import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, CalendarDays, Eye } from 'lucide-react';
import { mockNews } from '@/src/data/mockData';

export default function NewsDetail() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  
  const article = mockNews.find((item) => item.id === id);
  const related = mockNews.filter((item) => item.id !== id).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 md:pt-32 flex items-center justify-center transition-colors">
        <p className="text-gray-600 dark:text-gray-400">Bài viết không tìm thấy</p>
      </div>
    );
  }

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
          <span className="text-slate-400">/</span>
          <button
            type="button"
            onClick={() => router.push('/tin-tuc')}
            className="cursor-pointer hover:text-amber-500 whitespace-nowrap"
          >
            Tin tức
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 dark:text-slate-100 truncate max-w-[260px] md:max-w-[360px]">
            {article.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Article content */}
          <section className="lg:col-span-8">
            <article className="bg-white dark:bg-gray-900 rounded-lg p-2 overflow-hidden transition-colors">
              {/* Header */}
              <header className="px-0 md:px-0 mb-6 md:mb-8">
                <h1 className="text-2xl md:text-4xl font-black text-slate-950 dark:text-white leading-tight mb-4 md:mb-6 tracking-tight">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 border-y border-slate-100 dark:border-slate-800 py-3 md:py-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-amber-500" />
                    <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      {article.author
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-500" />
                    <span>{(article.views || 0).toLocaleString('vi-VN')} lượt xem</span>
                  </div>
                </div>
              </header>

              {/* Hero image */}
              <div className="mb-8 aspect-video w-full bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden group">
                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-500">
                  📰
                </div>
              </div>

              {/* Body content */}
              <div className="max-w-none pb-8 text-slate-700 dark:text-slate-300">
                <p className="text-lg font-medium leading-relaxed text-slate-900 dark:text-white mb-6">
                  {article.excerpt}
                </p>

                {/* Content paragraphs */}
                {article.content.split('\n\n').map((block, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {block}
                  </p>
                ))}

                {/* Tags */}
                <footer className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold uppercase rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </footer>
              </div>
            </article>

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-14">
                <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-7 bg-amber-500 block" />
                  BÀI VIẾT LIÊN QUAN
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => router.push(`/tin-tuc/${item.id}`)}
                      className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer text-left"
                    >
                      <div className="aspect-video bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                          📰
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors text-sm">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:space-y-10">
            {/* Latest posts widget */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-slate-100 dark:border-slate-800 transition-colors">
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
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center text-2xl">
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

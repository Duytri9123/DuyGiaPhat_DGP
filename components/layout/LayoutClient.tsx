'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, Moon, Sun } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@/components/ThemeProvider';
import zaloIcon from '@/src/assets/icons8-zalo.svg';

// Helper function to extract SVG URL
const getSvgUrl = (svg: any): string => {
  if (typeof svg === 'string' && svg) return svg;
  if (svg?.src && typeof svg.src === 'string') return svg.src;
  if (svg?.default?.src && typeof svg.default.src === 'string') return svg.default.src;
  return '';
};

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Theo dõi scroll để hiện/ẩn nút Back to Top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hàm scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll lên đầu khi pathname thay đổi
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <HelmetProvider>
      <Header />
      <main className="min-h-screen relative">
        {children}
      </main>
      <Footer />

      {/* ==================== NÚT DARK MODE ==================== */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-60 right-8 z-50 group transition-all duration-300"
        aria-label="Dark mode toggle"
        title={theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
      >
        <div className="relative">
          {/* Hiệu ứng glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>

          {/* Nút chính */}
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            {theme === 'light' ? (
              <Moon className="w-6 h-6 text-white" strokeWidth={2.5} />
            ) : (
              <Sun className="w-6 h-6 text-white" strokeWidth={2.5} />
            )}
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap hidden lg:block">
            <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs font-medium px-3 py-2 rounded-lg">
              {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-800 dark:border-l-gray-200"></div>
            </div>
          </div>
        </div>
      </button>

      {/* ==================== NÚT BACK TO TOP ==================== */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-40 right-8 z-50 group transition-all duration-300 ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Lên đầu trang"
      >
        <div className="relative">
          {/* Hiệu ứng glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>

          {/* Nút chính */}
          <div className="relative bg-gradient-to-r from-gray-700 to-gray-800 p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            <ChevronUp className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap hidden lg:block">
            <div className="bg-gray-300/50 dark:bg-gray-700/50 text-white text-xs font-medium px-3 py-2 rounded-lg">
              Lên đầu trang
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-900 dark:border-l-gray-800"></div>
            </div>
          </div>
        </div>
      </button>

      {/* ==================== ZALO NỔI (FLOATING BUTTON) ==================== */}
      <a
        href="https://zalo.me/0976707297"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 z-50 group"
        aria-label="Chat Zalo"
      >
        <div className="relative">
          {/* Nút chính */}
          <div className="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            <img src={getSvgUrl(zaloIcon)} alt="Zalo" className="w-16 h-16" onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"%3E%3Cpath d="M12.49 10.272v-.45h1.347v6.322h-.77a.576.576 0 0 1-.577-.573v.001a3.27 3.27 0 0 1-1.938.632a3.284 3.284 0 0 1-3.284-3.282a3.284 3.284 0 0 1 3.284-3.282a3.27 3.27 0 0 1 1.937.632zM6.919 7.79v.205c0 .382-.051.694-.3 1.06l-.03.034a8 8 0 0 0-.242.285L2.024 14.8h4.895v.768a.576.576 0 0 1-.577.576H0v-.362c0-.443.11-.641.25-.847L4.858 9.23H.192V7.79zm8.551 8.354a.48.48 0 0 1-.48-.48V7.79h1.441v8.354zM20.693 9.6a3.306 3.306 0 1 1 .002 6.612a3.306 3.306 0 0 1-.002-6.612m-10.14 5.253a1.932 1.932 0 1 0 0-3.863a1.932 1.932 0 0 0 0 3.863m10.14-.003a1.945 1.945 0 1 0 0-3.89a1.945 1.945 0 0 0 0 3.89"/%3E%3C/svg%3E';
            }} />
          </div>

          {/* Tooltip khi hover (chỉ trên desktop) */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap hidden lg:block">
            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium px-3 py-2 rounded-lg">
              Chat Zalo: 0976 707 297
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-gray-900 dark:border-l-gray-100"></div>
            </div>
          </div>

          {/* Badge "Online" */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse"></span>
        </div>
      </a>
    </HelmetProvider>
  );
}

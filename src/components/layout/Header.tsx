'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Search, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '../../data/mockData';
import logo from '../../assets/logo.png';

// Helper function
const getImageUrl = (img: any): string => {
  if (typeof img === 'string' && img) return img;
  if (img?.src && typeof img.src === 'string') return img.src;
  return '';
};

export default function Header() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryMobile, setSearchQueryMobile] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSuggestionsMobile, setShowSuggestionsMobile] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load cart and wishlist counts from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (searchRefMobile.current && !searchRefMobile.current.contains(event.target as Node)) {
        setShowSuggestionsMobile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = searchQuery
    ? mockProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredProductsMobile = searchQueryMobile
    ? mockProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQueryMobile.toLowerCase())
      )
    : [];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query)}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSearchMobile = (query: string) => {
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query)}`);
      setSearchQueryMobile('');
      setShowSuggestionsMobile(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src={getImageUrl(logo)} alt="Duy Gia Phát" className="h-12 w-auto" />
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyPress={(e) =>
                  e.key === 'Enter' && handleSearch(searchQuery)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              {showSuggestions && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredProducts.slice(0, 5).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        router.push(`/san-pham/${product.id}`);
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            <Link
              href="/san-pham"
              className="text-gray-700 hover:text-amber-600 font-medium"
            >
              Sản phẩm
            </Link>
            <Link
              href="/gioi-thieu"
              className="text-gray-700 hover:text-amber-600 font-medium"
            >
              Giới thiệu
            </Link>
            <Link
              href="/lien-he"
              className="text-gray-700 hover:text-amber-600 font-medium"
            >
              Liên hệ
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Desktop Search Icon */}
            <button
              onClick={() => setShowMobileSearchBar(!showMobileSearchBar)}
              className="lg:hidden text-gray-700 hover:text-amber-600"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => router.push('/yeu-thich')}
              className="relative text-gray-700 hover:text-amber-600"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => router.push('/gio-hang')}
              className="relative text-gray-700 hover:text-amber-600"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearchBar && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="relative" ref={searchRefMobile}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQueryMobile}
                onChange={(e) => {
                  setSearchQueryMobile(e.target.value);
                  setShowSuggestionsMobile(true);
                }}
                onKeyPress={(e) =>
                  e.key === 'Enter' && handleSearchMobile(searchQueryMobile)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {showSuggestionsMobile && filteredProductsMobile.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {filteredProductsMobile.slice(0, 3).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        router.push(`/san-pham/${product.id}`);
                        setSearchQueryMobile('');
                        setShowSuggestionsMobile(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/san-pham"
                className="text-gray-700 hover:text-amber-600 font-medium"
                onClick={() => setSidebarOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link
                href="/gioi-thieu"
                className="text-gray-700 hover:text-amber-600 font-medium"
                onClick={() => setSidebarOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link
                href="/lien-he"
                className="text-gray-700 hover:text-amber-600 font-medium"
                onClick={() => setSidebarOpen(false)}
              >
                Liên hệ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

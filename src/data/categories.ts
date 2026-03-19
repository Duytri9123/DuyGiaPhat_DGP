// src/data/categories.ts
import { mockProducts } from './mockData';
import type { StaticImageData } from 'next/image';

// Import các icon images từ assets
import thangMangIcon from '../assets/thang-mang.jpg';
import tuDienIcon from '../assets/tu-dien.png';
import tuDieuKhienIcon from '../assets/tu-dieu-khien.jpg';
import voTuIcon from '../assets/vo-tu.jpg';
import tuCuuHoaIcon from '../assets/tu-cuu-hoa.jpg';

export interface Category {
  id: number;
  name: string;
  slug: string;
  iconUrl: StaticImageData | string;
  count: number;
  description?: string;
  featured?: boolean;
}

// Hàm đếm số sản phẩm theo category
const getProductCount = (slug: string): number => {
  return mockProducts.filter(product => product.category === slug).length;
};

export const categories: Category[] = [
  {
    id: 1,
    name: "Tủ điện",
    slug: "tu-dien",
    iconUrl: typeof tuDienIcon === 'string' ? tuDienIcon : tuDienIcon.src,
    count: getProductCount("tu-dien"),
    description: "Tủ ATS, MDB, tủ bù công suất, tủ điều khiển công nghiệp",
    featured: true,
  },
  {
    id: 2,
    name: "Tủ điều khiển",
    slug: "tu-dieu-khien",
    iconUrl: typeof tuDieuKhienIcon === 'string' ? tuDieuKhienIcon : tuDieuKhienIcon.src,
    count: getProductCount("tu-dieu-khien"),
    description: "Tủ điều khiển PLC, tủ tự động hóa, tủ điều khiển máy bơm",
    featured: true,
  },
  {
    id: 3,
    name: "Vỏ tủ",
    slug: "vo-tu",
    iconUrl: typeof voTuIcon === 'string' ? voTuIcon : voTuIcon.src,
    count: getProductCount("vo-tu"),
    description: "Vỏ tủ điện treo tường, âm tường, đứng sàn - IP65/IP66",
    featured: true,
  },
  {
    id: 4,
    name: "Thang máng và phụ kiện",
    slug: "thang-mang-va-phu-kien",
    iconUrl: typeof thangMangIcon === 'string' ? thangMangIcon : thangMangIcon.src,
    count: getProductCount("thang-mang-va-phu-kien"),
    description: "Thang cáp, máng cáp, phụ kiện lắp đặt - chất lượng cao",
    featured: true,
  },
  {
    id: 5,
    name: "Tủ cứu hỏa",
    slug: "tu-cuu-hoa",
    iconUrl: typeof tuCuuHoaIcon === 'string' ? tuCuuHoaIcon : tuCuuHoaIcon.src,
    count: getProductCount("tu-cuu-hoa"),
    description: "Tủ chữa cháy, bình cứu hỏa, thiết bị PCCC đạt chuẩn",
    featured: true,
  },
];

// Export tổng số sản phẩm
export const totalProducts = mockProducts.length;
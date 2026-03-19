// src/assets/images.ts
// Image mappings for the application

import tuTram from './products/tu-tram.jpg';
import tuDieuKhienBms from './products/tu-dieu-khien-bms.jpg';
import tuCongTo from './products/tu-cong-to.jpg';
import tuDieuKhienDongCoKhoiDongTruc from './products/tu-dieu-khien-dong-co-khoi-dong-truc.png';
import tuDieuKhienDongCo2Cap from './products/tu-dieu-khien-dong-co-2-cap.png';
import tuDieuKhienDongCo from './products/tu-dieu-khien-dong-co.png';
import tuDieuKhienPlc from './products/tu-dieu-khien-plc.jpg';
import tuAts from './products/tu-ats.png';
import tuCuuHoa from './products/tu-cuu-hoa.png';
import tuPhongChayChuaChay from './products/tu-phong-chay-chua-chay.jpg';
import voTuTrongNhaVaNgoaiTroi from './products/vo-tu-trong-nha-va-ngoai-troi.png';
import mangCap from './products/mang-cap.jpg';
import coLenThangCap from './products/co-len-thang-cap.jpg';
import coXuongMangCap from './products/co-xuong-mang-cap.jpg';
import ngaBaMangCap from './products/nga-ba-mang-cap.jpg';
import ngaBaThangCap from './products/nga-ba-thang-cap.jpg';
import ngaTuMangCap from './products/nga-tu-mang-cap.jpg';
import ngaTuThangCap from './products/nga-tu-thang-cap.jpg';
import cutVuong90DoMangCap from './products/cut-vuong-90-do-mang-cap.jpg';
import keDungBinhChuaChay from './products/ke-dung-binh-chua-chay.jpg';

// Helper function to extract image path from import (handles both string and object returns)
const getImagePath = (img: any): string => {
  if (typeof img === 'string') return img;
  if (img?.src) return img.src;
  if (img?.default?.src) return img.default.src;
  if (img?.default) return img.default;
  console.warn('Image import format not recognized:', img);
  return '';
};

const images = {
  tuTram: getImagePath(tuTram),
  tuDieuKhienBms: getImagePath(tuDieuKhienBms),
  tuCongTo: getImagePath(tuCongTo),
  tuDieuKhienDongCoKhoiDongTruc: getImagePath(tuDieuKhienDongCoKhoiDongTruc),
  tuDieuKhienDongCo2Cap: getImagePath(tuDieuKhienDongCo2Cap),
  tuDieuKhienDongCo: getImagePath(tuDieuKhienDongCo),
  tuDieuKhienPlc: getImagePath(tuDieuKhienPlc),
  tuAts: getImagePath(tuAts),
  tuCuuHoa: getImagePath(tuCuuHoa),
  tuPhongChayChuaChay: getImagePath(tuPhongChayChuaChay),
  voTuTrongNhaVaNgoaiTroi: getImagePath(voTuTrongNhaVaNgoaiTroi),
  mangCap: getImagePath(mangCap),
  coLenThangCap: getImagePath(coLenThangCap),
  coXuongMangCap: getImagePath(coXuongMangCap),
  ngaBaMangCap: getImagePath(ngaBaMangCap),
  ngaBaThangCap: getImagePath(ngaBaThangCap),
  ngaTuMangCap: getImagePath(ngaTuMangCap),
  ngaTuThangCap: getImagePath(ngaTuThangCap),
  cutVuong90DoMangCap: getImagePath(cutVuong90DoMangCap),
  keDungBinhChuaChay: getImagePath(keDungBinhChuaChay),
};

export default images;

// diğer dosylardan gelenler
import { renderCategories, renderProducts } from './ui.js';

// html'in yüklenme anını izleme
document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
  fetchProducts();
});

const baseUrl = 'https://api.escuelajs.co/api/v1';

/*
 * kategori bilgilerini alma:
 * 1- Apiye istek at
 * 2- gelen veriyi işle
 * 3- gelen verileri ekrana basıcak fonksiyon çalıştır
 */

function fetchCategories() {
  fetch(`${baseUrl}/categories`)
    // eğerki veri gelirse çalışır
    .then((response) => response.json())
    // veri json formatına dönünce çalışır
    .then((data) => renderCategories(data))
    // hata oluşursa çalışır
    .catch((error) => console.log(error));
}

// Ürünler verisini çek
async function fetchProducts() {
  try {
    // veri çekme isteği at
    const res = await fetch(`${baseUrl}/products`);
    // gelen veriyi işle
    const data = await res.json();
    // bu veriyi ekrana bas
    renderProducts(data);
  } catch (err) {
    //TODO eğer hata olusa hatayı yönet
    console.log(err);
  }
}

// Sepet İşlemleri

const modal = document.querySelector('.modal-wrapper');
const sepetBtn = document.querySelector('#sepet-btn');
const closeBtn = document.querySelector('#close-btn');

// sepet butonuna basılma olyını izleme
sepetBtn.addEventListener('click', () => {
  // modalı görünür yapma
  modal.classList.add('active');
});

// çarpı butonuna basılma olyını izleme
closeBtn.addEventListener('click', () => {
  // modalı ortadan kaldırdık
  modal.classList.remove('active');
});

// modal dışında bir yere tıklanma olayını izleme
document.addEventListener('click', (e) => {
  var clickedEl = e.target;
  if (clickedEl.classList.contains('modal-wrapper')) {
    modal.classList.remove('active');
  }
});

// Alternatif yöntem:
// document.body.addEventListener('click', (event) => {
//   if (event.target === sepetBtn) {
//     modal.classList.add('active');
//   } else if (event.target === closeBtn) {
//     modal.classList.remove('active');
//   }
// });

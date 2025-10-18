let header = document.getElementsByClassName('header')[0];

header.innerHTML = `

  <div class="container">
    <div class="image">
      <img src="img/store.png" alt="" />
    </div>
    <div class="links">
      <span class="close_menu" onclick="close_menu()"><i class="fa-solid fa-xmark"></i></span>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">shop</a></li>
        <li><a href="#">Sales</a></li>
        <li><a href="#footer">Contact</a></li>
      </ul>
    </div>
    <div class="menu">
      <div class="cart" onclick="open_close_cart()">
      <i class="fa-solid fa-cart-shopping"></i>
      <span class="count_item_cart">0</span>
      </div>
      <span class="open_menu" onclick="open_menu()"><i class="fa-solid fa-bars"></i></span>
    </div>
  </div>

`;

const links = document.querySelector('.links');

function open_menu() {
  links.classList.add('active');
}

function close_menu() {
  links.classList.remove('active');
}

// end header

// الزر
const scrollBtn = document.getElementById('scroll');

// مراقبة التمرير
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    // لما ينزل أكثر من 400px
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

// عند الضغط على الزر
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // حركة سلسة
  });
});

// 🔹 تحميل بيانات Hot Deals (المنتجات التي تحتوي على old_price)
async function loadHotDealsSwiper() {
  try {
    const response = await fetch('products.json');
    const data = await response.json();

    // تصفية المنتجات التي تحتوي على خصم
    const discounted = data.filter((p) => p.old_price);

    const container = document.getElementById('hot_deals');
    container.innerHTML = '';

    discounted.forEach((product) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      slide.innerHTML = `
        <div class="product-sale">
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <div class="prices">
            <span class="new-price">$${product.price}</span>
            <span class="old-price">$${product.old_price}</span>
          </div>
          <button class="add-cart">Add To Cart</button>
        </div>
      `;
      container.appendChild(slide);
    });
  } catch (error) {
    console.error('خطأ في تحميل السلايدر:', error);
  }
}

// 🔹 تحميل الموبايلات
async function loadMobilesSwiper() {
  try {
    const response = await fetch('products.json');
    const data = await response.json();

    const mobiles = data.filter((p) => p.catetory === 'mobiles');
    const container = document.getElementById('Mobiles');
    container.innerHTML = '';

    mobiles.forEach((product) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      slide.innerHTML = `
        <div class="product-sale">
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <div class="prices">
            <span class="new-price">$${product.price}</span>
            ${
              product.old_price
                ? `<span class="old-price">$${product.old_price}</span>`
                : ''
            }
          </div>
          <button class="add-cart">Add To Cart</button>
        </div>
      `;
      container.appendChild(slide);
    });
  } catch (error) {
    console.error('خطأ في تحميل سلايدر الموبايلات:', error);
  }
}

// 🔹 تحميل الإلكترونيات
async function loadElectronicsSwiper() {
  try {
    const response = await fetch('products.json');
    const data = await response.json();

    const electronics = data.filter((p) => p.catetory === 'electronics');
    const container = document.getElementById('electronics');
    container.innerHTML = '';

    electronics.forEach((product) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      slide.innerHTML = `
        <div class="product-sale">
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <div class="prices">
            <span class="new-price">$${product.price}</span>
            ${
              product.old_price
                ? `<span class="old-price">$${product.old_price}</span>`
                : ''
            }
          </div>
          <button class="add-cart">Add To Cart</button>
        </div>
      `;
      container.appendChild(slide);
    });
  } catch (error) {
    console.error('خطأ في تحميل سلايدر الإلكترونيات:', error);
  }
}

// استدعاء كل الدوال
loadHotDealsSwiper();
loadMobilesSwiper();
loadElectronicsSwiper();

// 🔹 فتح/إغلاق الكارت
const cartSection = document.querySelector('.cart-section');
function open_close_cart() {
  cartSection.classList.toggle('active');
}

// 🛒 مصفوفة السلة
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// === حفظ السلة في LocalStorage ===
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// === تحديث عدد المنتجات ===
function updateCartCount() {
  const countEls = document.querySelectorAll('.count_item_cart');
  countEls.forEach((el) => {
    el.textContent = cart.length;
  });
}

// === عرض المنتجات داخل الكارت ===
function displayCartItems() {
  const container = document.querySelector('.items_cart');
  const totalEl = document.querySelector('.total_price');
  if (!container || !totalEl) return;

  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement('div');
    div.classList.add('cart_item');
    div.innerHTML = `
      <img src="${item.img}" alt="${
      item.name
    }" style="width:60px; height:60px; object-fit:contain;">
      <div style="flex:1; margin-left:10px;">
        <h4 style="font-size:16px; margin-bottom:4px;">${item.name}</h4>
        <div>
          <span class="new-price" style="color:#4caf50; font-weight:bold;">$${
            item.price
          }</span>
          ${
            item.oldPrice
              ? `<span class="old-price" style="text-decoration:line-through; color:#999; margin-left:8px;">$${item.oldPrice}</span>`
              : ''
          }
        </div>
      </div>
      <i class="fa-solid fa-trash delete-item" data-index="${index}" style="color:red; cursor:pointer;"></i>
    `;

    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'space-between';
    div.style.borderBottom = '1px solid #eee';
    div.style.padding = '10px 0';

    container.appendChild(div);
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
}

// === عند الضغط على زر Add To Cart ===
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-cart')) {
    const card = e.target.closest('.product-sale');
    if (!card) return;

    const name = card.querySelector('h3').textContent.trim();
    const price = parseFloat(
      card.querySelector('.new-price').textContent.replace('$', '')
    );
    const oldPriceEl = card.querySelector('.old-price');
    const oldPrice = oldPriceEl
      ? parseFloat(oldPriceEl.textContent.replace('$', ''))
      : null;
    const img = card.querySelector('img').src;

    const product = {
      id: Date.now(),
      name,
      price,
      oldPrice,
      img,
    };

    addToCart(product);
  }
});

// === حذف منتج من الكارت ===
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-item')) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    displayCartItems();
  }
});

// === إضافة منتج للسلة ===
function addToCart(product) {
  // تحقق هل المنتج موجود بالفعل في السلة
  const exists = cart.some((item) => item.name === product.name);
  if (exists) {
    alert('هذا المنتج موجود بالفعل في الكارت 🛒');
    return;
  }

  cart.push(product);
  saveCart();
  updateCartCount();
  displayCartItems();
}

// === عند تحميل الصفحة ===
updateCartCount();
displayCartItems();

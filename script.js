// =============================
//  DATA & UTILITIES
// =============================

// Lấy dữ liệu từ books.js (BOOKS được khai báo global trong books.js)
let books = [];
if (typeof BOOKS !== "undefined" && Array.isArray(BOOKS)) {
  books = BOOKS;
  console.log("Đã load BOOKS, tổng số sách:", books.length);
} else {
  console.error(
    "BOOKS chưa được định nghĩa hoặc không phải mảng. Hãy kiểm tra lại books.js và <script src='books.js'></script>."
  );
}

// Cart helpers (dùng localStorage)
const CART_KEY = "BOOKDEAL_CART";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.warn("Lỗi parse cart:", e);
    return [];
  }
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart || []));
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = totalQty;
}

const FILTER_LABELS = {
  all: "Tất cả sách",
  fiction: "Sách Fiction",
  nonfiction: "Sách Nonfiction",
  kids: "Sách Thiếu nhi",
  ya: "Sách Young Adult",
  sale: "Sách đang giảm giá mạnh",
  under50k: "Sách dưới 50.000đ"
};

const SORT_LABELS = {
  default: "Mặc định",
  priceAsc: "Giá tăng dần",
  priceDesc: "Giá giảm dần"
};

function money(v) {
  return v.toLocaleString("vi-VN") + " đ";
}

function getDiscountPercent(book) {
  if (!book.listPrice || book.listPrice <= 0) return 0;
  return Math.round((1 - book.price / book.listPrice) * 100);
}

// =============================
//  STATE
// =============================
const state = {
  category: "all",
  search: "",
  sort: "default"
};

// =============================
//  DOM REFERENCES
// =============================
let bookGridEl;
let filterLabelEl;
let searchInputEl;
let searchBtnEl;
let sortBtnEl;
let backToTopBtn;
let bookSectionEl;
let menuLinksEls;
let cartIconEl;

// =============================
//  FILTERING & SORTING
// =============================
function filterBooks() {
  return books.filter((b) => {
    // Search
    if (state.search) {
      const term = state.search.toLowerCase();
      const text = (b.title + " " + b.author + " " + (b.tags || []).join(" ")).toLowerCase();
      if (!text.includes(term)) return false;
    }

    // Category
    switch (state.category) {
      case "fiction":
        return b.category === "fiction";
      case "nonfiction":
        return b.category === "nonfiction";
      case "kids":
        return b.category === "kids";
      case "ya":
        return b.category === "ya";
      case "sale": {
        const d = getDiscountPercent(b);
        return d >= 40;
      }
      case "under50k":
        return b.price <= 50000;
      case "all":
      default:
        return true;
    }
  });
}

function sortBooks(list) {
  const arr = [...list];

  if (state.sort === "priceAsc") {
    arr.sort((a, b) => a.price - b.price);
  } else if (state.sort === "priceDesc") {
    arr.sort((a, b) => b.price - a.price);
  } else {
    arr.sort((a, b) => a.id - b.id);
  }

  return arr;
}

// =============================
//  RENDER
// =============================
function renderBooks() {
  if (!bookGridEl) return;

  const filtered = filterBooks();
  const data = sortBooks(filtered);

  if (!data.length) {
    bookGridEl.innerHTML =
      '<p class="book-empty">Không tìm thấy sách nào phù hợp với bộ lọc hiện tại.</p>';
    return;
  }

  bookGridEl.innerHTML = "";

  data.forEach((book, idx) => {
    const discount = getDiscountPercent(book);

    const card = document.createElement("article");
    card.className = "book-card";
    card.style.animationDelay = (idx * 0.08).toFixed(2) + "s";

    const link = document.createElement("a");
    link.href = "detail.html?id=" + book.id;
    link.style.textDecoration = "none";
    link.style.color = "inherit";

    link.innerHTML = `
      <div class="book-cover-wrap">
        <img src="${book.image}" alt="${book.title}">
      </div>
      <div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>
      <div class="book-price-row">
        <span class="book-price">${money(book.price)}</span>
        <span class="book-list-price" style="text-decoration:line-through;color:#9ca3af;font-size:11px;margin-left:4px">
          ${money(book.listPrice)}
        </span>
        <span style="color:#4ade80;font-size:11px;margin-left:4px">
          -${discount}%
        </span>
      </div>
    `;

    card.appendChild(link);
    bookGridEl.appendChild(card);
  });
}

function updateFilterLabel() {
  if (!filterLabelEl) return;
  const label = FILTER_LABELS[state.category] || FILTER_LABELS.all;
  const sortLabel = SORT_LABELS[state.sort] || SORT_LABELS.default;
  filterLabelEl.textContent = `Đang hiển thị: ${label} • Sắp xếp: ${sortLabel}`;
}

function updateActiveMenu() {
  if (!menuLinksEls) return;
  menuLinksEls.forEach((btn) => {
    const value = btn.getAttribute("data-filter");
    btn.classList.toggle("active", value === state.category);
  });
}

function updateSortButtonLabel() {
  if (!sortBtnEl) return;
  sortBtnEl.innerHTML = `
    Sắp xếp: ${SORT_LABELS[state.sort]}
    <span class="section-sort-arrow">▼</span>
  `;
}

// =============================
//  EVENT HANDLERS
// =============================
function handleSetCategory(cat) {
  state.category = cat || "all";
  updateActiveMenu();
  updateFilterLabel();
  renderBooks();
  scrollToBookSection();
}

function handleSearch() {
  if (!searchInputEl) return;
  state.search = searchInputEl.value.trim();
  renderBooks();
  updateFilterLabel();
  scrollToBookSection();
}

function handleSortCycle() {
  if (state.sort === "default") {
    state.sort = "priceAsc";
  } else if (state.sort === "priceAsc") {
    state.sort = "priceDesc";
  } else {
    state.sort = "default";
  }
  updateSortButtonLabel();
  updateFilterLabel();
  renderBooks();
}

function scrollToBookSection() {
  if (!bookSectionEl) return;
  bookSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleScroll() {
  if (!backToTopBtn) return;
  const threshold = 260;
  if (window.scrollY > threshold) {
    backToTopBtn.style.opacity = "0.95";
    backToTopBtn.style.pointerEvents = "auto";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";
  }
}

// =============================
//  INIT
// =============================
document.addEventListener("DOMContentLoaded", () => {
  // Lấy DOM
  bookGridEl = document.getElementById("book-grid");
  filterLabelEl = document.getElementById("current-filter-label");
  searchInputEl = document.getElementById("search-input");
  searchBtnEl = document.getElementById("search-btn");
  sortBtnEl = document.querySelector(".section-sort");
  backToTopBtn = document.getElementById("back-to-top");
  bookSectionEl = document.getElementById("book-section");
  menuLinksEls = document.querySelectorAll(".main-menu .menu-link[data-filter]");
  cartIconEl = document.querySelector(".icon-badge-cart");

  // Click filter (menu, hero, promo) – tất cả phần tử có data-filter
  const filterEls = document.querySelectorAll("[data-filter]");
  filterEls.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.tagName.toLowerCase() === "a" || el.tagName.toLowerCase() === "button") {
        e.preventDefault();
      }
      const cat = el.getAttribute("data-filter");
      handleSetCategory(cat);
    });
  });

  // Gắn click cho icon giỏ hàng
  if (cartIconEl) {
    cartIconEl.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "cart.html";
    });
  }

  // Search
  if (searchBtnEl) {
    searchBtnEl.addEventListener("click", (e) => {
      e.preventDefault();
      handleSearch();
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }

  // Sort
  if (sortBtnEl) {
    sortBtnEl.addEventListener("click", (e) => {
      e.preventDefault();
      handleSortCycle();
    });
    updateSortButtonLabel();
  }

  // Back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";
  }

  // Scroll listener
  window.addEventListener("scroll", handleScroll);

  // Render lần đầu
  updateActiveMenu();
  updateFilterLabel();
  renderBooks();
  updateCartCount();
});

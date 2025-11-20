// detail.js – Chi tiết sách + About + Add to cart

const CATEGORY_LABELS = {
  fiction: "Fiction",
  nonfiction: "Nonfiction",
  kids: "Thiếu nhi",
  ya: "Young Adult"
};

const CART_KEY = "BOOKDEAL_CART";

// ===== Helpers =====
function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart || []));
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((s, it) => s + (it.qty || 0), 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = totalQty;
}

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  const idStr = params.get("id");
  if (!idStr) return null;
  const id = parseInt(idStr, 10);
  return Number.isNaN(id) ? null : id;
}

function money(v) {
  return v.toLocaleString("vi-VN") + " đ";
}

function getDiscountPercent(book) {
  if (!book.listPrice || book.listPrice <= 0) return 0;
  return Math.round((1 - book.price / book.listPrice) * 100);
}

// ===== MAIN =====
document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("detail-wrapper");
  const aboutEl = document.getElementById("detail-about");

  if (!Array.isArray(BOOKS)) {
    wrap.innerHTML =
      "<p>Không thể tải dữ liệu sách. Vui lòng kiểm tra lại file <strong>books.js</strong>.</p>";
    return;
  }

  const id = getQueryId();
  if (!id) {
    wrap.innerHTML =
      "<p>Không tìm thấy mã sách hợp lệ. <a href='index.html'>Quay lại trang chủ</a></p>";
    return;
  }

  const book = BOOKS.find((b) => b.id === id);
  if (!book) {
    wrap.innerHTML =
      "<p>Không tìm thấy cuốn sách này. <a href='index.html'>Quay lại trang chủ</a></p>";
    return;
  }

  const discount = getDiscountPercent(book);
  const categoryLabel = CATEGORY_LABELS[book.category] || "Khác";
  const tags = Array.isArray(book.tags) ? book.tags : [];

  // ===== Khối trên: Ảnh + Info =====
  wrap.innerHTML = `
    <div class="detail-image">
      <div class="detail-cover">
        <img src="${book.image}" alt="${book.title}">
      </div>
    </div>

    <div class="detail-info">
      <p class="hero-badge" style="margin-bottom:8px; padding-inline:10px;">
        Chi tiết sách
      </p>

      <h1>${book.title}</h1>
      ${
        book.subtitle
          ? `<p class="detail-subtitle">${book.subtitle}</p>`
          : ""
      }
      <p class="detail-author">Tác giả: ${book.author}</p>

      <div class="detail-price-block">
        <span class="detail-price">${money(book.price)}</span>
        <span class="detail-list-price">${money(book.listPrice)}</span>
        <span class="detail-discount">-${discount}%</span>
      </div>

      <p style="font-size:14px;margin-bottom:4px;">
        <strong>Thể loại:</strong> ${categoryLabel}
      </p>

      ${
        tags.length
          ? `<p style="font-size:14px;margin-bottom:8px;">
              <strong>Tags:</strong>
              ${tags
                .map(
                  (t) =>
                    `<span style="display:inline-block;margin:2px 4px;padding:2px 8px;border-radius:999px;border:1px solid rgba(148,163,184,0.6);font-size:11px;color:#e5e7eb;">${t}</span>`
                )
                .join("")}
            </p>`
          : ""
      }

      <div class="detail-quantity-row">
        <span class="detail-qty-label">Số lượng:</span>
        <div class="detail-qty-control">
          <button class="detail-qty-btn" id="detail-dec-btn">-</button>
          <span class="detail-qty-value" id="detail-qty-value">1</span>
          <button class="detail-qty-btn" id="detail-inc-btn">+</button>
        </div>
      </div>

      <div class="detail-buttons">
        <button class="btn primary" id="add-to-cart-btn">Thêm vào giỏ hàng</button>
        <button class="btn ghost" onclick="window.location.href='index.html'">
          ← Tiếp tục mua sắm
        </button>
      </div>
    </div>
  `;

  // ===== Khối dưới: About full width =====
  const desc =
    book.description ||
    "Chưa có mô tả chi tiết cho cuốn sách này. Nội dung sẽ được cập nhật sau.";

  if (aboutEl) {
    aboutEl.innerHTML = `
      <h2 class="detail-about-title">About</h2>
      <div class="detail-about-body">
        <p>${desc}</p>
      </div>
    `;
  }

  // ===== Sự kiện số lượng + Add to cart =====
  let qty = 1;
  const qtyValueEl = document.getElementById("detail-qty-value");
  const decBtn = document.getElementById("detail-dec-btn");
  const incBtn = document.getElementById("detail-inc-btn");
  const addBtn = document.getElementById("add-to-cart-btn");

  function renderQty() {
    if (qtyValueEl) qtyValueEl.textContent = qty;
  }

  if (decBtn) {
    decBtn.addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      renderQty();
    });
  }
  if (incBtn) {
    incBtn.addEventListener("click", () => {
      qty += 1;
      renderQty();
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cart = getCart();
      const exist = cart.find((it) => it.id === book.id);
      if (exist) {
        exist.qty = (exist.qty || 0) + qty;
      } else {
        cart.push({ id: book.id, qty });
      }
      setCart(cart);
      updateCartCount();
      // chuyển sang giỏ hàng
      window.location.href = "cart.html";
    });
  }

  // Icon giỏ hàng trên header
  const cartIcon = document.querySelector(".icon-badge-cart");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "cart.html";
    });
  }

  updateCartCount();

  // Back to top cho detail
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";

    window.addEventListener("scroll", () => {
      const threshold = 260;
      if (window.scrollY > threshold) {
        backToTopBtn.style.opacity = "0.95";
        backToTopBtn.style.pointerEvents = "auto";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
      }
    });
  }
});

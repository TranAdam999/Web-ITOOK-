// cart.js – Giỏ hàng dạng bảng

const CART_KEY = "BOOKDEAL_CART";

// ===== Helpers =====
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

function money(v) {
  return v.toLocaleString("vi-VN") + " đ";
}

function findBookById(id) {
  if (!Array.isArray(BOOKS)) return null;
  return BOOKS.find((b) => b.id === id) || null;
}

// ===== Render giỏ hàng dạng bảng =====
function renderCart() {
  const container = document.getElementById("cart-content");
  if (!container) return;

  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = `
      <p class="cart-empty">
        Giỏ hàng của bạn đang trống.
        <a href="index.html">Tiếp tục mua sắm</a>
      </p>
    `;
    updateCartCount();
    return;
  }

  const items = cart
    .map((item) => {
      const book = findBookById(item.id);
      if (!book) return null;
      return {
        id: item.id,
        title: book.title,
        author: book.author,
        price: book.price,
        qty: item.qty || 1
      };
    })
    .filter(Boolean);

  if (!items.length) {
    container.innerHTML = `
      <p class="cart-empty">
        Các sách trong giỏ hàng không còn tồn tại.
        <a href="index.html">Tiếp tục mua sắm</a>
      </p>
    `;
    setCart([]);
    updateCartCount();
    return;
  }

  let subtotal = 0;
  let totalQty = 0;

  const rowsHtml = items
    .map((it) => {
      const lineTotal = it.price * it.qty;
      subtotal += lineTotal;
      totalQty += it.qty;

      return `
        <tr class="cart-row" data-id="${it.id}">
          <td class="cart-col-title">
            <div class="cart-item-title">${it.title}</div>
            <div class="cart-item-author">Tác giả: ${it.author}</div>
          </td>
          <td class="cart-col-price">
            ${money(it.price)}
          </td>
          <td class="cart-col-qty">
            <button class="cart-qty-btn cart-item-dec">-</button>
            <span class="cart-qty-value">${it.qty}</span>
            <button class="cart-qty-btn cart-item-inc">+</button>
          </td>
          <td class="cart-col-total">
            ${money(lineTotal)}
          </td>
          <td class="cart-col-remove">
            <button class="cart-item-remove" title="Xóa khỏi giỏ">✕</button>
          </td>
        </tr>
      `;
    })
    .join("");

  container.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th class="cart-col-title">Sản phẩm</th>
          <th class="cart-col-price">Đơn giá</th>
          <th class="cart-col-qty">Số lượng</th>
          <th class="cart-col-total">Thành tiền</th>
          <th class="cart-col-remove"></th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="cart-summary">
      <div class="cart-summary-info">
        <div class="cart-summary-row">
          <span>Tổng số lượng:</span>
          <strong>${totalQty}</strong>
        </div>
        <div class="cart-summary-row">
          <span>Tạm tính:</span>
          <strong>${money(subtotal)}</strong>
        </div>
      </div>
      <div class="cart-summary-actions">
        <button class="btn ghost" id="continue-shopping-btn">
          ← Tiếp tục mua sắm
        </button>
        <button class="btn primary" id="checkout-btn">
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  `;

  attachCartItemEvents();
  attachCartSummaryEvents();
  updateCartCount();
}

// ===== Events từng dòng trong bảng =====
function attachCartItemEvents() {
  const container = document.getElementById("cart-content");
  if (!container) return;

  // tăng
  container.querySelectorAll(".cart-item-inc").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest(".cart-row");
      if (!row) return;
      const id = parseInt(row.getAttribute("data-id"), 10);
      const cart = getCart();
      const item = cart.find((i) => i.id === id);
      if (!item) return;
      item.qty = (item.qty || 0) + 1;
      setCart(cart);
      renderCart();
    });
  });

  // giảm
  container.querySelectorAll(".cart-item-dec").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest(".cart-row");
      if (!row) return;
      const id = parseInt(row.getAttribute("data-id"), 10);
      const cart = getCart();
      const item = cart.find((i) => i.id === id);
      if (!item) return;
      item.qty = (item.qty || 0) - 1;
      if (item.qty <= 0) {
        setCart(cart.filter((i) => i.id !== id));
      } else {
        setCart(cart);
      }
      renderCart();
    });
  });

  // xóa
  container.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest(".cart-row");
      if (!row) return;
      const id = parseInt(row.getAttribute("data-id"), 10);
      const cart = getCart().filter((i) => i.id !== id);
      setCart(cart);
      renderCart();
    });
  });
}

// ===== Events phần tổng =====
function attachCartSummaryEvents() {
  const continueBtn = document.getElementById("continue-shopping-btn");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (continueBtn) {
    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cart = getCart();
      if (!cart.length) {
        alert("Giỏ hàng đang trống.");
        return;
      }
      alert("Giả lập: chuyển sang trang thanh toán ✅");
    });
  }
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".icon-badge-cart");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      // đang ở cart rồi
    });
  }

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

  renderCart();
});

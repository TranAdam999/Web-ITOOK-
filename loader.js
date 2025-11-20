// loader.js – Progress bar khi load trang

document.addEventListener("DOMContentLoaded", () => {
  const loaderEl = document.getElementById("page-loader");
  const progressLine = document.getElementById("loader-progress");
  const percentEl = document.getElementById("loader-percent");

  // Nếu thiếu phần tử thì thôi, khỏi chạy loader
  if (!loaderEl || !progressLine || !percentEl) {
    return;
  }

  let progress = 0;
  let done = false;

  function render() {
    const p = Math.round(progress);
    // dùng CSS variable để fill chiều rộng
    progressLine.style.setProperty("--loader-progress", p + "%");
    percentEl.textContent = p + "%";
  }

  // set trạng thái ban đầu
  render();

  // Fake progress chạy dần tới khoảng 90%
  const fakeTimer = setInterval(() => {
    if (done) return;
    if (progress < 90) {
      progress += 1 + Math.random() * 2; // tăng nhẹ
      if (progress > 90) progress = 90;
      render();
    }
  }, 40);

  // Khi trang load xong thật
  window.addEventListener("load", () => {
    done = true;
    clearInterval(fakeTimer);
    progress = 100;
    render();

    // cho người dùng thấy 100% ~0.4s
    setTimeout(() => {
      loaderEl.classList.add("page-loader-hidden");
      document.body.classList.add("loading-done");
    }, 400);

    // remove khỏi DOM sau đó (optional)
    setTimeout(() => {
      if (loaderEl && loaderEl.parentNode) {
        loaderEl.parentNode.removeChild(loaderEl);
      }
    }, 1600);
  });

  // Trường hợp xấu: load lâu nhưng "load" event không bắn → auto tắt sau 5s
  setTimeout(() => {
    if (done) return;
    done = true;
    clearInterval(fakeTimer);
    progress = 100;
    render();
    loaderEl.classList.add("page-loader-hidden");
    document.body.classList.add("loading-done");
  }, 5000);
});

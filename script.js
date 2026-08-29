// =============================
// CHỈNH CẤU HÌNH Ở ĐÂY
// =============================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw60VdIrOUNALL1UUJKg5GGcwUAV_1Qjvt0tFwdvh-aCszocURISy1q-x1f2S8toVo/exec";

// Thêm / sửa câu hỏi tại đây.
const QUESTIONS = [
  // { id: "q1", text: "Bạn có tham gia được không?", placeholder: "Nhập câu trả lời..." },
  // { id: "q2", text: "Bạn có để lại lời chúc nào không?", placeholder: "Nhập lời chúc..." }
];

function showSection(id) {
  const el = document.getElementById(id);

  if (el) {
    el.classList.remove("hidden");

    setTimeout(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 30);
  }
}

function renderQuestions() {
  const box = document.getElementById("questions");

  if (!box) return;

  box.innerHTML = "";

  QUESTIONS.forEach((q, i) => {
    const wrap = document.createElement("div");

    wrap.className = "question";

    wrap.innerHTML = `
      <label>${i + 1}. ${escapeHtml(q.text)}</label>

      <input
        name="${escapeAttr(q.id)}"
        placeholder="${escapeAttr(q.placeholder || "Nhập câu trả lời...")}"
      >
    `;

    box.appendChild(wrap);
  });
}

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    m => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m])
  );
}

function escapeAttr(s) {
  return escapeHtml(s);
}

function prepareForm(form) {
  if (!SCRIPT_URL) {
    return false;
  }

  form.action = SCRIPT_URL;
  form.method = "POST";

  return true;
}

document.addEventListener("DOMContentLoaded", () => {

  renderQuestions();

  // =============================
  // FORM XÁC NHẬN THAM DỰ
  // =============================
  const rsvp = document.getElementById("rsvpForm");

  if (rsvp) {
    rsvp.addEventListener("submit", (e) => {

      if (!prepareForm(rsvp)) {
        e.preventDefault();

        document.getElementById("rsvpStatus").textContent =
          "Chưa cấu hình Google Apps Script.";

        return;
      }

      document.getElementById("rsvpStatus").textContent =
        "Đã gửi. Cảm ơn bạn đã xác nhận!";
    });
  }

  // =============================
  // FORM LỜI CHÚC
  // =============================
  const wish = document.getElementById("wishForm");

  if (wish) {
    wish.addEventListener("submit", (e) => {

      if (!prepareForm(wish)) {
        e.preventDefault();

        document.getElementById("wishStatus").textContent =
          "Chưa cấu hình Google Apps Script.";

        return;
      }

      document.getElementById("wishStatus").textContent =
        "Đã gửi lời chúc. Xin cảm ơn!";
    });
  }

});

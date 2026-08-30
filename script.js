```javascript
// =============================
// GOOGLE FORM
// =============================

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfT6gi-E1huEczB7JhNbfjz4yiuipkzO7otzDen4qcr_m8DSQ/formResponse";

// Mã các câu hỏi trong Google Form
const ENTRY_NAME = "entry.2082199092";
const ENTRY_ATTENDANCE = "entry.2081772106";
const ENTRY_WISH = "entry.1647574086";


// =============================
// TRẠNG THÁI RSVP
// =============================

let rsvpConfirmed = false;


// =============================
// HIỂN THỊ SECTION
// =============================

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


// =============================
// CÂU HỎI PHỤ
// =============================

const QUESTIONS = [];

function renderQuestions() {

  const box =
    document.getElementById("questions");

  if (!box) return;

  box.innerHTML = "";

  QUESTIONS.forEach((q, i) => {

    const wrap =
      document.createElement("div");

    wrap.className = "question";

    wrap.innerHTML = `
      <label>
        ${escapeHtml(q.text)}
      </label>

      <input
        name="${escapeAttr(q.id)}"
        placeholder="${escapeAttr(
          q.placeholder || "Nhập câu trả lời..."
        )}"
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


// =============================
// HIỆN NÚT GỬI LỜI CHÚC
// =============================

function showWishButton() {

  const button =
    document.getElementById("wishButton");

  if (!button) return;

  button.classList.remove("hidden");

}


// =============================
// GỬI RSVP
// =============================

function setupRSVP() {

  const rsvp =
    document.getElementById("rsvpForm");

  if (!rsvp) return;


  rsvp.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();


      const nameInput =
        rsvp.querySelector(
          'input[name="name"]'
        );

      const attendanceInput =
        rsvp.querySelector(
          '[name="attendance"]'
        );

      const status =
        document.getElementById(
          "rsvpStatus"
        );


      // =========================
      // KIỂM TRA
      // =========================

      if (!nameInput ||
          !attendanceInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy thông tin biểu mẫu.";

        }

        return;

      }


      if (!nameInput.value.trim()) {

        nameInput.focus();

        return;

      }


      if (!attendanceInput.value) {

        attendanceInput.focus();

        return;

      }


      // =========================
      // ĐỔI FIELD GOOGLE FORM
      // =========================

      nameInput.name =
        ENTRY_NAME;

      attendanceInput.name =
        ENTRY_ATTENDANCE;


      // =========================
      // GỬI GOOGLE FORM
      // =========================

      rsvp.action =
        FORM_URL;

      rsvp.method =
        "POST";

      rsvp.target =
        "submitFrame";


      rsvp.submit();


      // =========================
      // ĐÁNH DẤU ĐÃ XÁC NHẬN
      // =========================

      rsvpConfirmed = true;


      // =========================
      // HIỆN THÔNG BÁO
      // =========================

      if (status) {

        status.textContent =
          "Đã gửi. Cảm ơn bạn đã xác nhận!";

      }


      // =========================
      // HIỆN NÚT GỬI LỜI CHÚC
      // =========================

      // Không quan trọng Có hay Không
      // Cả hai đều được gửi lời chúc

      showWishButton();


      // =========================
      // ĐỔI NÚT XÁC NHẬN
      // =========================

      const submitButton =
        rsvp.querySelector(
          'button[type="submit"]'
        );

      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.textContent =
          "✓ ĐÃ XÁC NHẬN";

      }


      // =========================
      // KHÔI PHỤC FIELD
      // =========================

      setTimeout(() => {

        nameInput.name =
          "name";

        attendanceInput.name =
          "attendance";

      }, 500);

    }
  );

}


// =============================
// GỬI LỜI CHÚC
// =============================

function setupWish() {

  const wish =
    document.getElementById(
      "wishForm"
    );

  if (!wish) return;


  wish.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();


      // =========================
      // KIỂM TRA RSVP
      // =========================

      if (!rsvpConfirmed) {

        return;

      }


      const nameInput =
        wish.querySelector(
          'input[name="name"]'
        );

      const wishInput =
        wish.querySelector(
          'textarea[name="wish"]'
        );

      const status =
        document.getElementById(
          "wishStatus"
        );

      const thanks =
        document.getElementById(
          "wishThanks"
        );


      // =========================
      // KIỂM TRA
      // =========================

      if (!nameInput ||
          !wishInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy thông tin biểu mẫu.";

        }

        return;

      }


      if (!nameInput.value.trim()) {

        nameInput.focus();

        return;

      }


      if (!wishInput.value.trim()) {

        wishInput.focus();

        return;

      }


      // =========================
      // ĐỔI FIELD
      // =========================

      nameInput.name =
        ENTRY_NAME;

      wishInput.name =
        ENTRY_WISH;


      // =========================
      // GỬI GOOGLE FORM
      // =========================

      wish.action =
        FORM_URL;

      wish.method =
        "POST";

      wish.target =
        "wishFrame";


      wish.submit();


      // =========================
      // THÔNG BÁO
      // =========================

      if (status) {

        status.textContent =
          "Đã gửi lời chúc. Xin cảm ơn!";

      }


      // =========================
      // HIỆN CẢM ƠN
      // =========================

      if (thanks) {

        thanks.classList.remove(
          "hidden"
        );

        thanks.style.display =
          "block";


        setTimeout(() => {

          thanks.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 300);

      }


      // =========================
      // ĐỔI NÚT
      // =========================

      const submitButton =
        wish.querySelector(
          'button[type="submit"]'
        );

      if (submitButton) {

        submitButton.disabled =
          true;

        submitButton.textContent =
          "✓ ĐÃ GỬI LỜI CHÚC";

      }


      // =========================
      // KHÔI PHỤC FIELD
      // =========================

      setTimeout(() => {

        nameInput.name =
          "name";

        wishInput.name =
          "wish";

      }, 500);

    }
  );

}


// =============================
// KHỞI ĐỘNG
// =============================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderQuestions();

    setupRSVP();

    setupWish();

  }
);
```

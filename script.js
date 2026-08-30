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
// TRẠNG THÁI
// =============================

// Chưa xác nhận RSVP
let rsvpConfirmed = false;


// =============================
// HIỂN THỊ SECTION
// =============================

function showSection(id) {

  const el = document.getElementById(id);

  if (!el) return;


  // Không cho mở phần lời chúc
  // nếu chưa xác nhận RSVP

  if (id === "wish" && !rsvpConfirmed) {

    const rsvp =
      document.getElementById("rsvp");

    const status =
      document.getElementById("rsvpStatus");


    if (status) {

      status.textContent =
        "Vui lòng xác nhận tham dự trước khi gửi lời chúc.";

    }


    if (rsvp) {

      rsvp.classList.remove("hidden");

      setTimeout(() => {

        rsvp.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 30);

    }

    return;
  }


  // Hiển thị section

  el.classList.remove("hidden");


  setTimeout(() => {

    el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 30);

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
        ${i + 1}. ${escapeHtml(q.text)}
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


// =============================
// ESCAPE HTML
// =============================

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

  const wishButton =
    document.getElementById("wishButton");

  if (!wishButton) return;


  rsvpConfirmed = true;


  wishButton.classList.remove("hidden");

  wishButton.style.display = "block";

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
      // LƯU TÊN FIELD GỐC
      // =========================

      const originalName =
        nameInput.name;

      const originalAttendance =
        attendanceInput.name;


      // =========================
      // ĐỔI FIELD GOOGLE FORM
      // =========================

      nameInput.name =
        ENTRY_NAME;

      attendanceInput.name =
        ENTRY_ATTENDANCE;


      // =========================
      // CẤU HÌNH FORM
      // =========================

      rsvp.action =
        FORM_URL;

      rsvp.method =
        "POST";

      rsvp.target =
        "submitFrame";


      // =========================
      // GỬI
      // =========================

      rsvp.submit();


      // =========================
      // ĐÃ XÁC NHẬN
      // =========================

      rsvpConfirmed = true;


      if (status) {

        status.textContent =
          "Đã gửi. Cảm ơn bạn đã xác nhận!";

      }


      // Hiện nút gửi lời chúc

      showWishButton();


      // =========================
      // ĐỔI NÚT
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
          originalName;

        attendanceInput.name =
          originalAttendance;

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


      // Chưa RSVP
      if (!rsvpConfirmed) {

        const status =
          document.getElementById(
            "wishStatus"
          );

        if (status) {

          status.textContent =
            "Vui lòng xác nhận tham dự trước.";

        }

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
      // LƯU FIELD GỐC
      // =========================

      const originalName =
        nameInput.name;

      const originalWish =
        wishInput.name;


      // =========================
      // ĐỔI TÊN GOOGLE FORM
      // =========================

      nameInput.name =
        ENTRY_NAME;

      wishInput.name =
        ENTRY_WISH;


      // =========================
      // GỬI
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
      // KHÔI PHỤC
      // =========================

      setTimeout(() => {

        nameInput.name =
          originalName;

        wishInput.name =
          originalWish;

      }, 500);

    }
  );

}


// =============================
// KHỞI ĐỘNG
// =============================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderQuestions();

    setupRSVP();

    setupWish();

  }
);
```

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


      if (!nameInput ||
          !attendanceInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy thông tin biểu mẫu.";

        }

        return;
      }


      // Kiểm tra họ tên

      if (!nameInput.value.trim()) {

        nameInput.focus();

        return;
      }


      // Kiểm tra tham dự

      if (!attendanceInput.value) {

        attendanceInput.focus();

        return;
      }


      // Đổi tên field

      nameInput.name =
        ENTRY_NAME;

      attendanceInput.name =
        ENTRY_ATTENDANCE;


      // Gửi Google Form

      rsvp.action =
        FORM_URL;

      rsvp.method =
        "POST";

      rsvp.target =
        "submitFrame";


      rsvp.submit();


      // Thông báo

      if (status) {

        status.textContent =
          "Đã gửi. Cảm ơn bạn đã xác nhận!";

      }


      // Khôi phục

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


      // Kiểm tra họ tên

      if (!nameInput.value.trim()) {

        nameInput.focus();

        return;
      }


      // Kiểm tra lời chúc

      if (!wishInput.value.trim()) {

        wishInput.focus();

        return;
      }


      // =========================
      // ĐỔI TÊN FIELD
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
      // HIỆN PHẦN CẢM ƠN
      // =========================

      if (thanks) {

        // Xóa trạng thái ẩn
        thanks.classList.remove(
          "hidden"
        );


        // Đảm bảo hiển thị
        thanks.style.display =
          "block";


        // Cuộn tới phần cảm ơn
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
  () => {

    renderQuestions();

    setupRSVP();

    setupWish();

  }
);

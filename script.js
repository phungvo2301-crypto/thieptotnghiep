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

// Ban đầu chưa xác nhận
let rsvpConfirmed = false;


// =============================
// HIỂN THỊ SECTION
// =============================

function showSection(id) {

  const el = document.getElementById(id);

  if (!el) return;


  // =====================================
  // BẢO VỆ PHẦN GỬI LỜI CHÚC
  // =====================================

  // Nếu chưa xác nhận RSVP
  // thì không cho mở phần lời chúc

  if (id === "wish" && !rsvpConfirmed) {

    const status =
      document.getElementById("rsvpStatus");

    if (status) {

      status.textContent =
        "Vui lòng xác nhận tham dự trước khi gửi lời chúc.";

    }

    // Hiện phần RSVP để người dùng xác nhận
    const rsvp =
      document.getElementById("rsvp");

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


  // =====================================
  // HIỂN THỊ SECTION BÌNH THƯỜNG
  // =====================================

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
// BẢO VỆ HTML
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


  // Đánh dấu đã xác nhận RSVP
  rsvpConfirmed = true;


  // Hiện nút
  wishButton.classList.remove("hidden");


  // Đảm bảo display không bị CSS khác ghi đè
  wishButton.style.display = "block";


  // Cuộn nhẹ tới nút
  setTimeout(() => {

    wishButton.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 300);

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


      // =========================
      // LẤY INPUT
      // =========================

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
      // KIỂM TRA INPUT
      // =========================

      if (!nameInput ||
          !attendanceInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy thông tin biểu mẫu.";

        }

        return;
      }


      // =========================
      // KIỂM TRA HỌ TÊN
      // =========================

      if (!nameInput.value.trim()) {

        nameInput.focus();

        return;
      }


      // =========================
      // KIỂM TRA THAM DỰ
      // =========================

      if (!attendanceInput.value) {

        attendanceInput.focus();

        return;
      }


      // =========================
      // LƯU TẠM TÊN FIELD
      // =========================

      const originalName =
        nameInput.name;

      const originalAttendance =
        attendanceInput.name;


      // =========================
      // ĐỔI TÊN FIELD
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


      // Submit
      rsvp.submit();


      // =========================
      // THÔNG BÁO
      // =========================

      if (status) {

        status.textContent =
          "Đã gửi. Cảm ơn bạn đã xác nhận!";

      }


      // =========================
      // HIỆN NÚT GỬI LỜI CHÚC
      // =========================

      // Không phân biệt Có / Không
      // Cả hai lựa chọn đều được gửi lời chúc

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


      // =========================
      // KIỂM TRA RSVP
      // =========================

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


      // =========================
      // LẤY INPUT
      // =========================

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
      // KIỂM TRA INPUT
      // =========================

      if (!nameInput ||
          !wishInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy thông tin biểu mẫu.";

        }

        return;
      }


      // =========================
      // KIỂM TRA HỌ TÊN
      // =========================

      if (!nameInput.value.trim()) {

        nameInput.focus();

        return;
      }


      // =========================
      // KIỂM TRA LỜI CHÚC
      // =========================

      if (!wishInput.value.trim()) {

        wishInput.focus();

        return;
      }


      // =========================
      // LƯU TÊN FIELD GỐC
      // =========================

      const originalName =
        nameInput.name;

      const originalWish =
        wishInput.name;


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

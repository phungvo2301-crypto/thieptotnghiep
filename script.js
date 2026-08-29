```js
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
// GỬI RSVP VÀO GOOGLE FORM
// =============================

```js
function setupRSVP() {

  const rsvp = document.getElementById("rsvpForm");

  if (!rsvp) return;

  rsvp.addEventListener("submit", function(e) {

    e.preventDefault();

    const nameInput =
      rsvp.querySelector('input[name="name"]');

    const attendanceInput =
      rsvp.querySelector('select[name="attendance"]');

    const status =
      document.getElementById("rsvpStatus");


    // =============================
    // KIỂM TRA
    // =============================

    if (!nameInput || !attendanceInput) {

      if (status) {
        status.textContent =
          "Không tìm thấy thông tin biểu mẫu.";
      }

      return;
    }


    if (!nameInput.value.trim()) {

      nameInput.focus();

      if (status) {
        status.textContent =
          "Vui lòng nhập họ và tên.";
      }

      return;
    }


    if (!attendanceInput.value) {

      attendanceInput.focus();

      if (status) {
        status.textContent =
          "Vui lòng chọn bạn có tham dự hay không.";
      }

      return;
    }


    // =============================
    // TẠO FORM GỬI GOOGLE FORM
    // =============================

    const googleForm =
      document.createElement("form");

    googleForm.method = "POST";

    googleForm.action = FORM_URL;

    googleForm.target = "submitFrame";

    googleForm.style.display = "none";


    // =============================
    // HỌ TÊN
    // =============================

    const nameField =
      document.createElement("input");

    nameField.type = "hidden";

    nameField.name = ENTRY_NAME;

    nameField.value =
      nameInput.value.trim();

    googleForm.appendChild(nameField);


    // =============================
    // THAM DỰ
    // =============================

    const attendanceField =
      document.createElement("input");

    attendanceField.type = "hidden";

    attendanceField.name =
      ENTRY_ATTENDANCE;

    attendanceField.value =
      attendanceInput.value;

    googleForm.appendChild(attendanceField);


    // =============================
    // GỬI
    // =============================

    document.body.appendChild(googleForm);

    googleForm.submit();


    // =============================
    // THÔNG BÁO
    // =============================

    if (status) {

      status.textContent =
        "Đã gửi. Cảm ơn bạn đã xác nhận!";

    }


    // =============================
    // XÓA FORM TẠM
    // =============================

    setTimeout(() => {

      googleForm.remove();

    }, 1000);

  });
}
```



// =============================
// GỬI LỜI CHÚC VÀO GOOGLE FORM
// =============================

function setupWish() {

  const wish =
    document.getElementById("wishForm");

  if (!wish) return;


  wish.addEventListener("submit", function(e) {

    e.preventDefault();


    const nameInput =
      wish.querySelector('input[name="name"]');

    const wishInput =
      wish.querySelector('textarea[name="wish"]');

    const status =
      document.getElementById("wishStatus");


    if (!nameInput || !wishInput) {

      if (status) {

        status.textContent =
          "Không tìm thấy thông tin biểu mẫu.";

      }

      return;
    }


    // =============================
    // KIỂM TRA
    // =============================

    if (!nameInput.value.trim()) {

      nameInput.focus();

      return;
    }


    if (!wishInput.value.trim()) {

      wishInput.focus();

      return;
    }


    // =============================
    // ĐỔI SANG MÃ GOOGLE FORM
    // =============================

    nameInput.name =
      ENTRY_NAME;

    wishInput.name =
      ENTRY_WISH;


    // =============================
    // GỬI GOOGLE FORM
    // =============================

    wish.action =
      FORM_URL;

    wish.method =
      "POST";

    wish.target =
      "wishFrame";


    wish.submit();


    // =============================
    // THÔNG BÁO
    // =============================

    if (status) {

      status.textContent =
        "Đã gửi lời chúc. Xin cảm ơn!";

    }


    // =============================
    // KHÔI PHỤC
    // =============================

    setTimeout(() => {

      nameInput.name =
        "name";

      wishInput.name =
        "wish";

    }, 500);

  });
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

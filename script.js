```javascript
// =====================================
// GOOGLE FORM
// =====================================

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfT6gi-E1huEczB7JhNbfjz4yiuipkzO7otzDen4qcr_m8DSQ/formResponse";


const ENTRY_NAME =
  "entry.2082199092";

const ENTRY_ATTENDANCE =
  "entry.2081772106";

const ENTRY_WISH =
  "entry.1647574086";


// =====================================
// TRẠNG THÁI
// =====================================

// Chỉ trở thành true sau khi người dùng
// bấm XÁC NHẬN THAM DỰ.

let rsvpConfirmed = false;


// =====================================
// CÂU HỎI PHỤ
// =====================================

const QUESTIONS = [];


// =====================================
// HIỂN THỊ CÂU HỎI PHỤ
// =====================================

function renderQuestions() {

  const box =
    document.getElementById("questions");

  if (!box) return;

  box.innerHTML = "";


  QUESTIONS.forEach(function(q, i) {

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
          q.placeholder ||
          "Nhập câu trả lời..."
        )}"
      >
    `;


    box.appendChild(wrap);

  });

}


// =====================================
// ESCAPE
// =====================================

function escapeHtml(s) {

  return String(s).replace(
    /[&<>"']/g,
    function(m) {

      return {

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      }[m];

    }
  );

}


function escapeAttr(s) {

  return escapeHtml(s);

}


// =====================================
// HIỆN NÚT GỬI LỜI CHÚC
// =====================================

function enableWishButton() {

  const button =
    document.getElementById(
      "wishButton"
    );

  if (!button) return;


  button.classList.remove(
    "hidden"
  );

}


// =====================================
// RSVP
// =====================================

function setupRSVP() {

  const form =
    document.getElementById(
      "rsvpForm"
    );

  if (!form) return;


  form.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();


      const nameInput =
        form.querySelector(
          'input[name="name"]'
        );


      const attendanceInput =
        form.querySelector(
          'select[name="attendance"]'
        );


      const status =
        document.getElementById(
          "rsvpStatus"
        );


      // =================================
      // KIỂM TRA
      // =================================

      if (!nameInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy ô họ và tên.";

        }

        return;

      }


      if (!attendanceInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy lựa chọn tham dự.";

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


      // =================================
      // LƯU TÊN FIELD
      // =================================

      const oldName =
        nameInput.name;

      const oldAttendance =
        attendanceInput.name;


      // =================================
      // ĐỔI SANG ENTRY GOOGLE FORM
      // =================================

      nameInput.name =
        ENTRY_NAME;

      attendanceInput.name =
        ENTRY_ATTENDANCE;


      // =================================
      // GỬI GOOGLE FORM
      // =================================

      form.action =
        FORM_URL;

      form.method =
        "POST";

      form.target =
        "submitFrame";


      form.submit();


      // =================================
      // ĐÁNH DẤU ĐÃ XÁC NHẬN
      // =================================

      rsvpConfirmed = true;


      // =================================
      // HIỆN THÔNG BÁO
      // =================================

      if (status) {

        status.textContent =
          "Đã gửi xác nhận. Cảm ơn bạn!";

      }


      // =================================
      // HIỆN NÚT LỜI CHÚC
      // =================================

      enableWishButton();


      // =================================
      // KHÓA NÚT RSVP
      // =================================

      const button =
        form.querySelector(
          'button[type="submit"]'
        );


      if (button) {

        button.disabled =
          true;

        button.textContent =
          "✓ ĐÃ XÁC NHẬN";

      }


      // =================================
      // KHÔI PHỤC NAME
      // =================================

      setTimeout(function() {

        nameInput.name =
          oldName;

        attendanceInput.name =
          oldAttendance;

      }, 500);

    }
  );

}


// =====================================
// GỬI LỜI CHÚC
// =====================================

function setupWish() {

  const form =
    document.getElementById(
      "wishForm"
    );

  if (!form) return;


  form.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();


      // =================================
      // BẮT BUỘC ĐÃ RSVP
      // =================================

      if (!rsvpConfirmed) {

        return;

      }


      const nameInput =
        form.querySelector(
          'input[name="name"]'
        );


      const wishInput =
        form.querySelector(
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


      // =================================
      // KIỂM TRA
      // =================================

      if (!nameInput ||
          !wishInput) {

        if (status) {

          status.textContent =
            "Không tìm thấy biểu mẫu.";

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


      // =================================
      // LƯU NAME
      // =================================

      const oldName =
        nameInput.name;

      const oldWish =
        wishInput.name;


      // =================================
      // ĐỔI ENTRY
      // =================================

      nameInput.name =
        ENTRY_NAME;

      wishInput.name =
        ENTRY_WISH;


      // =================================
      // GỬI GOOGLE FORM
      // =================================

      form.action =
        FORM_URL;

      form.method =
        "POST";

      form.target =
        "wishFrame";


      form.submit();


      // =================================
      // THÔNG BÁO
      // =================================

      if (status) {

        status.textContent =
          "Đã gửi lời chúc. Xin cảm ơn!";

      }


      // =================================
      // HIỆN PHẦN CẢM ƠN
      // =================================

      if (thanks) {

        thanks.classList.remove(
          "hidden"
        );


        setTimeout(function() {

          thanks.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 300);

      }


      // =================================
      // KHÓA NÚT
      // =================================

      const button =
        form.querySelector(
          'button[type="submit"]'
        );


      if (button) {

        button.disabled =
          true;

        button.textContent =
          "✓ ĐÃ GỬI LỜI CHÚC";

      }


      // =================================
      // KHÔI PHỤC NAME
      // =================================

      setTimeout(function() {

        nameInput.name =
          oldName;

        wishInput.name =
          oldWish;

      }, 500);

    }
  );

}


// =====================================
// KHỞI ĐỘNG
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderQuestions();

    setupRSVP();

    setupWish();

  }
);
// =========================================
// MỞ THIỆP
// =========================================

function openInvitation() {

  // Hiện thông tin cá nhân
  showSection("profile");

  // Sau đó hiện thông tin buổi tiệc
  setTimeout(() => {

    showSection("details");

  }, 500);

}

/* =========================================
   GOOGLE FORM
========================================= */

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfT6gi-E1huEczB7JhNbfjz4yiuipkzO7otzDen4qcr_m8DSQ/formResponse";


/* Google Form Entry */

const ENTRY_NAME =
  "entry.2082199092";

const ENTRY_ATTENDANCE =
  "entry.2081772106";

const ENTRY_WISH =
  "entry.1647574086";


/* =========================================
   TRẠNG THÁI
========================================= */

let rsvpConfirmed = false;


/* =========================================
   CÂU HỎI PHỤ
   Sau này muốn thêm câu hỏi thì thêm ở đây
========================================= */

const QUESTIONS = [

  /*
  Ví dụ:

  {
    id: "entry.123456789",
    text: "Bạn đi cùng ai?",
    placeholder: "Nhập tên..."
  }

  */

];


/* =========================================
   HIỂN THỊ CÂU HỎI PHỤ
========================================= */

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


/* =========================================
   ESCAPE
========================================= */

function escapeHtml(value) {

  return String(value).replace(
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


function escapeAttr(value) {

  return escapeHtml(value);

}


/* =========================================
   HIỆN NÚT LỜI CHÚC
========================================= */

function enableWishButton() {

  const button =
    document.getElementById("wishButton");

  if (!button) return;

  button.classList.remove("hidden");

}


/* =========================================
   MỞ THIỆP
========================================= */

function openInvitation() {

  const content =
    document.getElementById(
      "invitationContent"
    );

  if (!content) return;

  content.classList.remove("hidden");


  /* Hiện thông tin cá nhân */

  setTimeout(function() {

    const profile =
      document.getElementById("profile");

    if (profile) {

      profile.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }, 100);


  /* Sau đó hiện phần thông tin buổi lễ */

  setTimeout(function() {

    const details =
      document.getElementById("details");

    if (details) {

      details.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }, 1200);

}


/* =========================================
   RSVP
========================================= */

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


      /* ================================
         KIỂM TRA
      ================================= */

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


      /* ================================
         LƯU NAME CŨ
      ================================= */

      const oldName =
        nameInput.name;

      const oldAttendance =
        attendanceInput.name;


      /* ================================
         ĐỔI SANG ENTRY GOOGLE FORM
      ================================= */

      nameInput.name =
        ENTRY_NAME;

      attendanceInput.name =
        ENTRY_ATTENDANCE;


      /* ================================
         GỬI GOOGLE FORM
      ================================= */

      form.action =
        FORM_URL;

      form.method =
        "POST";

      form.target =
        "submitFrame";


      form.submit();


      /* ================================
         ĐÁNH DẤU ĐÃ RSVP
      ================================= */

      rsvpConfirmed = true;


      /* ================================
         THÔNG BÁO
      ================================= */

      if (status) {

        status.textContent =
          "Đã gửi xác nhận. Cảm ơn bạn!";

      }


      /* ================================
         HIỆN NÚT LỜI CHÚC
      ================================= */

      enableWishButton();


      /* ================================
         KHÓA NÚT
      ================================= */

      const button =
        form.querySelector(
          'button[type="submit"]'
        );


      if (button) {

        button.disabled = true;

        button.textContent =
          "✓ ĐÃ XÁC NHẬN";

      }


      /* ================================
         KHÔI PHỤC NAME
      ================================= */

      setTimeout(function() {

        nameInput.name =
          oldName;

        attendanceInput.name =
          oldAttendance;

      }, 500);

    }
  );

}


/* =========================================
   GỬI LỜI CHÚC
========================================= */

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


      /* ================================
         BẮT BUỘC ĐÃ RSVP
      ================================= */

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


      /* ================================
         KIỂM TRA
      ================================= */

      if (!nameInput || !wishInput) {

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


      /* ================================
         LƯU NAME
      ================================= */

      const oldName =
        nameInput.name;

      const oldWish =
        wishInput.name;


      /* ================================
         ĐỔI ENTRY
      ================================= */

      nameInput.name =
        ENTRY_NAME;

      wishInput.name =
        ENTRY_WISH;


      /* ================================
         GỬI GOOGLE FORM
      ================================= */

      form.action =
        FORM_URL;

      form.method =
        "POST";

      form.target =
        "wishFrame";


      form.submit();


      /* ================================
         THÔNG BÁO
      ================================= */

      if (status) {

        status.textContent =
          "Đã gửi lời chúc. Xin cảm ơn!";

      }


      /* ================================
         HIỆN CẢM ƠN
      ================================= */

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


      /* ================================
         KHÓA NÚT
      ================================= */

      const button =
        form.querySelector(
          'button[type="submit"]'
        );


      if (button) {

        button.disabled = true;

        button.textContent =
          "✓ ĐÃ GỬI LỜI CHÚC";

      }


      /* ================================
         KHÔI PHỤC NAME
      ================================= */

      setTimeout(function() {

        nameInput.name =
          oldName;

        wishInput.name =
          oldWish;

      }, 500);

    }
  );

}


/* =========================================
   COUNTDOWN
========================================= */

/*
   ĐỔI NGÀY GIỜ TẠI ĐÂY

   Năm - Tháng - Ngày
   Giờ : Phút : Giây

   Ví dụ:
   20/09/2026 08:00
*/

const graduationDate =
  new Date(
    "2026-09-20T08:00:00+07:00"
  );


function updateCountdown() {

  const now =
    new Date();

  const distance =
    graduationDate.getTime()
    - now.getTime();


  const days =
    document.getElementById("days");

  const hours =
    document.getElementById("hours");

  const minutes =
    document.getElementById("minutes");

  const seconds =
    document.getElementById("seconds");


  if (
    !days ||
    !hours ||
    !minutes ||
    !seconds
  ) {

    return;

  }


  /* =====================================
     ĐÃ ĐẾN NGÀY
  ====================================== */

  if (distance <= 0) {

    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";

    const countdown =
      document.getElementById(
        "countdown"
      );

    if (countdown) {

      countdown.innerHTML = `
        <div class="countdown-finished">
          🎓 HÔM NAY LÀ NGÀY ĐẶC BIỆT!
        </div>
      `;

    }

    return;

  }


  /* =====================================
     TÍNH THỜI GIAN
  ====================================== */

  const d =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const h =
    Math.floor(
      (distance /
        (1000 * 60 * 60)) %
      24
    );


  const m =
    Math.floor(
      (distance /
        (1000 * 60)) %
      60
    );


  const s =
    Math.floor(
      (distance / 1000) %
      60
    );


  days.textContent =
    String(d).padStart(2, "0");

  hours.textContent =
    String(h).padStart(2, "0");

  minutes.textContent =
    String(m).padStart(2, "0");

  seconds.textContent =
    String(s).padStart(2, "0");

}


/* =========================================
   KHỞI ĐỘNG
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderQuestions();

    setupRSVP();

    setupWish();

    updateCountdown();

    setInterval(
      updateCountdown,
      1000
    );

  }
);

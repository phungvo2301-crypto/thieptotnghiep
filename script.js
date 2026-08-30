/* =====================================
   HIỂN THỊ SECTION
===================================== */

function showSection(id) {

  const section =
    document.getElementById(id);

  if (!section) return;

  section.classList.remove("hidden");

  setTimeout(() => {

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 50);
}


/* =====================================
   BIẾN
===================================== */

let rsvpConfirmed = false;


/* =====================================
   GOOGLE FORM
===================================== */

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfT6gi-E1huEczB7JhNbfjz4yiuipkzO7otzDen4qcr_m8DSQ/formResponse";


const ENTRY_NAME =
  "entry.2082199092";


const ENTRY_ATTENDANCE =
  "entry.2081772106";


const ENTRY_WISH =
  "entry.1647574086";


/* =====================================
   GỬI GOOGLE FORM
===================================== */

function sendToGoogleForm(target, fields) {

  const form =
    document.createElement("form");

  form.method = "POST";

  form.action = FORM_URL;

  form.target = target;

  form.style.display = "none";


  fields.forEach(field => {

    const input =
      document.createElement("input");

    input.type = "hidden";

    input.name = field.name;

    input.value = field.value;

    form.appendChild(input);

  });


  document.body.appendChild(form);

  form.submit();


  setTimeout(() => {

    form.remove();

  }, 1000);
}


/* =====================================
   FORM
===================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* =================================
       RSVP
    ================================= */

    const rsvpForm =
      document.getElementById(
        "rsvpForm"
      );


    if (rsvpForm) {

      rsvpForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();


          const nameInput =
            document.getElementById(
              "rsvpName"
            );


          const attendanceInput =
            document.getElementById(
              "attendance"
            );


          const status =
            document.getElementById(
              "rsvpStatus"
            );


          const wishButton =
            document.getElementById(
              "wishButton"
            );


          const submitButton =
            document.getElementById(
              "rsvpSubmit"
            );


          if (
            !nameInput.value.trim()
          ) {

            nameInput.focus();

            return;
          }


          if (
            !attendanceInput.value
          ) {

            attendanceInput.focus();

            return;
          }


          const name =
            nameInput.value.trim();


          const attendance =
            attendanceInput.value;


          sendToGoogleForm(
            "submitFrame",
            [
              {
                name: ENTRY_NAME,
                value: name
              },

              {
                name: ENTRY_ATTENDANCE,
                value: attendance
              }
            ]
          );


          rsvpConfirmed = true;


          status.textContent =
            "✓ Đã xác nhận tham dự. Cảm ơn bạn!";


          wishButton.classList.remove(
            "hidden"
          );


          submitButton.disabled =
            true;


          submitButton.textContent =
            "✓ ĐÃ XÁC NHẬN";

        }
      );

    }


    /* =================================
       LỜI CHÚC
    ================================= */

    const wishForm =
      document.getElementById(
        "wishForm"
      );


    if (wishForm) {

      wishForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();


          if (!rsvpConfirmed) return;


          const nameInput =
            document.getElementById(
              "wishName"
            );


          const wishInput =
            document.getElementById(
              "wishText"
            );


          const status =
            document.getElementById(
              "wishStatus"
            );


          const thanks =
            document.getElementById(
              "wishThanks"
            );


          const submitButton =
            document.getElementById(
              "wishSubmit"
            );


          if (
            !nameInput.value.trim()
          ) {

            nameInput.focus();

            return;
          }


          if (
            !wishInput.value.trim()
          ) {

            wishInput.focus();

            return;
          }


          const name =
            nameInput.value.trim();


          const wish =
            wishInput.value.trim();


          sendToGoogleForm(
            "wishFrame",
            [
              {
                name: ENTRY_NAME,
                value: name
              },

              {
                name: ENTRY_WISH,
                value: wish
              }
            ]
          );


          status.textContent =
            "✓ Đã gửi lời chúc. Xin cảm ơn!";


          submitButton.disabled =
            true;


          submitButton.textContent =
            "✓ ĐÃ GỬI LỜI CHÚC";


          thanks.classList.remove(
            "hidden"
          );


          setTimeout(() => {

            thanks.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }, 300);

        }
      );

    }

  }
);


/* =====================================
   BỘ ĐẾM NGƯỢC
===================================== */

const graduationDate =
  new Date(
    "2026-09-09T08:30:00+07:00"
  ).getTime();


function updateCountdown() {

  const now =
    new Date().getTime();


  const distance =
    graduationDate - now;


  const countdown =
    document.getElementById(
      "countdown"
    );


  if (!countdown) return;


  /* ĐÃ ĐẾN NGÀY */

  if (distance <= 0) {

    countdown.innerHTML = `
      <div
        class="countdown-finished"
        style="grid-column:1/-1"
      >
        🎓 HÔM NAY LÀ NGÀY TỐT NGHIỆP!
      </div>
    `;

    return;
  }


  /* TÍNH NGÀY */

  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  /* TÍNH GIỜ */

  const hours =
    Math.floor(
      (distance %
        (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


  /* TÍNH PHÚT */

  const minutes =
    Math.floor(
      (distance %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );


  /* TÍNH GIÂY */

  const seconds =
    Math.floor(
      (distance %
        (1000 * 60)) /
        1000
    );


  /* HIỂN THỊ */

  document.getElementById(
    "days"
  ).textContent =
    String(days).padStart(2, "0");


  document.getElementById(
    "hours"
  ).textContent =
    String(hours).padStart(2, "0");


  document.getElementById(
    "minutes"
  ).textContent =
    String(minutes).padStart(2, "0");


  document.getElementById(
    "seconds"
  ).textContent =
    String(seconds).padStart(2, "0");

}


/* Chạy ngay */

updateCountdown();


/* Cập nhật mỗi giây */

setInterval(
  updateCountdown,
  1000
);

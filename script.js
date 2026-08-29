// =============================
// CHỈNH CẤU HÌNH Ở ĐÂY
// =============================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFS3W8_4iDxUh35Kxoh-fKD76n5TAk6CI_xn2-fyxSJRyC1jG_hXbmULYXNG8AorKx/exec";

// Thêm / sửa câu hỏi tại đây. Có thể để [] nếu chưa muốn hỏi.
const QUESTIONS = [
  // { id: "q1", text: "Bạn có yêu cầu đặc biệt nào về món ăn không?", placeholder: "Ví dụ: ăn chay, dị ứng..." },
  // { id: "q2", text: "Bạn có cần hỗ trợ đưa đón không?", placeholder: "Nhập câu trả lời..." }
];

function showSection(id){
  const el=document.getElementById(id);
  if(el){
    el.classList.remove("hidden");
    setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"start"}),30);
  }
}

function renderQuestions(){
  const box=document.getElementById("questions");
  if(!box) return;
  box.innerHTML="";
  QUESTIONS.forEach((q,i)=>{
    const wrap=document.createElement("div");
    wrap.className="question";
    wrap.innerHTML=`<label>${i+1}. ${escapeHtml(q.text)}</label>
      <input name="${escapeAttr(q.id)}" placeholder="${escapeAttr(q.placeholder||"Nhập câu trả lời...")}">`;
    box.appendChild(wrap);
  });
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escapeAttr(s){return escapeHtml(s)}

function prepareForm(form){
  if(!SCRIPT_URL){
    return false;
  }

  form.action = SCRIPT_URL;
  form.method = "POST";

  return true;
}

document.addEventListener("DOMContentLoaded",()=>{
  renderQuestions();

  const rsvp=document.getElementById("rsvpForm");
  rsvp.addEventListener("submit",(e)=>{
    if(!prepareForm(rsvp)){
      e.preventDefault();
      document.getElementById("rsvpStatus").textContent="Bạn chưa điền link Google Apps Script trong script.js.";
      return;
    }
    document.getElementById("rsvpStatus").textContent="Đã gửi. Cảm ơn bạn đã xác nhận!";
  });

  const wish=document.getElementById("wishForm");
  wish.addEventListener("submit",(e)=>{
    if(!prepareForm(wish)){
      e.preventDefault();
      document.getElementById("wishStatus").textContent="Bạn chưa điền link Google Apps Script trong script.js.";
      return;
    }
    document.getElementById("wishStatus").textContent="Đã gửi lời chúc. Xin cảm ơn!";
  });
});

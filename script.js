// =============================
// CHỈNH CẤU HÌNH Ở ĐÂY
// =============================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjgmY-9iS87bpf1YVAo-0gFsidwrAYVNlyYfCRvPpADpp8nRAUfK1cCQQm_JvYsBKl/exec";

// Thêm / sửa câu hỏi tại đây. Có thể để [] nếu chưa muốn hỏi.
const QUESTIONS = [
// { id: "q1", text: "Hãy cho tôi biết tên của bạn?", placeholder:},
  // { id: "q1", text: "Bạn có tham gia được không?", placeholder:},
  // { id: "q2", text: "Bạn có để lại lời chúc nào không?", placeholder:}
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
  // Nếu chưa cấu hình URL, không gửi nhầm dữ liệu.
  if(!SCRIPT_URL || SCRIPT_URL.includes("https://script.google.com/macros/s/AKfycbyjgmY-9iS87bpf1YVAo-0gFsidwrAYVNlyYfCRvPpADpp8nRAUfK1cCQQm_JvYsBKl/exec")){
    return false;
  }
  form.action=SCRIPT_URL;
  return true;
}

document.addEventListener("DOMContentLoaded",()=>{
  renderQuestions();

  const rsvp=document.getElementById("rsvpForm");
  rsvp.addEventListener("submit",(e)=>{
    if(!prepareForm(rsvp)){
      e.preventDefault();
      document.getElementById("rsvpStatus").textContent="https://script.google.com/macros/s/AKfycbyjgmY-9iS87bpf1YVAo-0gFsidwrAYVNlyYfCRvPpADpp8nRAUfK1cCQQm_JvYsBKl/exec";
      return;
    }
    document.getElementById("rsvpStatus").textContent="Đã gửi. Cảm ơn bạn đã xác nhận!";
  });

  const wish=document.getElementById("wishForm");
  wish.addEventListener("submit",(e)=>{
    if(!prepareForm(wish)){
      e.preventDefault();
      document.getElementById("wishStatus").textContent="https://script.google.com/macros/s/AKfycbyjgmY-9iS87bpf1YVAo-0gFsidwrAYVNlyYfCRvPpADpp8nRAUfK1cCQQm_JvYsBKl/exec";
      return;
    }
    document.getElementById("wishStatus").textContent="Đã gửi lời chúc. Xin cảm ơn!";
  });
});

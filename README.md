# THIỆP MỜI LỄ TỐT NGHIỆP — HTML + GOOGLE SHEETS

## 1. Cấu trúc
- index.html: giao diện thiệp
- style.css: giao diện
- script.js: cấu hình câu hỏi + link Apps Script
- Code.gs: Google Apps Script lưu dữ liệu
- img/graduation.jpg: ảnh chính, bạn thay ảnh của mình vào đây

## 2. Tạo Google Sheet
Tạo một Google Sheet mới, ví dụ tên "Khách mời Lễ Tốt Nghiệp".

Mở:
Extensions > Apps Script

Dán toàn bộ Code.gs vào, lưu lại.

## 3. Deploy Apps Script
Trong Apps Script:
Deploy > New deployment > Web app

Chọn:
- Execute as: Me
- Who has access: Anyone

Bấm Deploy và cấp quyền nếu Google yêu cầu.

Copy Web app URL.

## 4. Kết nối thiệp
Mở script.js.

Tìm:
const SCRIPT_URL = "DAN_LINK_GOOGLE_APPS_SCRIPT_WEB_APP_VAO_DAY";

Thay bằng URL Web app vừa copy.

Ví dụ:
const SCRIPT_URL = "https://script.google.com/macros/s/...../exec";

## 5. Thêm câu hỏi
Trong script.js tìm:

const QUESTIONS = [
];

Ví dụ:

const QUESTIONS = [
  { id: "q1", text: "Bạn có yêu cầu đặc biệt nào về món ăn không?", placeholder: "Ví dụ: ăn chay, dị ứng..." },
  { id: "q2", text: "Bạn có cần hỗ trợ đưa đón không?", placeholder: "Nhập câu trả lời..." }
];

Mỗi câu hỏi phải có id riêng: q1, q2, q3...

## 6. Thay ảnh
Thay file:
img/graduation.jpg

Bằng ảnh của bạn nhưng nên giữ tên:
graduation.jpg

Khuyến nghị ảnh dọc 4:5 hoặc 3:4, tối thiểu khoảng 1200px chiều cao.

## 7. Chạy thử
Mở index.html bằng trình duyệt.

Nếu chỉ mở file trực tiếp trên máy tính, giao diện vẫn xem được.
Sau khi đã điền SCRIPT_URL, hãy test bằng một lần gửi RSVP và kiểm tra Google Sheet.

## 8. Đưa thiệp lên Internet
Cách đơn giản nhất:
- GitHub Pages
- Netlify
- Cloudflare Pages

Chỉ cần tải toàn bộ thư mục lên dịch vụ hosting tĩnh và lấy URL.

Không được chỉ gửi file index.html cho khách nếu bạn muốn khách truy cập bằng điện thoại từ xa.

## 9. Lưu ý
- Google Sheet là nơi lưu RSVP và lời chúc.
- Cột "Câu trả lời" sẽ gom q1, q2, q3... thành một ô.
- Nếu đổi tên cột trong Sheet không ảnh hưởng đến Apps Script hiện tại, vì script ghi theo vị trí cột.
- Không đặt thông tin nhạy cảm vào form.

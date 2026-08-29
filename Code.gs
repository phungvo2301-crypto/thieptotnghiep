// =============================
// GOOGLE APPS SCRIPT
// =============================
// 1. Tạo Google Sheet.
// 2. Vào Extensions > Apps Script.
// 3. Dán toàn bộ code này.
// 4. Deploy > New deployment > Web app.
// 5. Execute as: Me.
// 6. Who has access: Anyone.
// 7. Copy Web app URL và dán vào SCRIPT_URL trong script.js.

const SHEET_NAME = "Responses";

function setupSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);

  if (sh.getLastRow() === 0) {
    sh.appendRow([
      "Thời gian",
      "Loại",
      "Họ và tên",
      "Tham dự",
      "Số người",
      "Câu trả lời",
      "Lời chúc"
    ]);
  }
  return sh;
}

function doGet() {
  setupSheet_();
  return ContentService
    .createTextOutput("Thiệp Lễ Tốt Nghiệp đang hoạt động.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};
    const sh = setupSheet_();

    const answers = Object.keys(data)
      .filter(k => /^q\d+$/i.test(k))
      .sort()
      .map(k => data[k])
      .join(" | ");

    sh.appendRow([
      new Date(),
      data.type || "",
      data.name || "",
      data.attendance || "",
      data.guests || "",
      answers,
      data.wish || ""
    ]);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput("ERROR: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

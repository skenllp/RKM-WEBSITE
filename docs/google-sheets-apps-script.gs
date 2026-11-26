/**
 * RKM Eye Care: saves website appointment requests to this Google Sheet.
 * Setup steps are in README.md, "Google Sheet".
 */
const SHEET_NAME = "Appointments";
const HEADERS = [
  "Received (IST)",
  "Patient name",
  "Phone",
  "Preferred date",
  "Preferred time",
  "Reason",
  "Message",
  "Status",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!secret || data.secret !== secret) return reply({ ok: false, error: "unauthorised" });

    // One request at a time, so two visitors never write over each other.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const book = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      }
      sheet.appendRow(
        [
          Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm"),
          data.name,
          data.phone,
          data.date,
          data.time,
          data.reason,
          data.message,
          "New",
        ].map(asText),
      );
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** The leading apostrophe stores the value as plain text, so nothing a visitor types runs as a formula. */
function asText(value) {
  return "'" + String(value || "");
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

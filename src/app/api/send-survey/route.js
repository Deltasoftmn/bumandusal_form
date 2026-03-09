import { Resend } from "resend";
import { NextResponse } from "next/server";

const BRAND_COLOR = "#006361";

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

function emailWrapper(title, bodyContent) {
  const dateStr = new Date().toLocaleString("mn-MN");
  return `
<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 15px; line-height: 1.5; color: #333; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <div style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="background: ${BRAND_COLOR}; color: #fff; padding: 20px 24px;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700;">${escapeHtml(title)}</h1>
      </div>
      <div style="padding: 24px;">
        ${bodyContent}
        <p style="margin: 24px 0 0; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #666;">
          Илгээсэн огноо: ${dateStr}
        </p>
      </div>
    </div>
  </div>
</body>
</html>`.trim();
}

function row(label, value) {
  const v = value ? escapeHtml(String(value)) : "—";
  return `
  <tr>
    <td style="padding: 12px 16px; border-bottom: 1px solid #eee; font-weight: 600; color: #444; width: 45%;">${escapeHtml(label)}</td>
    <td style="padding: 12px 16px; border-bottom: 1px solid #eee; color: #333;">${v}</td>
  </tr>`;
}

function formatCustomerEmail(data) {
  const tableRows = [
    row("1. Нийт сэтгэл ханамж", data.satisfaction),
    row("2. Зээлийн үйлчилгээ", data.loanService),
    row("3. Харилцаа, үйлчилгээний чанар", data.communication),
    row("4. Санал, гомдол", data.feedback),
  ].join("");
  const body = `
    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
      ${tableRows}
    </table>`;
  return emailWrapper("Харилцагчийн Сэтгэл Ханамж & Санал Хүсэлтийн Хуудас", body);
}

function formatEmployeeEmail(data) {
  const tableRows = [
    row("1. Ажлын орчин, нөхцөл", data.workEnvironment),
    row("2. Харилцагчтай харьцах процесс", data.customerInteraction),
    row("3. Дэмжлэг, удирдлага", data.supportManagement),
    row("4. Удирдлагын таарамжгүй байдал", data.managementIssues),
    row("5. Санал хүсэлт", data.suggestions),
  ].join("");
  const body = `
    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
      ${tableRows}
    </table>`;
  return emailWrapper("Ажилтны Сэтгэл Ханамж & Санал Хүсэлт Хуудас", body);
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { type, data } = await request.json();
    // Resend sandbox (onboarding@resend.dev) only allows sending to your Resend account email.
    // Default to that so it works without domain verification. After you verify a domain at
    // resend.com/domains and change the "from" address, set SURVEY_RECIPIENT_EMAIL in Vercel
    // (e.g. to hr@bumandusal.mn) to receive surveys elsewhere.
    const toEmail = process.env.SURVEY_RECIPIENT_EMAIL || "bumandusal.bbsb@gmail.com";

    if (!type || !data) {
      return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
    }

    const subject =
      type === "customer"
        ? "Харилцагчийн сэтгэл ханамжийн судалгаа - Шинэ илгээлт"
        : "Ажилчдын сэтгэл ханамжийн судалгаа - Шинэ илгээлт";

    const html =
      type === "customer" ? formatCustomerEmail(data) : formatEmployeeEmail(data);

    const { error } = await resend.emails.send({
      from: "Bumandusal Survey <onboarding@resend.dev>",
      to: toEmail,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

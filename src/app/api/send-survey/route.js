import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatCustomerEmail(data) {
  return `
<h2>Харилцагчийн Сэтгэл Ханамж & Санал Хүсэлтийн Хуудас</h2>
<table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%;">
  <tr><td><strong>1. Нийт сэтгэл ханамж</strong></td><td>${data.satisfaction || "-"}</td></tr>
  <tr><td><strong>2. Зээлийн үйлчилгээ</strong></td><td>${data.loanService || "-"}</td></tr>
  <tr><td><strong>3. Харилцаа, үйлчилгээний чанар</strong></td><td>${data.communication || "-"}</td></tr>
  <tr><td><strong>4. Санал, гомдол</strong></td><td>${data.feedback || "-"}</td></tr>
</table>
<p><em>Илгээсэн огноо: ${new Date().toLocaleString("mn-MN")}</em></p>
  `.trim();
}

function formatEmployeeEmail(data) {
  return `
<h2>Ажилтны Сэтгэл Ханамж & Санал Хүсэлт Хуудас</h2>
<table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%;">
  <tr><td><strong>1. Ажлын орчин, нөхцөл</strong></td><td>${data.workEnvironment || "-"}</td></tr>
  <tr><td><strong>2. Харилцагчтай харьцах процесс</strong></td><td>${data.customerInteraction || "-"}</td></tr>
  <tr><td><strong>3. Дэмжлэг, удирдлага</strong></td><td>${data.supportManagement || "-"}</td></tr>
  <tr><td><strong>4. Удирдлагын таарамжгүй байдал</strong></td><td>${data.managementIssues || "-"}</td></tr>
  <tr><td><strong>5. Санал хүсэлт</strong></td><td>${data.suggestions || "-"}</td></tr>
</table>
<p><em>Илгээсэн огноо: ${new Date().toLocaleString("mn-MN")}</em></p>
  `.trim();
}

export async function POST(request) {
  try {
    const { type, data } = await request.json();
    const toEmail = "bilguunz045@gmail.com";

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

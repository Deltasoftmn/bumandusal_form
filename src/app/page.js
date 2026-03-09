"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import CustomerForm from "@/components/CustomerForm";
import EmployeeForm from "@/components/EmployeeForm";

export default function Home() {
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);

  const handleCustomerSubmit = async (data) => {
    const res = await fetch("/api/send-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "customer", data }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Илгээхэд алдаа гарлаа");
    setCustomerModalOpen(false);
  };

  const handleEmployeeSubmit = async (data) => {
    const res = await fetch("/api/send-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "employee", data }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Илгээхэд алдаа гарлаа");
    setEmployeeModalOpen(false);
  };

  const cardBase =
    "group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="flex justify-center border-b border-gray-100 bg-white py-8 shadow-sm">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={70}
          priority
          className="h-auto w-auto object-contain"
        />
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Customer Satisfaction Survey */}
          <section className={cardBase}>
            <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: "#006361" }} />
            <div className="flex items-start gap-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition group-hover:scale-105"
                style={{ backgroundColor: "#006361" }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-snug text-gray-900">
                  Харилцагчийн сэтгэл ханамжийн судалгаа
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                  Эрхэм харилцагч та манай байгууллагын бүтээгдэхүүн үйлчилгээтэй холбоотой санал хүсэлтээ илгээгээрэй.
                </p>
                <ol className="mt-4 space-y-2 pl-4 text-sm leading-relaxed text-gray-600" style={{ listStyle: "decimal" }}>
                  <li>Та манай ББСБ-с түргэн шуурхай үйлчилгээ авч чадсан уу / чадаагүй бол шалтгаан</li>
                  <li>Ажилтануудын харилцааны соёлыг үнэлнэ үү</li>
                  <li>Санал, хүсэлт</li>
                </ol>
                <button
                  onClick={() => setCustomerModalOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 font-semibold transition hover:opacity-80"
                  style={{ color: "#006361" }}
                >
                  <span className="underline underline-offset-4">Энд дарж бөглөнө үү.</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Employee Satisfaction Survey */}
          <section className={cardBase}>
            <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: "#006361" }} />
            <div className="flex items-start gap-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition group-hover:scale-105"
                style={{ backgroundColor: "#006361" }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-snug text-gray-900">
                  Ажилчдын сэтгэл ханамжийн судалгаа
                </h2>
                <button
                  onClick={() => setEmployeeModalOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 font-semibold transition hover:opacity-80"
                  style={{ color: "#006361" }}
                >
                  <span className="underline underline-offset-4">Энд дарж бөглөнө үү.</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Modal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        title="Харилцагчийн Сэтгэл Ханамж & Санал Хүсэлтийн Хуудас"
      >
        <CustomerForm onSubmit={handleCustomerSubmit} />
      </Modal>

      <Modal
        isOpen={employeeModalOpen}
        onClose={() => setEmployeeModalOpen(false)}
        title="Ажилтны Сэтгэл Ханамж & Санал Хүсэлт Хуудас"
      >
        <EmployeeForm onSubmit={handleEmployeeSubmit} />
      </Modal>
    </div>
  );
}

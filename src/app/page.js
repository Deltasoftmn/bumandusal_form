"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import CustomerForm from "@/components/CustomerForm";
import EmployeeForm from "@/components/EmployeeForm";

export default function Home() {
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);

  const handleCustomerSubmit = (data) => {
    console.log("Customer form:", data);
    setCustomerModalOpen(false);
  };

  const handleEmployeeSubmit = (data) => {
    console.log("Employee form:", data);
    setEmployeeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Customer Satisfaction Survey */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  Харилцагчийн сэтгэл ханамжийн судалгаа
                </h2>
                <p className="mt-3 text-gray-600">
                  Эрхэм харилцагч та манай байгууллагын бүтээгдэхүүн үйлчилгээтэй холбоотой санал хүсэлтээ илгээгээрэй.
                </p>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-gray-600">
                  <li>Та манай ББСБ-с түргэн шуурхай үйлчилгээ авч чадсан уу / чадаагүй бол шалтгаан</li>
                  <li>Ажилтануудын харилцааны соёлыг үнэлнэ үү</li>
                  <li>Санал, хүсэлт</li>
                </ol>
                <button
                  onClick={() => setCustomerModalOpen(true)}
                  className="mt-6 font-medium text-green-600 underline decoration-green-600 underline-offset-2 hover:text-green-700"
                >
                  Энд дарж бөглөнө үү.
                </button>
              </div>
            </div>
          </section>

          {/* Employee Satisfaction Survey */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  Ажилчдын сэтгэл ханамжийн судалгаа
                </h2>
                <button
                  onClick={() => setEmployeeModalOpen(true)}
                  className="mt-6 font-medium text-green-600 underline decoration-green-600 underline-offset-2 hover:text-green-700"
                >
                  Энд дарж бөглөнө үү.
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Customer Form Modal */}
      <Modal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        title="Харилцагчийн Сэтгэл Ханамж & Санал Хүсэлтийн Хуудас"
      >
        <CustomerForm onSubmit={handleCustomerSubmit} />
      </Modal>

      {/* Employee Form Modal */}
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

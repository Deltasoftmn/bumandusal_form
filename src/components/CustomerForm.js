"use client";

import { useState } from "react";

export default function CustomerForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    satisfaction: "",
    loanService: "",
    communication: "",
    feedback: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Overall Satisfaction */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">1. Нийт сэтгэл ханамж</h3>
        <p className="text-gray-600">Та манай үйлчилгээтэй хэрхэн сэтгэл хангалуун байна вэ?</p>
        <div className="flex flex-wrap gap-4">
          {["Маш сэтгэл хангалуун", "Дунд зэрэг", "Сэтгэл хангалуун бус"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="satisfaction"
                value={opt}
                checked={formData.satisfaction === opt}
                onChange={() => handleChange("satisfaction", opt)}
                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 2: Loan Service */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">2. Зээлийн үйлчилгээ</h3>
        <p className="text-gray-600">Манай зээлийн үйлчилгээ таны хэрэгцээг хангаж байна уу?</p>
        <div className="flex flex-wrap gap-4">
          {["Тийм", "Үгүй"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="loanService"
                value={opt}
                checked={formData.loanService === opt}
                onChange={() => handleChange("loanService", opt)}
                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 3: Communication, Service Quality */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">3. Харилцаа, үйлчилгээний чанар</h3>
        <p className="text-gray-600">Манай ажилтнууд таны асуулт, шаардлагад хэр хурдан, ойлгомжтой хариулсан бэ?</p>
        <div className="flex flex-wrap gap-4">
          {["Маш сайн", "Дунд зэрэг", "Сайн бус"].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="communication"
                value={opt}
                checked={formData.communication === opt}
                onChange={() => handleChange("communication", opt)}
                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 4: Suggestions, Complaints */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">4. Санал, гомдол</h3>
        <p className="text-gray-600">Танд санал хүсэлт байна уу?</p>
        <textarea
          value={formData.feedback}
          onChange={(e) => handleChange("feedback", e.target.value)}
          placeholder="(Богино текст бичих зай)"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          className="rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white transition hover:bg-green-700"
        >
          Илгээх
        </button>
      </div>
    </form>
  );
}

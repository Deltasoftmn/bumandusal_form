"use client";

import { useState } from "react";

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-800 placeholder-gray-400 transition focus:border-[#006361] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006361]/20";

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${
            value === opt
              ? "border-[#006361] bg-[#006361]/5"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="h-4 w-4 border-gray-300 focus:ring-[#006361]"
            style={{ accentColor: "#006361" }}
          />
          <span className="font-medium text-gray-800">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function FormSection({ num, title, question, children }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/30 p-5">
      <div className="mb-3 flex items-baseline gap-2">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: "#006361" }}
        >
          {num}
        </span>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mb-4 text-gray-600">{question}</p>
      {children}
    </div>
  );
}

export default function CustomerForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    satisfaction: "",
    loanService: "",
    communication: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSubmit || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      alert(err.message || "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection
        num={1}
        title="Нийт сэтгэл ханамж"
        question="Та манай үйлчилгээтэй хэрхэн сэтгэл хангалуун байна вэ?"
      >
        <RadioGroup
          name="satisfaction"
          options={["Маш сэтгэл хангалуун", "Дунд зэрэг", "Сэтгэл хангалуун бус"]}
          value={formData.satisfaction}
          onChange={(v) => handleChange("satisfaction", v)}
        />
      </FormSection>

      <FormSection
        num={2}
        title="Зээлийн үйлчилгээ"
        question="Манай зээлийн үйлчилгээ таны хэрэгцээг хангаж байна уу?"
      >
        <RadioGroup
          name="loanService"
          options={["Тийм", "Үгүй"]}
          value={formData.loanService}
          onChange={(v) => handleChange("loanService", v)}
        />
      </FormSection>

      <FormSection
        num={3}
        title="Харилцаа, үйлчилгээний чанар"
        question="Манай ажилтнууд таны асуулт, шаардлагад хэр хурдан, ойлгомжтой хариулсан бэ?"
      >
        <RadioGroup
          name="communication"
          options={["Маш сайн", "Дунд зэрэг", "Сайн бус"]}
          value={formData.communication}
          onChange={(v) => handleChange("communication", v)}
        />
      </FormSection>

      <FormSection
        num={4}
        title="Санал, гомдол"
        question="Танд санал хүсэлт байна уу?"
      >
        <textarea
          value={formData.feedback}
          onChange={(e) => handleChange("feedback", e.target.value)}
          placeholder="(Богино текст бичих зай)"
          rows={4}
          className={`${inputBase} resize-none`}
        />
      </FormSection>

      <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl px-8 py-3.5 font-semibold text-white shadow-md transition hover:shadow-lg hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: "#006361" }}
        >
          {isSubmitting ? "Илгээж байна..." : "Илгээх"}
        </button>
      </div>
    </form>
  );
}

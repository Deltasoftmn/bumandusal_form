"use client";

import { useState } from "react";

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-800 placeholder-gray-400 transition focus:border-[#006361] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006361]/20";

const radioOptions = ["Маш сайн", "Дунд зэрэг", "Сайн бус"];

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
      {question && <p className="mb-4 text-gray-600">{question}</p>}
      {children}
    </div>
  );
}

export default function EmployeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    workEnvironment: "",
    customerInteraction: "",
    supportManagement: "",
    managementIssues: "",
    suggestions: "",
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
        title="Ажлын орчин, нөхцөл"
        question="Таны ажлын орчин, нөхцөл ямар байна вэ?"
      >
        <RadioGroup
          name="workEnvironment"
          options={radioOptions}
          value={formData.workEnvironment}
          onChange={(v) => handleChange("workEnvironment", v)}
        />
      </FormSection>

      <FormSection
        num={2}
        title="Харилцагчтай харьцах процесс"
        question="Таны ажиллах орчин, харилцагчид үйлчилгээ үзүүлэх боломж хэр хангалттай байна вэ?"
      >
        <RadioGroup
          name="customerInteraction"
          options={radioOptions}
          value={formData.customerInteraction}
          onChange={(v) => handleChange("customerInteraction", v)}
        />
      </FormSection>

      <FormSection
        num={3}
        title="Дэмжлэг, удирдлага"
        question="Байгууллагаас авах дэмжлэг, удирдлага таны ажлын гүйцэтгэлд хэр нөлөөлж байна вэ?"
      >
        <RadioGroup
          name="supportManagement"
          options={radioOptions}
          value={formData.supportManagement}
          onChange={(v) => handleChange("supportManagement", v)}
        />
      </FormSection>

      <FormSection
        num={4}
        title="Удирдлагын таарамжгүй байдал бий эсэх?"
        question={null}
      >
        <input
          type="text"
          value={formData.managementIssues}
          onChange={(e) => handleChange("managementIssues", e.target.value)}
          placeholder="(Богино текст бичих зай)"
          className={inputBase}
        />
      </FormSection>

      <FormSection
        num={5}
        title="Танд санал хүсэлт байна уу?"
        question={null}
      >
        <input
          type="text"
          value={formData.suggestions}
          onChange={(e) => handleChange("suggestions", e.target.value)}
          placeholder="(Богино текст бичих зай)"
          className={inputBase}
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

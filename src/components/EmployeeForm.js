"use client";

import { useState } from "react";

export default function EmployeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    workEnvironment: "",
    customerInteraction: "",
    supportManagement: "",
    managementIssues: "",
    suggestions: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const radioOptions = ["Маш сайн", "Дунд зэрэг", "Сайн бус"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Work Environment */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">1. Ажлын орчин, нөхцөл</h3>
        <p className="text-gray-600">Таны ажлын орчин, нөхцөл ямар байна вэ?</p>
        <div className="flex flex-wrap gap-4">
          {radioOptions.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="workEnvironment"
                value={opt}
                checked={formData.workEnvironment === opt}
                onChange={() => handleChange("workEnvironment", opt)}
                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 2: Customer Interaction */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">2. Харилцагчтай харьцах процесс</h3>
        <p className="text-gray-600">Таны ажиллах орчин, харилцагчид үйлчилгээ үзүүлэх боломж хэр хангалттай байна вэ?</p>
        <div className="flex flex-wrap gap-4">
          {radioOptions.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="customerInteraction"
                value={opt}
                checked={formData.customerInteraction === opt}
                onChange={() => handleChange("customerInteraction", opt)}
                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 3: Support, Management */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">3. Дэмжлэг, удирдлага</h3>
        <p className="text-gray-600">Байгууллагаас авах дэмжлэг, удирдлага таны ажлын гүйцэтгэлд хэр нөлөөлж байна вэ?</p>
        <div className="flex flex-wrap gap-4">
          {radioOptions.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="supportManagement"
                value={opt}
                checked={formData.supportManagement === opt}
                onChange={() => handleChange("supportManagement", opt)}
                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section 4: Management Issues */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">4. Удирдлагын таарамжгүй байдал бий эсэх?</h3>
        <input
          type="text"
          value={formData.managementIssues}
          onChange={(e) => handleChange("managementIssues", e.target.value)}
          placeholder="(Богино текст бичих зай)"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      {/* Section 5: Suggestions */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">5. Танд санал хүсэлт байна уу?</h3>
        <input
          type="text"
          value={formData.suggestions}
          onChange={(e) => handleChange("suggestions", e.target.value)}
          placeholder="(Богино текст бичих зай)"
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

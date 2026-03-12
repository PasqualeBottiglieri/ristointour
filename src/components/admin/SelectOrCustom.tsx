"use client";

import { useState } from "react";

interface SelectOrCustomProps {
  name: string;
  label: string;
  required?: boolean;
  options: string[];
  defaultValue?: string;
  placeholder?: string;
}

export default function SelectOrCustom({
  name,
  label,
  required,
  options,
  defaultValue,
  placeholder,
}: SelectOrCustomProps) {
  const isCustomDefault = defaultValue ? !options.includes(defaultValue) : false;
  const [isCustom, setIsCustom] = useState(isCustomDefault);
  const [customValue, setCustomValue] = useState(isCustomDefault ? defaultValue || "" : "");
  const [selectValue, setSelectValue] = useState(
    isCustomDefault ? "__custom__" : defaultValue || ""
  );

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary";

  function handleSelectChange(val: string) {
    setSelectValue(val);
    if (val === "__custom__") {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      setCustomValue("");
    }
  }

  const actualValue = isCustom ? customValue : selectValue;

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
        {label} {required && "*"}
      </label>
      <input type="hidden" name={name} value={actualValue} />
      <select
        value={selectValue}
        onChange={(e) => handleSelectChange(e.target.value)}
        className={inputClass}
      >
        <option value="" disabled>
          {placeholder || "Seleziona..."}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
        <option value="__custom__">Altro...</option>
      </select>
      {isCustom && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Inserisci nuovo valore..."
          className={`${inputClass} mt-2`}
          autoFocus
        />
      )}
    </div>
  );
}

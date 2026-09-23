/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, FolderTree } from "lucide-react";

interface CategorySelectProps {
  categories: any[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({ categories, value, onChange }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories.find((cat) => cat._id === value) || categories[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-xl border bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition-all duration-200 cursor-pointer ${
          isOpen ? "border-[#1C3516] bg-white ring-2 ring-[#1C3516]/10 shadow-sm" : "border-stone-300 hover:border-stone-400"
        }`}
      >
        <span className="truncate font-medium flex items-center gap-2.5">
          <FolderTree className="size-4 text-stone-400" />
          {selectedCategory ? selectedCategory.name : "Select category"}
        </span>
        <ChevronDown
          className={`size-4 text-stone-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#1C3516]" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="max-h-60 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {categories.length === 0 ? (
            <div className="p-3 text-xs text-stone-400 text-center">No categories found</div>
          ) : (
            categories.map((cat) => {
              const isSelected = value === cat._id;

              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => {
                    onChange(cat._id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#1C3516] text-amber-50 font-medium"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <span>{cat.name}</span>
                  {isSelected && <Check className="size-3.5 text-amber-300" />}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
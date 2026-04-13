import React, { useState, useRef, useEffect } from "react";
import type { DocumentSection } from "../data/documentSections";

interface SectionDropdownProps {
  sections: DocumentSection[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function SectionDropdown({
  sections,
  selectedIds,
  onChange,
}: SectionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedSections = sections.filter((s) => selectedIds.includes(s.id));
  const maxVisiblePills = 2;
  const visiblePills = selectedSections.slice(0, maxVisiblePills);
  const extraCount = selectedSections.length - maxVisiblePills;

  function toggleSection(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  function clearAll() {
    onChange([]);
  }

  function removeSection(id: string) {
    onChange(selectedIds.filter((sid) => sid !== id));
  }

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="block text-sm text-gray-700 mb-2">
        Select document sections associated with the deviation
        <span className="text-red-500">*</span>
      </label>

      {/* Trigger area */}
      <div
        className="flex items-center border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white min-h-[44px] hover:border-gray-400 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedSections.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-400 flex-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>Search sections</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1 flex-wrap">
            {visiblePills.map((section) => (
              <span
                key={section.id}
                className="inline-flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-800"
              >
                Section {section.number} - {section.title}
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    removeSection(section.id);
                  }}
                  className="ml-1 text-gray-500 hover:text-gray-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
            {extraCount > 0 && (
              <span className="text-sm text-gray-500 font-medium">
                + {extraCount} more
              </span>
            )}
          </div>
        )}

        {/* Chevron */}
        <svg
          className={`w-5 h-5 text-gray-400 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {/* Section list */}
          {sections.map((section, index) => {
            const isSelected = selectedIds.includes(section.id);
            return (
              <div
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  index < sections.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? "bg-gray-900 border-gray-900"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-800">
                  Section {section.number} - {section.title}
                </span>
              </div>
            );
          })}

          {/* Clear all / Done */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-900 hover:text-black"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

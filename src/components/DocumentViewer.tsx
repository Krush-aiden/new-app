import { useRef } from "react";
import type { DocumentSection } from "../data/documentSections";
import { getDepth } from "../data/documentSections";

interface DocumentViewerProps {
  sections: DocumentSection[];
  highlightedSubsectionIds?: string[];
}

/** Indentation left-padding based on subsection depth */
const depthPadding: Record<number, string> = {
  0: "pl-0",
  1: "pl-0",
  2: "pl-8",
  3: "pl-16",
  4: "pl-24",
};

export default function DocumentViewer({
  sections,
  highlightedSubsectionIds = [],
}: DocumentViewerProps) {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function scrollToSection(sectionId: string) {
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (sections.length === 0) {
    return (
      <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
        <p className="text-gray-400 text-center text-sm leading-relaxed max-w-xs">
          Selected document sections appear here. After generating the issue
          description, Quln will highlight the content it used to provide the
          gap analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Jump to Section tabs */}
      <div className="border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
        <div className="px-5 py-3">
          <span className="text-xs font-medium text-gray-500 block mb-2">
            Jump to Section:
          </span>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className="px-3 py-1 text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {section.number}: {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
        {sections.map((section) => (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
          >
            <h3 className="text-base font-bold text-gray-900">
              Section {section.number}: {section.title}
            </h3>
            {section.subtitle && (
              <p className="text-sm text-gray-700 mt-0.5">{section.subtitle}</p>
            )}

            {section.subsections.length > 0 && (
              <div className="mt-4 space-y-1">
                {section.subsections.map((sub) => {
                  const isHighlighted = highlightedSubsectionIds.includes(
                    sub.id,
                  );
                  const depth = getDepth(sub.number);
                  const pad = depthPadding[depth] ?? "pl-24";

                  return (
                    <div
                      key={sub.id}
                      className={`flex gap-4 py-2 px-3 rounded ${pad} ${
                        isHighlighted ? "bg-sky-100" : ""
                      }`}
                    >
                      <span className="text-sm text-gray-800 flex-shrink-0 min-w-[3.5rem]">
                        {sub.number}
                      </span>
                      <span className="text-sm text-gray-800">
                        {sub.title}
                        {sub.title && sub.content ? " " : ""}
                        {sub.content}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  documentSections,
  type DocumentSection,
} from "../data/documentSections";
import SectionDropdown from "./SectionDropdown";
import DocumentViewer from "./DocumentViewer";
import IssueDescription from "./IssueDescription";

export default function ProtocolGapAnalysis() {
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);
  const [deviationText, setDeviationText] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Subsection IDs to highlight after generation
  const highlightedSubsectionIds = isGenerated
    ? ["4.2", "4.4", "4.4.1", "7.7.5"]
    : [];

  const selectedSections: DocumentSection[] = documentSections.filter((s) =>
    selectedSectionIds.includes(s.id),
  );

  const canGenerate = deviationText.trim().length > 0;

  function handleGenerate() {
    if (!canGenerate) return;
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  }

  return (
    <div className="h-screen bg-white">
      {/* Main content */}
      <div className="flex gap-6 h-full">
        {/* Left panel */}
        <div className="w-[45%] flex-shrink-0 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-4">
            <p className="text-sm text-gray-500 italic">
              Selected Method: Protocol Gap Analysis
            </p>
            <h1 className="text-xl font-bold text-gray-900 mt-1 mb-4">
              Deviation 1
            </h1>

            {/* Quln's Gap Analysis Tool label */}
            <h2 className="text-base font-bold text-gray-900 mb-1">
              Use Quln's Gap Analysis Tool{" "}
              {isGenerated && (
                <span className="font-normal text-gray-500">(Optional)</span>
              )}
            </h2>

            {/* Section dropdown */}
            <SectionDropdown
              sections={documentSections}
              selectedIds={selectedSectionIds}
              onChange={setSelectedSectionIds}
            />

            {/* Deviation text area */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Please Explain the Deviation
                <span className="text-red-500">*</span>
              </h3>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">
                  Describe the deviation with enough detail to support Quln's
                  gap analysis
                  <span className="text-red-500">*</span>
                </p>
                <span className="text-xs text-gray-400">
                  {deviationText.length}/4000
                </span>
              </div>
              <textarea
                value={deviationText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDeviationText(e.target.value)
                }
                maxLength={4000}
                rows={5}
                placeholder="Enter details on what actually happened, how you deviated from the protocol, and any details you would like Quln to consider in the protocol gap analysis."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Generate button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  canGenerate && !isGenerating
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Issue Description
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
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Generated Issue Description */}
            <IssueDescription isVisible={isGenerated} />
          </div>
        </div>

        {/* Right panel - Document Viewer */}
        <div className="flex-1 border border-gray-200 rounded-lg min-h-0 overflow-hidden">
          <DocumentViewer
            sections={selectedSections}
            highlightedSubsectionIds={highlightedSubsectionIds}
          />
        </div>
      </div>
    </div>
  );
}

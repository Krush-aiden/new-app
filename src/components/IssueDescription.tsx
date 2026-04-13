import React, { useState } from "react";

interface IssueDescriptionProps {
  isVisible: boolean;
}

const MOCK_VERSIONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "The capsule filling process deviated from the protocol specifications. Equipment calibration was not verified after relocation. Multiple capsules showed inconsistent fill levels, indicating a potential issue with the machine setup parameters.",
  "During the capsule filling operation, the machine was relocated to a new area. Post-move verification was incomplete, resulting in inconsistent capsule fill volumes. The deviation affects equipment sections 4.2 and 4.4, and procedures outlined in section 7.7.",
  "Investigation revealed that the capsule filling machine (Van Dorn 35 Ton, Machine #86) was not fully recalibrated after relocation. Inspection equipment calibration status was not confirmed per section 4.4.1. Fill volume inconsistencies were observed across multiple production runs.",
  "Following machine relocation, the capsule filling operation experienced deviations from protocol. The Van Dorn 35 Ton Injection Molding Machine (#86) required recalibration per section 4.2 specifications. Inspection equipment verification per section 4.4.1 was incomplete. The SIM process development procedures in section 7.7 were not fully executed prior to resuming production.",
];

export default function IssueDescription({ isVisible }: IssueDescriptionProps) {
  const [activeVersion, setActiveVersion] = useState(MOCK_VERSIONS.length - 1);
  const [description, setDescription] = useState(
    MOCK_VERSIONS[MOCK_VERSIONS.length - 1],
  );
  const [feedback, setFeedback] = useState("");

  if (!isVisible) return null;

  function handleVersionClick(index: number) {
    setActiveVersion(index);
    setDescription(MOCK_VERSIONS[index]);
  }

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-bold text-gray-900">
          Deviation Issue Description
          <span className="text-red-500">*</span>
        </h3>
        <div className="group relative">
          <svg
            className="w-4 h-4 text-gray-400 cursor-help"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-6 whitespace-nowrap">
            Quln generated your issue description
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        Quln generated your issue description below. You can edit it or enhance
        it with Quln - use the bar below to provide any feedback or
        instructions.
      </p>

      {/* Version History */}
      <div className="mb-3">
        <span className="text-xs text-gray-500 mr-2">Version History:</span>
        <div className="inline-flex gap-1 flex-wrap">
          {MOCK_VERSIONS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleVersionClick(index)}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                activeVersion === index
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Version {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Editable description */}
      <div className="relative">
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          rows={6}
          maxLength={4000}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="absolute bottom-3 right-3 text-xs text-gray-400">
          {description.length}/4000
        </span>
      </div>

      {/* Undo/Redo */}
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          title="Undo"
        >
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
              d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4"
            />
          </svg>
        </button>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          title="Redo"
        >
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
              d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4"
            />
          </svg>
        </button>
      </div>

      {/* Enhance bar */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          value={feedback}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFeedback(e.target.value)
          }
          placeholder='Tell Quln how you would like this content to change. Ex. "Reword with bullets"'
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
        >
          Enhance with Gen AI
        </button>
      </div>

      {/* Footer: Disclaimer + Helpful */}
      <div className="mt-4 border border-blue-300 rounded p-2 bg-white">
        <p className="text-[11px] text-gray-600 leading-snug">
          <span className="font-semibold">Note:</span> While Quln is a helpful
          tool, it's important to review all generated and recommended content
          for accuracy and relevance. Users are responsible for assessing that
          the content generated is appropriate for the activity that the user is
          conducting.
        </p>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-xs text-gray-500">Was this helpful?</span>
        <button
          type="button"
          className="text-xs text-blue-700 hover:text-blue-900 font-medium inline-flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 20h2V8H2v12zm20-11a2 2 0 00-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 0 7.59 5.59C7.22 5.95 7 6.45 7 7v11a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
          </svg>
          Yes
        </button>
        <button
          type="button"
          className="text-xs text-blue-700 hover:text-blue-900 font-medium inline-flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 4h-2v12h2V4zm-4 12V5a2 2 0 00-2-2H7c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 002 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 24l5.58-5.59c.37-.36.59-.86.59-1.41V5z" />
          </svg>
          No
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";

import { ChevronDown, ChevronUp } from "../../constant.jsx";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");

  const languages = ["JavaScript", "Python", "Go", "Java"];

  return (
    <div className="flex items-center gap-3 text-sm">
      {/* Left label */}
      <span className="font-semibold">Languages Supported</span>

      {/* Right dropdown */}
      <div className="relative">
        {/* Dropdown toggle button */}
        <p
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-4 py-2 w-40 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selectedLanguage}
          <span className="ml-2 cursor-pointer">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </p>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-md shadow-lg">
            {languages.map((lang) => (
              <div key={lang} className="px-4 py-2">
                {lang}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

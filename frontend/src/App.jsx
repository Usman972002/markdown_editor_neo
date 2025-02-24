import React, { useState } from "react";
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FiDownload } from "react-icons/fi";
import { PiExport, PiExportBold } from "react-icons/pi";
import { LuImport } from "react-icons/lu";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [documentName, setDocumentName] = useState("Untitled.md");
  const [isHtmlPreview, setIsHtmlPreview] = useState(false);
  const [isImported, setIsImported] = useState(false); // Track if a file is imported

  const [lastSavedName, setLastSavedName] = useState(""); // Track last saved document name

  const handleMarkdownChange = (value) => {
    setMarkdown(value);
  };
  useEffect(() => {
    if (markdown === "") setIsImported(false);
  }, [markdown]);

  const handleDownload = (format) => {
    if (format === "markdown") {
      const blob = new Blob([markdown], {
        type: "text/markdown;charset=utf-8",
      });
      saveAs(blob, documentName);
    }
  };

  const handleImport = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => setMarkdown(event.target.result);
    reader.readAsText(e.target.files[0]);
    setIsImported(true);
  };

  // Function to count lines, words, and characters
  const countMarkdownStats = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== ""); // Filter out empty lines
    const words = text.split(/\s+/).filter((word) => word.length > 0); // Filter out empty strings
    const characters = text.length; // Total character count

    return {
      lineCount: lines.length,
      wordCount: words.length,
      charCount: characters,
    };
  };

  const { lineCount, wordCount, charCount } = countMarkdownStats(markdown);

  return (
    <div className="h-screen flex ">
      <div className={`flex flex-col flex-grow w-full`}>
        <header className="flex justify-between items-center px-4 mt-4 ">
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              className="bg-transparent border border-gray-200 py-2 px-3 rounded-md focus:outline-none w-32 sm:w-48"
              value={documentName}
              onChange={(e) => {
                setDocumentName(e.target.value);
                // Update last saved name when the document name changes
              }}
            />
            <button
              className="bg-neutral-700 hover:bg-neutral-950 text-white font-medium text-sm sm:text-base py-2 px-3 sm:px-4 rounded-md"
              onClick={() => {
                setLastSavedName(documentName);
              }}
            >
              Save
            </button>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => handleDownload("markdown")}
              className="flex items-center gap-1 border border-gray-200 text-neutral-700 font-semibold text-sm sm:text-base py-2 px-3 sm:px-4 rounded-md hover:bg-neutral-700 hover:text-white transition-colors duration-200 ease-in-out"
            >
              <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <input
              type="file"
              onChange={handleImport}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-1 border border-gray-200 text-neutral-700 font-semibold text-sm sm:text-base py-2 px-3 sm:px-4 rounded-md hover:bg-neutral-700 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer"
            >
              <LuImport className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Import</span>
            </label>
          </div>
        </header>
        <hr className="mt-4" />
        <div className="flex flex-col sm:flex-row gap-4 px-4">
          <Sidebar setMarkdown={setMarkdown} isImported={isImported} />
          <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <MarkdownEditor
                markdown={markdown}
                onMarkdownChange={handleMarkdownChange}
              />

              <MarkdownPreview
                markdown={markdown}
                isHtmlPreview={isHtmlPreview}
                setIsHtmlPreview={setIsHtmlPreview}
              />
            </div>
            {/* Display stats at the bottom */}
            <div className="px-4 py-2 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-sm sm:text-base border border-gray-200 rounded-md px-2 py-1">
                Lines: {lineCount}
              </p>
              <p className="text-sm sm:text-base border border-gray-200 rounded-md px-2 py-1">
                Words: {wordCount}
              </p>
              <p className="text-sm sm:text-base border border-gray-200 rounded-md px-2 py-1">
                Characters: {charCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

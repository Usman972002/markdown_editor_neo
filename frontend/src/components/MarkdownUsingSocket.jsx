import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const MarkdownUsingSocket = () => {
  const [markdownSocket, setMarkdownSocket] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    socket.on("convertedHtml", (convertedHtml) => {
      setHtml(convertedHtml);
    });

    return () => socket.off("convertedHtml");
  }, []);

  const handleMarkdownChangeSocket = (e) => {
    const text = e.target.value;
    setMarkdownSocket(text);
    socket.emit("convertMarkdown", text); // Send to backend for conversion
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5">
      {/* Markdown Editor */}
      <textarea
        value={markdownSocket}
        onChange={handleMarkdownChangeSocket}
        placeholder="Type Markdown here..."
        rows={10}
        className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-700 resize-none" 
      />
      {/* HTML Preview */}
      <div
        className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md min-h-[200px] overflow-auto" 
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default MarkdownUsingSocket;
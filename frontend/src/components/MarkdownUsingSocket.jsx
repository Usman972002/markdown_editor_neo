import React,{useState,useEffect} from 'react'
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
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <textarea
        value={markdownSocket}
        onChange={handleMarkdownChangeSocket}
        placeholder="Type Markdown here..."
        rows={10}
        style={{ width: "50%", padding: "10px" }}
      />
      <div
        style={{
          width: "50%",
          padding: "10px",
          border: "1px solid #ccc",
          minHeight: "200px",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default MarkdownUsingSocket
import React, { useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleSubmit = () => {
    if (file) {
      setIsLoading(true);
      // Simulate processing time
      setTimeout(() => {
        onUpload(file);
        setIsLoading(false);
      }, 1500);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div style={{
      padding: "2rem",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto",
      width: "100%"
    }}>
      <h2 style={{
        color: "#2e7d32",
        marginBottom: "1.5rem",
        fontSize: "1.8rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
      }}>
        <i className="fas fa-leaf" style={{ color: "#4caf50" }}></i>
        Upload Plant Leaf Image
      </h2>
      
      <div
        style={{
          border: isDragging ? "3px dashed #4caf50" : "3px dashed #c8e6c9",
          padding: "0rem 0rem",
          marginBottom: "1rem",
          cursor: "pointer",
          borderRadius: "12px",
          background: isDragging ? "rgba(76, 175, 80, 0.05)" : "#f9f9f9",
          transition: "all 0.3s ease",
          position: "relative"
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <div style={{
          fontSize: "4rem",
          color: "#c8e6c9",
          marginBottom: "1rem"
        }}>
          <i className="fas fa-cloud-upload-alt"></i>
        </div>
        <p style={{
          fontSize: "1.2rem",
          color: "#616161",
          marginBottom: "0.5rem"
        }}>
          {isDragging ? "Drop your image here" : "Drag & drop or click to upload"}
        </p>
        <p style={{
          fontSize: "0.9rem",
          color: "#9e9e9e"
        }}>
          Supports JPG, PNG, WEBP (Max 5MB)
        </p>
        <input
          type="file"
          id="file-input"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {previewUrl && (
        <div style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "2rem"
        }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          />
          <button
            onClick={removeImage}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      <button 
        onClick={handleSubmit} 
        disabled={!file || isLoading}
        style={{
          padding: "1rem 2.5rem",
          background: !file || isLoading ? "#68b833ff" : "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "50px",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: !file || isLoading ? "not-allowed" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          boxShadow: "0 4px 8px rgba(76, 175, 80, 0.3)",
          transition: "all 0.3s ease",
          opacity: !file || isLoading ? 0.7 : 1
        }}
        onMouseOver={(e) => {
          if (!e.target.disabled) {
            e.target.style.background = "#388e3c";
            e.target.style.transform = "translateY(-2px)";
          }
        }}
        onMouseOut={(e) => {
          if (!e.target.disabled) {
            e.target.style.background = "#4caf50";
            e.target.style.transform = "translateY(0)";
          }
        }}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Processing...
          </>
        ) : (
          <>
            <i className="fas fa-search"></i>
            Detect Disease
          </>
        )}
      </button>

      <div style={{
        marginTop: "1.5rem",
        padding: "1.5rem",
        background: "#e8f5e9",
        borderRadius: "8px",
        textAlign: "left"
      }}>
        <h3 style={{
          color: "#2e7d32",
          marginBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <i className="fas fa-lightbulb"></i>
          Tips for best results:
        </h3>
        <ul style={{
          color: "#388e3c",
          paddingLeft: "1.5rem",
          margin: 0
        }}>
          <li>Take a clear, well-lit photo of the leaf</li>
          <li>Focus on the affected area of the plant</li>
          <li>Include both sides of the leaf if possible</li>
          <li>Ensure the leaf covers most of the image</li>
        </ul>
      </div>
    </div>
  );
}
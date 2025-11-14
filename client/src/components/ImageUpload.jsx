import React, { useState, useRef } from "react";

export default function ImageUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const processFile = (selectedFile) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      processFile(droppedFile);
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      setCameraError("Unable to access camera. Please check permissions.");
      console.error("Camera error:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      canvasRef.current.toBlob((blob) => {
        processFile(blob);
        stopCamera();
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result;
        onUpload(file, base64Image);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      setIsLoading(false);
      alert("Error processing image. Please try again.");
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h2
        style={{
          color: "#2e7d32",
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <i className="fas fa-leaf" style={{ color: "#4caf50" }}></i>
        Upload or Capture Leaf Image
      </h2>

      <div
        style={{
          border: isDragging ? "3px dashed #4caf50" : "3px dashed #c8e6c9",
          padding: "3rem 1rem",
          marginBottom: "1rem",
          cursor: !previewUrl && !showCamera ? "pointer" : "default",
          borderRadius: "12px",
          background: isDragging ? "rgba(76, 175, 80, 0.05)" : "#f9f9f9",
          transition: "all 0.3s ease",
          position: "relative",
          display: !previewUrl && !showCamera ? "block" : "none",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() =>
          !previewUrl &&
          !showCamera &&
          document.getElementById("file-input").click()
        }
      >
        <div
          style={{
            fontSize: "4rem",
            color: "#c8e6c9",
            marginBottom: "1rem",
          }}
        >
          <i className="fas fa-cloud-upload-alt"></i>
        </div>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#616161",
            marginBottom: "0.5rem",
          }}
        >
          {isDragging
            ? "Drop your image here"
            : "Drag & drop or click to upload"}
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#9e9e9e",
          }}
        >
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

      {/* Camera Section */}
      {showCamera && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: "12px",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "12px",
              marginBottom: "1rem",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={capturePhoto}
              style={{
                padding: "0.8rem 1.5rem",
                background: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i className="fas fa-camera"></i>
              Capture Photo
            </button>
            <button
              onClick={stopCamera}
              style={{
                padding: "0.8rem 1.5rem",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i className="fas fa-times"></i>
              Cancel
            </button>
          </div>
        </div>
      )}

      {cameraError && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            background: "#ffebee",
            borderLeft: "4px solid #f44336",
            borderRadius: "4px",
            color: "#c62828",
          }}
        >
          <i className="fas fa-exclamation-circle"></i> {cameraError}
        </div>
      )}

      {previewUrl && (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: "2rem",
          }}
        >
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        {previewUrl && (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              padding: "1rem 2.5rem",
              background: isLoading ? "#68b833ff" : "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 8px rgba(76, 175, 80, 0.3)",
              transition: "all 0.3s ease",
              opacity: isLoading ? 0.7 : 1,
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
        )}

        {!showCamera && !previewUrl && (
          <button
            onClick={startCamera}
            style={{
              padding: "1rem 2.5rem",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#1976D2";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#2196F3";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-camera"></i>
            Take Photo
          </button>
        )}
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.5rem",
          background: "#e8f5e9",
          borderRadius: "8px",
          textAlign: "left",
        }}
      >
        <h3
          style={{
            color: "#2e7d32",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <i className="fas fa-lightbulb"></i>
          Tips for best results:
        </h3>
        <ul
          style={{
            color: "#388e3c",
            paddingLeft: "1.5rem",
            margin: 0,
          }}
        >
          <li>Take a clear, well-lit photo of the leaf</li>
          <li>Focus on the affected area of the plant</li>
          <li>Include both sides of the leaf if possible</li>
          <li>Ensure the leaf covers most of the image</li>
        </ul>
      </div>
    </div>
  );
}

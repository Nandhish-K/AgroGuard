import React from "react";

export default function Results({ result }) {
  if (!result) return null;

  // Severity indicator based on confidence
  const getSeverityLevel = (confidence) => {
    if (confidence >= 80) return "High";
    if (confidence >= 50) return "Medium";
    return "Low";
  };

  // Color based on severity
  const getSeverityColor = (confidence) => {
    if (confidence >= 80) return "#e53935";
    if (confidence >= 50) return "#ffb300";
    return "#43a047";
  };

  return (
    <div style={{
      padding: "2rem",
      background: "linear-gradient(to right, #f8f9fa, #ffffff)",
      marginTop: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      borderLeft: `4px solid ${getSeverityColor(result.confidence)}`,
      transition: "all 0.3s ease"
    }}>
      <h2 style={{
        color: "#2e7d32",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <i className="fas fa-clipboard-list" style={{ fontSize: "1.5rem" }}></i>
        Analysis Results
      </h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        <div style={{
          padding: "1.2rem",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <h3 style={{ 
            fontSize: "1rem", 
            color: "#555", 
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="fas fa-disease" style={{ color: "#7b1fa2" }}></i>
            Disease Detected
          </h3>
          <p style={{ fontSize: "1.2rem", fontWeight: "600", color: "#333" }}>{result.disease}</p>
        </div>
        
        <div style={{
          padding: "1.2rem",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <h3 style={{ 
            fontSize: "1rem", 
            color: "#555", 
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="fas fa-chart-line" style={{ color: "#0288d1" }}></i>
            Confidence Level
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{
              width: "100%",
              height: "8px",
              background: "#e0e0e0",
              borderRadius: "4px",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${result.confidence}%`,
                height: "100%",
                background: getSeverityColor(result.confidence),
                borderRadius: "4px",
                transition: "width 0.5s ease"
              }}></div>
            </div>
            <span style={{ fontWeight: "600", minWidth: "40px" }}>{result.confidence}%</span>
          </div>
          <p style={{ 
            fontSize: "0.85rem", 
            marginTop: "0.5rem", 
            color: getSeverityColor(result.confidence),
            fontWeight: "500"
          }}>
            Severity: {getSeverityLevel(result.confidence)}
          </p>
        </div>
      </div>
      
      <div style={{
        padding: "1.2rem",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        marginTop: "1.5rem"
      }}>
        <h3 style={{ 
          fontSize: "1rem", 
          color: "#555", 
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <i className="fas fa-heartbeat" style={{ color: "#d32f2f" }}></i>
          Recommended Treatment
        </h3>
        <p style={{ 
          lineHeight: "1.6", 
          color: "#333",
          background: "rgba(76, 175, 80, 0.05)",
          padding: "1rem",
          borderRadius: "6px",
          borderLeft: "3px solid #4caf50"
        }}>{result.treatment}</p>
      </div>
      
      {result.prevention && (
        <div style={{
          padding: "1.2rem",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          marginTop: "1.5rem"
        }}>
          <h3 style={{ 
            fontSize: "1rem", 
            color: "#555", 
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <i className="fas fa-shield-alt" style={{ color: "#0097a7" }}></i>
            Prevention Tips
          </h3>
          <p style={{ lineHeight: "1.6", color: "#333" }}>{result.prevention}</p>
        </div>
      )}
      
      <div style={{ 
        display: "flex", 
        gap: "1rem", 
        marginTop: "1.5rem",
        flexWrap: "wrap"
      }}>
        <button style={{
          padding: "0.7rem 1.5rem",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: "500",
          transition: "all 0.2s ease"
        }} onMouseOver={(e) => e.target.style.background = "#388e3c"} 
           onMouseOut={(e) => e.target.style.background = "#4caf50"}>
          <i className="fas fa-save"></i>
          Save Report
        </button>
        
        <button style={{
          padding: "0.7rem 1.5rem",
          background: "transparent",
          color: "#4caf50",
          border: "1px solid #4caf50",
          borderRadius: "6px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: "500",
          transition: "all 0.2s ease"
        }} onMouseOver={(e) => {
          e.target.style.background = "#4caf50";
          e.target.style.color = "white";
        }} onMouseOut={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#4caf50";
        }}>
          <i className="fas fa-print"></i>
          Print
        </button>
        
        <button style={{
          padding: "0.7rem 1.5rem",
          background: "transparent",
          color: "#0288d1",
          border: "1px solid #0288d1",
          borderRadius: "6px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: "500",
          transition: "all 0.2s ease"
        }} onMouseOver={(e) => {
          e.target.style.background = "#0288d1";
          e.target.style.color = "white";
        }} onMouseOut={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#0288d1";
        }}>
          <i className="fas fa-share-alt"></i>
          Share
        </button>
      </div>
    </div>
  );
}
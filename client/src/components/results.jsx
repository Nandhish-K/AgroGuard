import React from "react";

export default function Results({ result }) {
  if (!result) return null;

  // Get color based on severity
  const getSeverityColor = (severity) => {
    if (severity === "Critical" || severity === "High") return "#e53935";
    if (severity === "Medium") return "#ffb300";
    return "#43a047";
  };

  // Get color based on confidence
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return "#e53935";
    if (confidence >= 50) return "#ffb300";
    return "#43a047";
  };

  const severity = result.severity || "Medium";
  const displayColor = getSeverityColor(severity);

  return (
    <div
      style={{
        padding: "2rem",
        background: "linear-gradient(to right, #f8f9fa, #ffffff)",
        marginTop: "2rem",
        marginBottom: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        borderLeft: `4px solid ${displayColor}`,
        transition: "all 0.3s ease",
        maxWidth: "1000px",
        margin: "2rem auto",
      }}
    >
      <h2
        style={{
          color: "#2e7d32",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "1.5rem",
        }}
      >
        <i className="fas fa-clipboard-list" style={{ fontSize: "1.5rem" }}></i>
        Analysis Results
      </h2>

      {/* Main Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Disease Card */}
        <div
          style={{
            padding: "1.5rem",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <i
              className="fas fa-leaf"
              style={{ color: "#4caf50", fontSize: "1rem" }}
            ></i>
            Disease Detected
          </h3>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            {result.disease}
          </p>
          {result.description && (
            <p
              style={{
                fontSize: "0.85rem",
                color: "#666",
                marginTop: "0.5rem",
              }}
            >
              {result.description}
            </p>
          )}
        </div>

        {/* Confidence Card */}
        <div
          style={{
            padding: "1.5rem",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <i
              className="fas fa-chart-pie"
              style={{ color: "#2196F3", fontSize: "1rem" }}
            ></i>
            Confidence Level
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                flex: 1,
                height: "10px",
                background: "#e0e0e0",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${result.confidence}%`,
                  height: "100%",
                  background: getConfidenceColor(result.confidence),
                  borderRadius: "5px",
                  transition: "width 0.5s ease",
                }}
              ></div>
            </div>
            <span
              style={{
                fontWeight: "700",
                fontSize: "1.1rem",
                minWidth: "50px",
              }}
            >
              {result.confidence}%
            </span>
          </div>
        </div>

        {/* Severity Card */}
        <div
          style={{
            padding: "1.5rem",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <i
              className="fas fa-exclamation-triangle"
              style={{ color: "#ff9800", fontSize: "1rem" }}
            ></i>
            Severity Level
          </h3>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              color: displayColor,
              margin: 0,
            }}
          >
            {result.severity}
          </p>
        </div>
      </div>

      {/* Treatments Section */}
      {(result.treatments || result.treatment) && (
        <div
          style={{
            padding: "1.5rem",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            marginBottom: "1.5rem",
            borderLeft: `4px solid #4caf50`,
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              color: "#2e7d32",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "600",
            }}
          >
            <i className="fas fa-pills" style={{ fontSize: "1.1rem" }}></i>
            Recommended Treatments
          </h3>
          {Array.isArray(result.treatments) ? (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {result.treatments.map((treatment, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "0.8rem 0",
                    borderBottom:
                      idx < result.treatments.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                    display: "flex",
                    gap: "0.8rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                      background: "#4caf50",
                      color: "white",
                      borderRadius: "50%",
                      fontWeight: "600",
                      fontSize: "0.8rem",
                      flexShrink: 0,
                      marginTop: "0.2rem",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ color: "#333", lineHeight: "1.5" }}>
                    {treatment}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p
              style={{
                lineHeight: "1.6",
                color: "#333",
                background: "rgba(76, 175, 80, 0.05)",
                padding: "1rem",
                borderRadius: "6px",
              }}
            >
              {result.treatment}
            </p>
          )}
        </div>
      )}

      {/* Prevention Section */}
      {result.prevention && (
        <div
          style={{
            padding: "1.5rem",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            marginBottom: "1.5rem",
            borderLeft: `4px solid #2196F3`,
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              color: "#1565c0",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "600",
            }}
          >
            <i className="fas fa-shield-alt" style={{ fontSize: "1.1rem" }}></i>
            Prevention Tips
          </h3>
          {Array.isArray(result.prevention) ? (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {result.prevention.map((tip, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "0.8rem 0",
                    borderBottom:
                      idx < result.prevention.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                    display: "flex",
                    gap: "0.8rem",
                  }}
                >
                  <i
                    className="fas fa-check"
                    style={{
                      color: "#4caf50",
                      marginTop: "0.3rem",
                      flexShrink: 0,
                    }}
                  ></i>
                  <span style={{ color: "#333" }}>{tip}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ lineHeight: "1.6", color: "#333" }}>
              {result.prevention}
            </p>
          )}
        </div>
      )}

      {/* Affected Crops */}
      {result.affected_crops && (
        <div
          style={{
            padding: "1.5rem",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            marginBottom: "1.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "600",
            }}
          >
            <i className="fas fa-apple-alt" style={{ color: "#ff6f00" }}></i>
            Affected Crops
          </h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {result.affected_crops.map((crop, idx) => (
              <span
                key={idx}
                style={{
                  background: "#fff3e0",
                  color: "#e65100",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                {crop}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            padding: "0.8rem 1.5rem",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: "600",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#388e3c")}
          onMouseOut={(e) => (e.target.style.background = "#4caf50")}
          onClick={() => window.print()}
        >
          <i className="fas fa-print"></i>
          Print Report
        </button>

        <button
          style={{
            padding: "0.8rem 1.5rem",
            background: "transparent",
            color: "#2196F3",
            border: "1px solid #2196F3",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: "600",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#2196F3";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#2196F3";
          }}
          onClick={() => {
            const text = `
Disease Report - ${result.disease}
Confidence: ${result.confidence}%
Severity: ${result.severity}

Description: ${result.description || ""}

Treatments:
${
  Array.isArray(result.treatments)
    ? result.treatments.map((t, i) => `${i + 1}. ${t}`).join("\n")
    : result.treatment
}

Prevention:
${
  Array.isArray(result.prevention)
    ? result.prevention.map((p, i) => `${i + 1}. ${p}`).join("\n")
    : result.prevention
}
            `;
            navigator.clipboard.writeText(text);
            alert("Report copied to clipboard!");
          }}
        >
          <i className="fas fa-copy"></i>
          Copy Report
        </button>
      </div>
    </div>
  );
}

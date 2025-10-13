export default function Loading() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center", 
      height: "300px",
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      margin: "2rem 0"
    }}>
      <div style={{
        width: "60px",
        height: "60px",
        border: "4px solid #e8f5e9",
        borderTop: "4px solid #2e7d32",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: "1.5rem"
      }}></div>
      <p style={{ 
        color: "#2e7d32", 
        fontSize: "1.2rem",
        fontWeight: "500",
        margin: 0
      }}>
        Analyzing image...
      </p>
      <p style={{ 
        color: "#66bb6a", 
        fontSize: "0.9rem",
        margin: "0.5rem 0 0 0"
      }}>
        Our AI is examining your plant for diseases
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
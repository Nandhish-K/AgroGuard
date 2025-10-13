export default function About() {
  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem"
    }}>
      <div style={{
        background: "white",
        padding: "2.5rem",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
        textAlign: "center"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem"
        }}>
          <i className="fas fa-info-circle" style={{
            fontSize: "2rem",
            color: "#2e7d32",
            marginRight: "0.75rem"
          }}></i>
          <h1 style={{
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#2e7d32",
            margin: 0
          }}>About Plant Disease Detection</h1>
        </div>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          marginBottom: "2.5rem"
        }}>
          <div style={{
            flex: "1",
            minWidth: "200px",
            padding: "1.5rem",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
            textAlign: "center"
          }}>
            <i className="fas fa-robot" style={{
              fontSize: "2.5rem",
              color: "#2e7d32",
              marginBottom: "1rem"
            }}></i>
            <h3 style={{ color: "#2e7d32", margin: "0 0 0.5rem 0" }}>AI-Powered</h3>
            <p style={{ color: "#1b5e20", margin: 0 }}>Uses advanced machine learning to detect diseases</p>
          </div>
          
          <div style={{
            flex: "1",
            minWidth: "200px",
            padding: "1.5rem",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
            textAlign: "center"
          }}>
            <i className="fas fa-bolt" style={{
              fontSize: "2.5rem",
              color: "#1565c0",
              marginBottom: "1rem"
            }}></i>
            <h3 style={{ color: "#1565c0", margin: "0 0 0.5rem 0" }}>Fast Analysis</h3>
            <p style={{ color: "#0d47a1", margin: 0 }}>Get results in seconds, not days</p>
          </div>
          
          <div style={{
            flex: "1",
            minWidth: "200px",
            padding: "1.5rem",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
            textAlign: "center"
          }}>
            <i className="fas fa-leaf" style={{
              fontSize: "2.5rem",
              color: "#ef6c00",
              marginBottom: "1rem"
            }}></i>
            <h3 style={{ color: "#ef6c00", margin: "0 0 0.5rem 0" }}>Plant Health</h3>
            <p style={{ color: "#e65100", margin: 0 }}>Helps improve crop health and yield</p>
          </div>
        </div>
        
        <p style={{
          color: "#4e4e4e",
          lineHeight: "1.7",
          fontSize: "1.1rem",
          textAlign: "left",
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "12px",
          margin: 0
        }}>
          This system helps farmers detect plant diseases early by analyzing 
          leaf images. Using AI, it predicts the type of disease and suggests 
          possible treatments to improve crop health and yield. Our mission is to 
          make advanced plant disease detection accessible to everyone, from small 
          garden owners to large agricultural operations.
        </p>
      </div>
    </div>
  );
}

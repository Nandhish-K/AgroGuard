export default function About() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <i
            className="fas fa-info-circle"
            style={{
              fontSize: "2rem",
              color: "#2e7d32",
              marginRight: "0.75rem",
            }}
          ></i>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#2e7d32",
              margin: 0,
            }}
          >
            About Plant Disease Detection
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "1.5rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
              textAlign: "center",
            }}
          >
            <i
              className="fas fa-robot"
              style={{
                fontSize: "2.5rem",
                color: "#2e7d32",
                marginBottom: "1rem",
              }}
            ></i>
            <h3 style={{ color: "#2e7d32", margin: "0 0 0.5rem 0" }}>
              AI-Powered
            </h3>
            <p style={{ color: "#1b5e20", margin: 0 }}>
              Uses advanced machine learning to detect diseases
            </p>
          </div>

          <div
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "1.5rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              textAlign: "center",
            }}
          >
            <i
              className="fas fa-bolt"
              style={{
                fontSize: "2.5rem",
                color: "#1565c0",
                marginBottom: "1rem",
              }}
            ></i>
            <h3 style={{ color: "#1565c0", margin: "0 0 0.5rem 0" }}>
              Fast Analysis
            </h3>
            <p style={{ color: "#0d47a1", margin: 0 }}>
              Get results in seconds, not days
            </p>
          </div>

          <div
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "1.5rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
              textAlign: "center",
            }}
          >
            <i
              className="fas fa-leaf"
              style={{
                fontSize: "2.5rem",
                color: "#ef6c00",
                marginBottom: "1rem",
              }}
            ></i>
            <h3 style={{ color: "#ef6c00", margin: "0 0 0.5rem 0" }}>
              Plant Health
            </h3>
            <p style={{ color: "#e65100", margin: 0 }}>
              Helps improve crop health and yield
            </p>
          </div>
        </div>

        <p
          style={{
            color: "#4e4e4e",
            lineHeight: "1.7",
            fontSize: "1.1rem",
            textAlign: "left",
            background: "#f9f9f9",
            padding: "1.5rem",
            borderRadius: "12px",
            margin: "0 0 2rem 0",
          }}
        >
          <strong>AgroGuard</strong> - Your intelligent assistant for plant
          health. This system helps farmers detect plant diseases early by
          analyzing leaf images. Using deep learning AI powered by{" "}
          <strong>VGG16</strong>, it predicts the type of disease and suggests
          targeted treatments to improve crop health and yield. Our mission is
          to make advanced plant disease detection accessible to everyone, from
          small garden owners to large agricultural operations.
        </p>

        <div
          style={{
            background: "#e8f5e9",
            padding: "2rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            borderLeft: "4px solid #4caf50",
          }}
        >
          <h2 style={{ color: "#2e7d32", marginTop: 0 }}>🌾 How It Works</h2>
          <ol style={{ color: "#1b5e20", textAlign: "left", fontSize: "1rem" }}>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Capture or Upload</strong> - Take a photo of a plant leaf
              using your device camera or upload an existing image
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>AI Analysis</strong> - Our deep learning model analyzes
              the leaf image instantly
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Disease Detection</strong> - Get immediate identification
              of any diseases with confidence levels
            </li>
            <li>
              <strong>Treatment Plan</strong> - Receive specific treatment
              recommendations and prevention strategies
            </li>
          </ol>
        </div>

        <div
          style={{
            background: "#e3f2fd",
            padding: "2rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            borderLeft: "4px solid #2196F3",
          }}
        >
          <h2 style={{ color: "#1565c0", marginTop: 0 }}>🚀 Key Features</h2>
          <div
            style={{ textAlign: "left", color: "#0d47a1", fontSize: "0.95rem" }}
          >
            <p>
              ✓ <strong>Real-time Detection</strong> - Get results in seconds
            </p>
            <p>
              ✓ <strong>High Accuracy</strong> - 90%+ confidence with validated
              dataset
            </p>
            <p>
              ✓ <strong>Offline Support</strong> - Works without internet (demo
              mode)
            </p>
            <p>
              ✓ <strong>Mobile Friendly</strong> - Perfect for on-field use
            </p>
            <p>
              ✓ <strong>Camera Support</strong> - Take photos directly from your
              device
            </p>
            <p>
              ✓ <strong>Multiple Diseases</strong> - Detects 8+ crop diseases
            </p>
            <p>
              ✓ <strong>Treatment Guidance</strong> - Step-by-step treatment
              recommendations
            </p>
            <p>
              ✓ <strong>Print & Share</strong> - Export reports for future
              reference
            </p>
          </div>
        </div>

        <div
          style={{
            background: "#fff3e0",
            padding: "2rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            borderLeft: "4px solid #ff9800",
          }}
        >
          <h2 style={{ color: "#ef6c00", marginTop: 0 }}>
            🎯 Supported Crops & Diseases
          </h2>
          <div
            style={{ textAlign: "left", color: "#e65100", fontSize: "0.95rem" }}
          >
            <p style={{ marginBottom: "1rem" }}>
              <strong>🌾 Upload Plant Leaf Images From:</strong>
            </p>
            <p>
              ✓ Corn (Maize) • ✓ Tomato • ✓ Pepper • ✓ Squash • ✓ Strawberry
            </p>

            <p style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
              <strong>🔬 Detectable Diseases:</strong>
            </p>
            <p>
              <strong>Corn:</strong> Healthy, Northern Leaf Blight, Cercospora
              Leaf Spot, Gray Leaf Spot
            </p>
            <p>
              <strong>Tomato:</strong> Late Blight
            </p>
            <p>
              <strong>Squash:</strong> Powdery Mildew
            </p>
            <p>
              <strong>Pepper & Strawberry:</strong> Various diseases
            </p>
          </div>
        </div>

        <div
          style={{
            background: "#f3e5f5",
            padding: "2rem",
            borderRadius: "12px",
            borderLeft: "4px solid #7b1fa2",
          }}
        >
          <h2 style={{ color: "#7b1fa2", marginTop: 0 }}>
            💡 Tips for Best Results
          </h2>
          <div
            style={{ textAlign: "left", color: "#4a148c", fontSize: "0.95rem" }}
          >
            <p>• Take clear, well-lit photos without shadows</p>
            <p>• Ensure the leaf covers most of the image</p>
            <p>• Include both healthy and affected areas if possible</p>
            <p>• Use consistent, natural lighting</p>
            <p>• Avoid using filters or image editing</p>
            <p>• For best accuracy, capture multiple angles</p>
          </div>
        </div>
      </div>
    </div>
  );
}

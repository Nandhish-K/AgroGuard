export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
      color: "white",
      padding: "2.5rem 0",
      marginTop: "3rem",
      textAlign: "center"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1.5rem"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <p style={{ margin: 0, fontSize: "1.1rem" }}>
            © 2025 Plant Disease Detection | All rights reserved
          </p>
          
          <div style={{ display: "flex", gap: "1.2rem" }}>
            <a href="#" style={{
              color: "white",
              fontSize: "1.3rem",
              transition: "all 0.3s ease"
            }} onMouseEnter={(e) => e.target.style.color = "#c6ff00"}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" style={{
              color: "white",
              fontSize: "1.3rem",
              transition: "all 0.3s ease"
            }} onMouseEnter={(e) => e.target.style.color = "#c6ff00"}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" style={{
              color: "white",
              fontSize: "1.3rem",
              transition: "all 0.3s ease"
            }} onMouseEnter={(e) => e.target.style.color = "#c6ff00"}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" style={{
              color: "white",
              fontSize: "1.3rem",
              transition: "all 0.3s ease"
            }} onMouseEnter={(e) => e.target.style.color = "#c6ff00"}>
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        
        <p style={{ 
          margin: "1.5rem 0 0 0", 
          fontSize: "0.9rem",
          color: "rgba(255, 255, 255, 0.7)"
        }}>
          Made  <i className="fas fa-heart" style={{ color: "#ff5252" }}></i> for farmers and plant enthusiasts
        </p>
      </div>
    </footer>
  );
}

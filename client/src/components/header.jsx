import { useState } from "react";
import { Link } from "react-router-dom";

// Enhanced Header Component
export default function Header() {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding:"5px",


        position: "sticky",
        top: 0,
        zIndex: 100,

        width: "1300px", 
        left: 0,
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <i
            className="fas fa-leaf"
            style={{
              fontSize: "1.8rem",
              marginRight: "0.5rem",
              color: "#161909ff",
            }}
          ></i>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              background: "linear-gradient(45deg, #ffff00, #d6f2f3ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Plant Disease Detection
          </h1>
        </div>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          <li>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.15)";
                e.target.style.color = "#c6ff00";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "white";
              }}
            >
              <i className="fas fa-home" style={{ marginRight: "0.5rem" }}></i>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.15)";
                e.target.style.color = "#c6ff00";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "white";
              }}
            >
              <i
                className="fas fa-info-circle"
                style={{ marginRight: "0.5rem" }}
              ></i>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

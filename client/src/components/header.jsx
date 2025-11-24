import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Enhanced Header Component
export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "5px",
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
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            alignItems: "center",
          }}
        >
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

          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/detect"
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
                    className="fas fa-search"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Detect
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "500",
                    padding: "0.5rem 1rem",
                    borderRadius: "50px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.15)";
                    e.currentTarget.style.color = "#c6ff00";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  {user?.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.full_name || user.email}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        border: "2px solid white",
                      }}
                    />
                  ) : (
                    <i
                      className="fas fa-user-circle"
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                  )}
                  <span style={{ fontSize: "0.9rem" }}>
                    {user?.full_name || user?.username || "Profile"}
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "50px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  }}
                >
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
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
                    className="fas fa-sign-in-alt"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "500",
                    padding: "0.5rem 1rem",
                    borderRadius: "50px",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  }}
                >
                  <i
                    className="fas fa-user-plus"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

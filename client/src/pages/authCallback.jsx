import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      // Handle OAuth error
      console.error("OAuth error:", error);
      navigate("/login?error=" + error);
      return;
    }

    if (token) {
      const success = setAuthToken(token);
      if (success) {
        navigate("/");
      } else {
        navigate("/login?error=invalid_token");
      }
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, setAuthToken]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div className="loading-spinner"></div>
      <p>Completing authentication...</p>
    </div>
  );
}

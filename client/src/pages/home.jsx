import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Loading from "../components/loading";
import ImageUpload from "../components/ImageUpload";
import Results from "../components/Results";





export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setResult(null);

    // Mock API call (replace with backend later)
    setTimeout(() => {
      setResult({
        disease: "Tomato Early Blight",
        confidence: 92,
        treatment: "Apply copper-based fungicides every 7-10 days. Remove infected leaves and avoid overhead watering. Ensure proper spacing between plants for air circulation."
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <div style={{
      maxWidth: "100%",
      margin: "0 auto",
      padding: "2rem 1.5rem"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "2.5rem"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2e7d32",
          margin: "0 0 1rem 0"
        }}>Protect Your Plants</h1>
        <p style={{
          fontSize: "1.2rem",
          color: "#4e4e4e",
          margin: 0
        }}>Upload an image of a plant leaf to detect diseases and get treatment recommendations</p>
      </div>
      
      <ImageUpload onUpload={handleUpload} />
      {loading && <Loading />}
      <Results result={result} />
    </div>
  );
}
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🌿 Welcome to AgroGuard</h1>
          <h2 className="hero-subtitle">
            AI-Powered Plant Disease Detection Platform
          </h2>
          <p className="hero-description">
            Protect your crops with cutting-edge artificial intelligence. Upload
            a leaf image and get instant disease diagnosis with treatment
            recommendations.
          </p>

          {!user ? (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Get Started - Sign Up
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Already have an account? Login
              </Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/detect" className="btn btn-primary">
                Start Disease Detection
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose AgroGuard?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3>Advanced AI Technology</h3>
            <p>
              Powered by VGG16 deep learning model trained on thousands of plant
              disease images with 95% accuracy
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>
              Get disease diagnosis within seconds of uploading a leaf image -
              no waiting for expert consultation
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3>Smart Recommendations</h3>
            <p>
              Receive AI-powered treatment suggestions and preventive measures
              using Google Gemini technology
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Your History</h3>
            <p>
              Monitor all your disease detections over time and identify
              patterns in your crop health
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>38+ Disease Detection</h3>
            <p>
              Identify a wide range of plant diseases across multiple crop types
              including tomato, potato, corn, and more
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Your data is encrypted and protected with JWT authentication -
              your privacy is our priority
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>
              Sign up for free using email or social accounts (Google/Facebook)
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Upload Image</h3>
            <p>Take a clear photo of the affected plant leaf and upload it</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Results</h3>
            <p>Receive instant diagnosis with treatment recommendations</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Take Action</h3>
            <p>Follow the recommended treatments and save your crops</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-box">
          <div className="stat-number">38+</div>
          <div className="stat-label">Plant Diseases</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">95%</div>
          <div className="stat-label">Accuracy Rate</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">&lt;5s</div>
          <div className="stat-label">Detection Time</div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-content">
          <h2 className="section-title">About AgroGuard</h2>
          <div className="about-text">
            <p>
              <strong>AgroGuard</strong> is an innovative agricultural
              technology platform that leverages artificial intelligence to help
              farmers and gardeners protect their crops from diseases. Our
              mission is to make advanced plant disease detection accessible to
              everyone, reducing crop losses and promoting sustainable
              agriculture.
            </p>

            <h3>Our Technology</h3>
            <p>
              We use a state-of-the-art VGG16 convolutional neural network
              trained on a comprehensive dataset of plant disease images.
              Combined with Google Gemini AI for intelligent recommendations,
              AgroGuard provides accurate diagnosis and actionable treatment
              plans.
            </p>

            <h3>Benefits for Farmers</h3>
            <ul>
              <li>✅ Early disease detection prevents crop loss</li>
              <li>
                ✅ Reduce unnecessary pesticide usage with targeted treatment
              </li>
              <li>✅ Save time and money on expert consultations</li>
              <li>✅ Make data-driven decisions about crop management</li>
              <li>✅ Access expert-level diagnosis from anywhere, anytime</li>
            </ul>

            <h3>Supported Crops & Diseases</h3>
            <p>
              AgroGuard can detect diseases in tomatoes, potatoes, peppers,
              corn, grapes, apples, and many other crops. Our system identifies
              fungal infections, bacterial diseases, viral conditions, and
              nutrient deficiencies with high precision.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="cta-section">
          <h2>Ready to Protect Your Crops?</h2>
          <p>
            Join thousands of farmers using AI to detect plant diseases early
          </p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Sign In
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

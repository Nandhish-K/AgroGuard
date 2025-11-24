"""
AgroGuard Backend - Plant Disease Detection System
Deep Learning model for real-time crop disease detection
Supports both VGG16 model inference and demo mode
With JWT authentication and OAuth support
"""

import os
import json
import base64
import io
import random
import logging
from datetime import datetime
from flask import Flask, request, jsonify, redirect, url_for, session
from flask_cors import CORS
from PIL import Image
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import authentication modules
from models import db, User, DetectionHistory, init_db
from auth_utils import generate_token, token_required, optional_token, validate_email, validate_password
from oauth_config import init_oauth, get_google_user_info, get_facebook_user_info

# Optional PyTorch imports - graceful fallback to demo mode
try:
    import torch
    import torch.nn as nn
    from torchvision import transforms, models
    import numpy as np
    PYTORCH_AVAILABLE = True
except ImportError:
    PYTORCH_AVAILABLE = False
    print("⚠️  PyTorch not available - running in demo mode")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///agroguard.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS configuration - allow credentials for OAuth
CORS(app, supports_credentials=True, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize database
init_db(app)

# Initialize OAuth
oauth = init_oauth(app)

# AI Integration - Google Gemini (Optional)
ai_enabled = False
try:
    import google.generativeai as genai
    api_key = os.getenv('GOOGLE_API_KEY')
    if api_key:
        genai.configure(api_key=api_key)
        ai_enabled = True
        logger.info("✅ Google Gemini AI enabled for enhanced recommendations")
    else:
        logger.info("⚠️  GOOGLE_API_KEY not set - using database recommendations")
except ImportError:
    logger.info("⚠️  Google Gemini not installed - using database recommendations")

# Disease database with treatment recommendations
DISEASE_DATABASE = {
    "Tomato_Early_Blight": {
        "display_name": "Tomato Early Blight",
        "description": "Fungal disease caused by Alternaria solani",
        "severity": "High",
        "treatments": [
            "Apply copper-based fungicides (Bordeaux mixture) every 7-10 days",
            "Remove infected leaves and destroy them",
            "Avoid overhead watering; use drip irrigation",
            "Ensure proper spacing between plants for air circulation",
            "Apply mulch to prevent soil splash",
            "Use disease-resistant tomato varieties"
        ],
        "prevention": [
            "Rotate crops yearly",
            "Remove plant debris from field",
            "Maintain adequate plant spacing",
            "Use treated seeds",
            "Monitor plants regularly"
        ],
        "affected_crops": ["Tomato"]
    },
    "Tomato_Late_Blight": {
        "display_name": "Tomato Late Blight",
        "description": "Oomycete pathogen causing rapid leaf and fruit damage",
        "severity": "Critical",
        "treatments": [
            "Apply mancozeb or chlorothalonil fungicides",
            "Use metalaxyl for systemic protection",
            "Remove and destroy infected plant parts",
            "Improve air circulation and reduce humidity",
            "Apply fungicides preventively during humid conditions",
            "Use resistant varieties when available"
        ],
        "prevention": [
            "Use certified disease-free seeds and tubers",
            "Monitor weather conditions for infection risk",
            "Maintain proper plant spacing",
            "Avoid wetting foliage during irrigation",
            "Remove volunteer plants"
        ],
        "affected_crops": ["Tomato", "Potato"]
    },
    "Tomato_Bacterial_Spot": {
        "display_name": "Tomato Bacterial Spot",
        "description": "Bacterial infection affecting leaves and fruits",
        "severity": "High",
        "treatments": [
            "Apply copper-containing bactericides",
            "Remove infected plant parts immediately",
            "Use streptomycin + tetracycline combination",
            "Disinfect tools between plants",
            "Improve drainage and reduce humidity"
        ],
        "prevention": [
            "Use disease-resistant varieties",
            "Use certified disease-free seeds",
            "Implement crop rotation (3 years)",
            "Control weeds and volunteer plants",
            "Avoid working in wet field"
        ],
        "affected_crops": ["Tomato", "Pepper"]
    },
    "Tomato_Spider_Mites": {
        "display_name": "Tomato Spider Mites",
        "description": "Pest causing yellowing and webbing on leaves",
        "severity": "Medium",
        "treatments": [
            "Apply sulfur-based pesticides",
            "Use neem oil spray",
            "Increase humidity to suppress mites",
            "Apply miticide like dicofol",
            "Remove heavily infested leaves"
        ],
        "prevention": [
            "Maintain adequate humidity (60-80%)",
            "Avoid excessive nitrogen fertilization",
            "Remove plant debris",
            "Use predatory mites",
            "Monitor plants regularly"
        ],
        "affected_crops": ["Tomato", "Pepper", "Cucumber"]
    },
    "Potato_Early_Blight": {
        "display_name": "Potato Early Blight",
        "description": "Fungal disease affecting potato foliage",
        "severity": "High",
        "treatments": [
            "Apply mancozeb or chlorothalonil",
            "Use copper fungicides",
            "Remove infected leaves",
            "Improve air circulation",
            "Apply lime sulfur spray"
        ],
        "prevention": [
            "Use certified disease-free seed potatoes",
            "Rotate crops yearly",
            "Remove volunteer plants",
            "Maintain proper plant spacing",
            "Avoid overhead irrigation"
        ],
        "affected_crops": ["Potato"]
    },
    "Corn_Gray_Leaf_Spot": {
        "display_name": "Corn Gray Leaf Spot",
        "description": "Fungal disease affecting corn leaves",
        "severity": "High",
        "treatments": [
            "Apply propiconazole or trifloxystrobin",
            "Use resistant hybrid varieties",
            "Remove crop residue",
            "Improve drainage",
            "Apply fungicides at V4-V6 stage"
        ],
        "prevention": [
            "Rotate with non-host crops",
            "Use resistant varieties",
            "Remove corn debris",
            "Control grassy weeds",
            "Maintain plant health"
        ],
        "affected_crops": ["Corn"]
    },
    "Corn_Common_Rust": {
        "display_name": "Corn Common Rust",
        "description": "Fungal rust disease on corn leaves",
        "severity": "Medium",
        "treatments": [
            "Apply azoxystrobin or propiconazole",
            "Use resistant varieties",
            "Monitor weather conditions",
            "Apply preventive fungicides"
        ],
        "prevention": [
            "Plant resistant hybrids",
            "Control volunteer corn",
            "Remove alternate hosts",
            "Maintain good sanitation"
        ],
        "affected_crops": ["Corn"]
    },
    "Apple_Scab": {
        "display_name": "Apple Scab",
        "description": "Fungal disease causing lesions on apples",
        "severity": "High",
        "treatments": [
            "Apply dodine or captan fungicides",
            "Use lime sulfur spray",
            "Remove infected fruits and leaves",
            "Improve air circulation",
            "Apply fungicides during wet periods"
        ],
        "prevention": [
            "Use resistant varieties",
            "Remove fallen leaves",
            "Prune to improve air flow",
            "Use disease-free scions",
            "Monitor weather and apply preventively"
        ],
        "affected_crops": ["Apple"]
    }
}

# Total: 8 disease classes matching the VGG16 model output

# VGG16 Model Class (only if PyTorch is available)
if PYTORCH_AVAILABLE:
    class DiseaseDetectionModel(nn.Module):
        """VGG16 model for disease detection with multi-task learning"""
        def __init__(self, num_classes=8, num_severity_classes=3):
            super(DiseaseDetectionModel, self).__init__()
            # Load pre-trained VGG16 and use its features
            vgg = models.vgg16(weights=models.VGG16_Weights.DEFAULT)
            self.features = vgg.features
            
            # Custom classifiers for disease and severity (matching saved model structure)
            # Disease classifier: 25088 (512*7*7) -> 1024 -> 8 classes
            self.classifier_disease = nn.Sequential(
                nn.Linear(512 * 7 * 7, 1024),
                nn.ReLU(True),
                nn.Dropout(),
                nn.Linear(1024, num_classes)
            )
            
            # Severity classifier: 25088 (512*7*7) -> 512 -> 3 classes
            self.classifier_severity = nn.Sequential(
                nn.Linear(512 * 7 * 7, 512),
                nn.ReLU(True),
                nn.Dropout(),
                nn.Linear(512, num_severity_classes)
            )
        
        def forward(self, x):
            x = self.features(x)
            x = x.view(x.size(0), -1)
            disease_out = self.classifier_disease(x)
            # Return only disease prediction for compatibility
            return disease_out

class DiseaseDetector:
    """Main disease detection class - supports both model inference and demo mode"""
    def __init__(self, model_path='plantDisease-vgg16-best.pth', use_model=True):
        self.use_model = use_model and PYTORCH_AVAILABLE
        self.model = None
        self.disease_classes = list(DISEASE_DATABASE.keys())
        self.num_classes = len(DISEASE_DATABASE)
        
        if self.use_model:
            try:
                self.device = torch.device('cpu')  # Use CPU for compatibility
                self.model = DiseaseDetectionModel(num_classes=self.num_classes)
                
                # Try to load the model file
                if os.path.exists(model_path):
                    checkpoint = torch.load(model_path, map_location=self.device)
                    if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
                        self.model.load_state_dict(checkpoint['model_state_dict'])
                    else:
                        self.model.load_state_dict(checkpoint)
                    self.model.eval()
                    logger.info(f"✅ VGG16 model loaded successfully from {model_path}")
                    
                    # Image preprocessing
                    self.transform = transforms.Compose([
                        transforms.Resize((224, 224)),
                        transforms.ToTensor(),
                        transforms.Normalize(
                            mean=[0.485, 0.456, 0.406],
                            std=[0.229, 0.224, 0.225]
                        )
                    ])
                else:
                    logger.warning(f"Model file {model_path} not found. Running in demo mode.")
                    self.model = None
                    self.use_model = False
            except Exception as e:
                logger.warning(f"Could not load model: {e}. Running in demo mode.")
                self.model = None
                self.use_model = False
        
        if not self.use_model:
            logger.info(f"🎭 Demo mode activated - {len(self.disease_classes)} diseases available")
    
    def predict(self, image_data):
        """
        Predict disease from image data - supports both model inference and demo mode
        Args:
            image_data: base64 encoded string or PIL Image
        Returns:
            dict with disease, confidence, and recommendations
        """
        try:
            # Handle base64 encoded image
            if isinstance(image_data, str):
                image_bytes = base64.b64decode(image_data.split(',')[1] if ',' in image_data else image_data)
                image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            else:
                image = image_data.convert('RGB')
            
            logger.info(f"Image received: {image.size}, format: {image.format}")
            
            # Model inference or demo mode
            if self.use_model and self.model is not None:
                # Real VGG16 model prediction
                image_tensor = self.transform(image).unsqueeze(0).to(self.device)
                
                with torch.no_grad():
                    outputs = self.model(image_tensor)
                    probabilities = torch.nn.functional.softmax(outputs, dim=1)
                    confidence, predicted_idx = torch.max(probabilities, 1)
                    disease_idx = predicted_idx.item()
                    confidence = confidence.item() * 100
                
                logger.info(f"Model prediction: {self.disease_classes[disease_idx]} ({confidence:.2f}%)")
            else:
                # Demo mode - random prediction for testing
                disease_idx = random.randint(0, len(self.disease_classes) - 1)
                confidence = random.randint(75, 95)
                logger.info(f"Demo prediction: {self.disease_classes[disease_idx]} ({confidence}%)")
            
            disease_key = self.disease_classes[disease_idx]
            disease_info = DISEASE_DATABASE[disease_key]
            
            return {
                "success": True,
                "disease": disease_info["display_name"],
                "disease_key": disease_key,
                "confidence": round(confidence, 2),
                "severity": disease_info["severity"],
                "description": disease_info["description"],
                "treatments": disease_info["treatments"],
                "prevention": disease_info["prevention"],
                "affected_crops": disease_info["affected_crops"],
                "timestamp": datetime.now().isoformat(),
                "mode": "model" if (self.use_model and self.model is not None) else "demo"
            }
        
        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            return {
                "success": False,
                "error": f"Error during prediction: {str(e)}"
            }

# AI Recommendation Function (Optional Enhancement)
def get_ai_recommendations(disease_name, crop_type, confidence):
    """Generate AI-powered recommendations using Google Gemini"""
    if not ai_enabled:
        return None
    
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""You are an expert agricultural disease specialist.
A farmer has detected {disease_name} on their {crop_type} plant with {confidence}% confidence.

Provide specific, actionable recommendations in JSON format ONLY:
{{
    "immediate_actions": [
        "Action 1: [Specific immediate step]",
        "Action 2: [Another immediate step]",
        "Action 3: [Another step]"
    ],
    "treatments": [
        "Treatment 1: [Specific treatment with timing]",
        "Treatment 2: [Another treatment]",
        "Treatment 3: [Additional treatment]"
    ],
    "prevention": [
        "Prevention 1: [Specific prevention strategy]",
        "Prevention 2: [Another strategy]",
        "Prevention 3: [Long-term prevention]"
    ],
    "monitoring": [
        "What to watch for",
        "When to take action",
        "Signs of improvement"
    ]
}}

Focus on practical, accessible solutions for farmers. Be concise and specific."""
        
        response = model.generate_content(prompt)
        ai_recommendations = json.loads(response.text.strip())
        logger.info("✅ AI recommendations generated successfully")
        return ai_recommendations
        
    except Exception as e:
        logger.error(f"AI recommendation error: {str(e)}")
        return None

# Initialize detector
try:
    detector = DiseaseDetector('plantDisease-vgg16-best.pth')
    logger.info("✅ Disease detector initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize detector: {e}")
    detector = None

# ============================================
# AUTHENTICATION ENDPOINTS
# ============================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register new user with email and password"""
    try:
        data = request.json
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        # Validate email format
        if not validate_email(email):
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
        
        # Validate password strength
        valid, message = validate_password(password)
        if not valid:
            return jsonify({'success': False, 'message': message}), 400
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'success': False, 'message': 'Email already registered'}), 409
        
        # Create new user
        user = User(
            email=email,
            username=data.get('username', email.split('@')[0]),
            full_name=data.get('full_name'),
            provider='email',
            is_verified=False
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Generate JWT token
        token = generate_token(user.id, user.email)
        
        logger.info(f"New user registered: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'token': token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Registration error: {str(e)}")
        return jsonify({'success': False, 'message': 'Registration failed', 'error': str(e)}), 500


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login with email and password"""
    try:
        data = request.json
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        # Find user by email
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
        
        # Verify password
        if not user.check_password(password):
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
        
        # Check if account is active
        if not user.is_active:
            return jsonify({'success': False, 'message': 'Account is disabled'}), 403
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Generate JWT token
        token = generate_token(user.id, user.email)
        
        logger.info(f"User logged in: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'success': False, 'message': 'Login failed', 'error': str(e)}), 500


@app.route('/api/auth/google')
def google_login():
    """Initiate Google OAuth flow"""
    try:
        redirect_uri = url_for('google_callback', _external=True)
        return oauth.google.authorize_redirect(redirect_uri)
    except Exception as e:
        logger.error(f"Google OAuth initiation error: {str(e)}")
        return jsonify({'success': False, 'message': 'Google login failed'}), 500


@app.route('/api/auth/google/callback')
def google_callback():
    """Google OAuth callback"""
    try:
        token = oauth.google.authorize_access_token()
        user_info = get_google_user_info(token['access_token'])
        
        if not user_info:
            return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/login?error=google_auth_failed")
        
        email = user_info.get('email')
        google_id = user_info.get('id')
        name = user_info.get('name')
        picture = user_info.get('picture')
        
        # Find or create user
        user = User.query.filter_by(email=email).first()
        
        if not user:
            # Create new user
            user = User(
                email=email,
                username=email.split('@')[0],
                full_name=name,
                profile_picture=picture,
                provider='google',
                provider_id=google_id,
                is_verified=True
            )
            db.session.add(user)
        else:
            # Update existing user
            if not user.provider:
                user.provider = 'google'
                user.provider_id = google_id
            user.last_login = datetime.utcnow()
        
        db.session.commit()
        
        # Generate JWT token
        jwt_token = generate_token(user.id, user.email)
        
        logger.info(f"User logged in with Google: {email}")
        
        # Redirect to frontend with token
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/auth/callback?token={jwt_token}")
        
    except Exception as e:
        logger.error(f"Google callback error: {str(e)}")
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/login?error=google_auth_failed")


@app.route('/api/auth/facebook')
def facebook_login():
    """Initiate Facebook OAuth flow"""
    try:
        redirect_uri = url_for('facebook_callback', _external=True)
        return oauth.facebook.authorize_redirect(redirect_uri)
    except Exception as e:
        logger.error(f"Facebook OAuth initiation error: {str(e)}")
        return jsonify({'success': False, 'message': 'Facebook login failed'}), 500


@app.route('/api/auth/facebook/callback')
def facebook_callback():
    """Facebook OAuth callback"""
    try:
        token = oauth.facebook.authorize_access_token()
        user_info = get_facebook_user_info(token['access_token'])
        
        if not user_info:
            return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/login?error=facebook_auth_failed")
        
        email = user_info.get('email')
        facebook_id = user_info.get('id')
        name = user_info.get('name')
        picture = user_info.get('picture', {}).get('data', {}).get('url')
        
        if not email:
            return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/login?error=no_email")
        
        # Find or create user
        user = User.query.filter_by(email=email).first()
        
        if not user:
            # Create new user
            user = User(
                email=email,
                username=email.split('@')[0],
                full_name=name,
                profile_picture=picture,
                provider='facebook',
                provider_id=facebook_id,
                is_verified=True
            )
            db.session.add(user)
        else:
            # Update existing user
            if not user.provider:
                user.provider = 'facebook'
                user.provider_id = facebook_id
            user.last_login = datetime.utcnow()
        
        db.session.commit()
        
        # Generate JWT token
        jwt_token = generate_token(user.id, user.email)
        
        logger.info(f"User logged in with Facebook: {email}")
        
        # Redirect to frontend with token
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/auth/callback?token={jwt_token}")
        
    except Exception as e:
        logger.error(f"Facebook callback error: {str(e)}")
        return redirect(f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/login?error=facebook_auth_failed")


@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_current_user(user):
    """Get current authenticated user info"""
    return jsonify({
        'success': True,
        'user': user.to_dict()
    }), 200


@app.route('/api/auth/logout', methods=['POST'])
@token_required
def logout(user):
    """Logout (client-side token removal)"""
    logger.info(f"User logged out: {user.email}")
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200


@app.route('/api/auth/profile', methods=['PUT'])
@token_required
def update_profile(user):
    """Update user profile information"""
    try:
        # Handle multipart/form-data for file upload
        full_name = request.form.get('full_name')
        username = request.form.get('username')
        bio = request.form.get('bio')
        location = request.form.get('location')
        phone = request.form.get('phone')
        
        # Update fields if provided
        if full_name:
            user.full_name = full_name
        
        if username:
            # Check if username is already taken by another user
            existing_user = User.query.filter(User.username == username, User.id != user.id).first()
            if existing_user:
                return jsonify({
                    'success': False,
                    'message': 'Username already taken'
                }), 400
            user.username = username
        
        if bio is not None:  # Allow empty string
            user.bio = bio
        
        if location is not None:
            user.location = location
        
        if phone is not None:
            user.phone = phone
        
        # Handle profile picture upload
        if 'profile_picture' in request.files:
            file = request.files['profile_picture']
            if file and file.filename:
                # Save file as base64 (or you can save to disk/cloud storage)
                import base64
                file_data = file.read()
                base64_image = f"data:{file.content_type};base64," + base64.b64encode(file_data).decode('utf-8')
                user.profile_picture = base64_image
        
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        logger.info(f"Profile updated for user: {user.email}")
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f"Error updating profile: {str(e)}")
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Failed to update profile'
        }), 500


@app.route('/api/auth/change-password', methods=['POST'])
@token_required
def change_password(user):
    """Change user password"""
    try:
        data = request.json
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        
        if not current_password or not new_password:
            return jsonify({
                'success': False,
                'message': 'Current and new password are required'
            }), 400
        
        # Check if user has a password (OAuth users might not)
        if not user.password_hash:
            return jsonify({
                'success': False,
                'message': 'Cannot change password for OAuth accounts'
            }), 400
        
        # Verify current password
        if not user.check_password(current_password):
            return jsonify({
                'success': False,
                'message': 'Current password is incorrect'
            }), 400
        
        # Validate new password
        is_valid, validation_message = validate_password(new_password)
        if not is_valid:
            return jsonify({
                'success': False,
                'message': validation_message
            }), 400
        
        # Set new password
        user.set_password(new_password)
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        logger.info(f"Password changed for user: {user.email}")
        return jsonify({
            'success': True,
            'message': 'Password changed successfully'
        }), 200
        
    except Exception as e:
        logger.error(f"Error changing password: {str(e)}")
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Failed to change password'
        }), 500


# ============================================
# DISEASE DETECTION ENDPOINTS
# ============================================

@app.route('/api/predict', methods=['POST'])
@optional_token
def predict(user):
    """
    API endpoint for disease prediction
    Expects JSON with 'image' field containing base64 encoded image
    Optional: 'use_ai' field to request AI-enhanced recommendations
    Works for both authenticated and guest users
    """
    try:
        if detector is None:
            return jsonify({
                "success": False,
                "error": "Detector not initialized"
            }), 500
        
        data = request.json
        if 'image' not in data:
            return jsonify({
                "success": False,
                "error": "No image provided"
            }), 400
        
        # Get prediction from model or demo mode
        result = detector.predict(data['image'])
        
        # Save to history if user is authenticated
        if user and result.get('success'):
            try:
                history = DetectionHistory(
                    user_id=user.id,
                    disease=result['disease'],
                    confidence=result['confidence'],
                    severity=result.get('severity'),
                    latitude=data.get('latitude'),
                    longitude=data.get('longitude'),
                    location_name=data.get('location')
                )
                db.session.add(history)
                db.session.commit()
                result['saved_to_history'] = True
            except Exception as e:
                logger.error(f"Error saving to history: {str(e)}")
                result['saved_to_history'] = False
        
        # Optionally add AI-enhanced recommendations
        if result.get('success') and data.get('use_ai', False) and ai_enabled:
            ai_recs = get_ai_recommendations(
                result['disease'],
                result.get('affected_crops', ['Unknown'])[0],
                result['confidence']
            )
            if ai_recs:
                result['ai_recommendations'] = ai_recs
        
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Prediction endpoint error: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    """Get list of all recognizable diseases"""
    try:
        diseases = []
        for key, info in DISEASE_DATABASE.items():
            diseases.append({
                "id": key,
                "name": info["display_name"],
                "severity": info["severity"],
                "description": info["description"]
            })
        return jsonify({
            "success": True,
            "diseases": diseases
        })
    except Exception as e:
        logger.error(f"Get diseases error: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/disease/<disease_key>', methods=['GET'])
def get_disease_info(disease_key):
    """Get detailed information about a specific disease"""
    try:
        if disease_key not in DISEASE_DATABASE:
            return jsonify({
                "success": False,
                "error": f"Disease '{disease_key}' not found"
            }), 404
        
        info = DISEASE_DATABASE[disease_key]
        return jsonify({
            "success": True,
            "disease": info["display_name"],
            "description": info["description"],
            "severity": info["severity"],
            "treatments": info["treatments"],
            "prevention": info["prevention"],
            "affected_crops": info["affected_crops"]
        })
    except Exception as e:
        logger.error(f"Get disease info error: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/history', methods=['GET'])
@token_required
def get_history(user):
    """Get detection history for authenticated user"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        history_query = DetectionHistory.query.filter_by(user_id=user.id).order_by(DetectionHistory.detected_at.desc())
        paginated = history_query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'success': True,
            'history': [item.to_dict() for item in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        logger.error(f"Get history error: {str(e)}")
        return jsonify({'success': False, 'message': 'Failed to retrieve history', 'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint with detailed status"""
    mode = "unknown"
    if detector:
        mode = "model" if (detector.use_model and detector.model is not None) else "demo"
    
    return jsonify({
        "status": "healthy",
        "detector_initialized": detector is not None,
        "mode": mode,
        "pytorch_available": PYTORCH_AVAILABLE,
        "ai_enabled": ai_enabled,
        "auth_enabled": True,
        "diseases_count": len(DISEASE_DATABASE),
        "timestamp": datetime.now().isoformat()
    })

@app.route('/', methods=['GET'])
def index():
    """Root endpoint with API documentation"""
    mode = "unknown"
    if detector:
        mode = "model" if (detector.use_model and detector.model is not None) else "demo"
    
    return jsonify({
        "name": "AgroGuard - Plant Disease Detection API",
        "version": "2.0.0",
        "description": "VGG16-based deep learning system for real-time crop disease detection",
        "model": "VGG16 with multi-task learning (8 disease classes)",
        "mode": mode,
        "features": [
            "Real-time disease detection",
            "8 crop diseases supported",
            "Confidence scores",
            "Treatment recommendations",
            "Prevention strategies",
            "Optional AI-enhanced recommendations (Google Gemini)"
        ],
        "endpoints": {
            "POST /api/predict": "Predict disease from base64 image (optional: use_ai=true)",
            "GET /api/diseases": "Get list of all recognizable diseases",
            "GET /api/disease/<disease_key>": "Get detailed disease information",
            "GET /api/health": "Health check with system status"
        }
    })

if __name__ == '__main__':
    # Use debug=False in production or set via environment variable
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.getenv('FLASK_PORT', 5000))
    app.run(debug=debug_mode, host='0.0.0.0', port=port, use_reloader=False)

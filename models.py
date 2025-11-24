"""
Database models for AgroGuard application
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import bcrypt

db = SQLAlchemy()

class User(db.Model):
    """User model for authentication"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    username = db.Column(db.String(80), unique=True, nullable=True)
    password_hash = db.Column(db.String(255), nullable=True)  # Nullable for OAuth users
    
    # OAuth fields
    provider = db.Column(db.String(20), nullable=True)  # 'google', 'facebook', 'email'
    provider_id = db.Column(db.String(255), nullable=True)  # OAuth provider user ID
    
    # Profile information
    full_name = db.Column(db.String(100), nullable=True)
    profile_picture = db.Column(db.String(500), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    
    # Account status
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    detection_history = db.relationship('DetectionHistory', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        """Verify password"""
        if not self.password_hash:
            return False
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'full_name': self.full_name,
            'profile_picture': self.profile_picture,
            'bio': self.bio,
            'location': self.location,
            'phone': self.phone,
            'provider': self.provider,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }


class DetectionHistory(db.Model):
    """Store disease detection history for users"""
    __tablename__ = 'detection_history'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Detection results
    disease = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    severity = db.Column(db.String(20), nullable=True)
    
    # Image information
    image_path = db.Column(db.String(500), nullable=True)  # Optional: store image path
    
    # Location data (optional)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    location_name = db.Column(db.String(200), nullable=True)
    
    # Timestamp
    detected_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert detection history to dictionary"""
        return {
            'id': self.id,
            'disease': self.disease,
            'confidence': self.confidence,
            'severity': self.severity,
            'location': {
                'latitude': self.latitude,
                'longitude': self.longitude,
                'name': self.location_name
            } if self.latitude and self.longitude else None,
            'detected_at': self.detected_at.isoformat() if self.detected_at else None
        }


def init_db(app):
    """Initialize database"""
    db.init_app(app)
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully")

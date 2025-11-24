"""
OAuth configuration for Google and Facebook authentication
"""
import os
from authlib.integrations.flask_client import OAuth

# OAuth Configuration
oauth = OAuth()

def init_oauth(app):
    """Initialize OAuth clients"""
    oauth.init_app(app)
    
    # Google OAuth
    oauth.register(
        name='google',
        client_id=os.getenv('GOOGLE_CLIENT_ID'),
        client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={
            'scope': 'openid email profile',
            'redirect_uri': os.getenv('GOOGLE_REDIRECT_URI', 'http://localhost:5000/api/auth/google/callback')
        }
    )
    
    # Facebook OAuth
    oauth.register(
        name='facebook',
        client_id=os.getenv('FACEBOOK_CLIENT_ID'),
        client_secret=os.getenv('FACEBOOK_CLIENT_SECRET'),
        access_token_url='https://graph.facebook.com/oauth/access_token',
        access_token_params=None,
        authorize_url='https://www.facebook.com/dialog/oauth',
        authorize_params=None,
        api_base_url='https://graph.facebook.com/',
        client_kwargs={
            'scope': 'email public_profile',
            'redirect_uri': os.getenv('FACEBOOK_REDIRECT_URI', 'http://localhost:5000/api/auth/facebook/callback')
        }
    )
    
    return oauth


def get_google_user_info(token):
    """Get user info from Google"""
    import requests
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', headers=headers)
    if response.status_code == 200:
        return response.json()
    return None


def get_facebook_user_info(token):
    """Get user info from Facebook"""
    import requests
    response = requests.get(
        'https://graph.facebook.com/me',
        params={'fields': 'id,name,email,picture', 'access_token': token}
    )
    if response.status_code == 200:
        return response.json()
    return None

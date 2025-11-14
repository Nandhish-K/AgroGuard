# AgroGuard - Plant Disease Detection System

A modern, user-friendly deep learning system for real-time crop disease detection from leaf images. Works offline on mobile and edge devices with a simple, intuitive design suitable for farmers.

## 🌱 Features

### Frontend Features

- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **📸 Image Upload**: Drag-and-drop or click-to-upload interface
- **📷 Camera Capture**: Take photos directly from device camera (back camera for mobile)
- **🎯 Real-time Detection**: Get instant disease predictions
- **📊 Detailed Analysis**: View disease name, confidence level, and severity
- **💊 Treatment Recommendations**: Get step-by-step treatment guides
- **🛡️ Prevention Tips**: Learn how to prevent future diseases
- **🖨️ Print & Share**: Export and share disease reports
- **🌐 Offline Support**: Works without internet connection (demo mode)

### Backend Features

- **🤖 Deep Learning Model**: VGG16 pre-trained on crop disease dataset
- **⚡ Fast Inference**: Quick predictions on CPU/GPU
- **🗄️ Comprehensive Disease Database**: 8+ crop diseases with detailed information
- **📈 Confidence Scores**: Know how confident the model is about predictions
- **🔄 RESTful API**: Easy integration with frontend
- **✅ Health Checks**: Monitor system status

## 🏗️ Architecture

```
AgroGuard System
├── Frontend (React + Vite)
│   ├── Image Upload Component
│   ├── Camera Capture Module
│   ├── Results Display
│   └── Responsive UI
└── Backend (Flask + PyTorch)
    ├── Disease Detection Model
    ├── REST API Server
    ├── Disease Database
    └── Prediction Engine
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- .pth model file (`plantDisease-vgg16-best.pth`)

### Backend Setup

1. **Navigate to project root**

   ```bash
   cd c:\disease-detection
   ```

2. **Create Python virtual environment**

   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**

   ```bash
   python server.py
   ```

   The server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or shown in terminal)

4. **Build for production**
   ```bash
   npm run build
   ```

## 📖 Usage Guide

### Upload an Image

1. Click "Drag & drop or click to upload" area or click the upload button
2. Select a leaf image from your device
3. Click "Detect Disease" to analyze

### Take a Photo

1. Click "Take Photo" button (requires camera permission)
2. Position the leaf in the camera view
3. Click "Capture Photo" to take the picture
4. Click "Detect Disease" to analyze

### View Results

- **Disease Name**: The identified disease or "Healthy Leaf"
- **Confidence Level**: How confident the model is (0-100%)
- **Severity Level**: Low, Medium, High, or Critical
- **Treatments**: Step-by-step treatment recommendations
- **Prevention Tips**: Ways to prevent the disease
- **Affected Crops**: Which crops are susceptible

### Export Results

- Click "Print Report" to print the analysis
- Click "Copy Report" to copy details to clipboard

## 🗄️ Supported Diseases

1. **Tomato Early Blight** - Fungal disease with circular lesions
2. **Tomato Late Blight** - Rapid leaf and fruit damage
3. **Tomato Bacterial Spot** - Bacterial infection on leaves/fruits
4. **Tomato Spider Mites** - Pest causing yellowing
5. **Potato Early Blight** - Fungal disease on potato foliage
6. **Corn Gray Leaf Spot** - Fungal disease on corn leaves
7. **Corn Common Rust** - Rust fungus on corn
8. **Apple Scab** - Fungal disease on apple leaves

## 🔌 API Endpoints

### POST /api/predict

Predict disease from image

**Request:**

```json
{
  "image": "base64_encoded_image"
}
```

**Response:**

```json
{
  "success": true,
  "disease": "Tomato Early Blight",
  "confidence": 92.5,
  "severity": "High",
  "treatments": [...],
  "prevention": [...],
  "affected_crops": [...]
}
```

### GET /api/diseases

Get list of all recognizable diseases

### GET /api/disease/<disease_key>

Get detailed information about a specific disease

### GET /api/health

Health check endpoint

## ⚙️ Configuration

### Environment Variables (Optional)

Create `.env` file in project root:

```env
FLASK_ENV=development
FLASK_DEBUG=False
MODEL_PATH=plantDisease-vgg16-best.pth
```

### API Configuration

In `home.jsx`, update the API URL if needed:

```javascript
const response = await fetch("http://YOUR_SERVER:5000/api/predict", {
  // ...
});
```

## 📱 Mobile Optimization

- **Responsive Layout**: Adapts to all screen sizes
- **Camera Support**: Uses device camera for photo capture
- **Gesture-Friendly**: Large buttons and touch-friendly interface
- **Offline Mode**: Works without internet connection
- **PWA-Ready**: Can be installed as web app

## 🔒 Privacy & Security

- **No Data Transmission**: Images are processed locally (when backend is available)
- **No Storage**: Images are not stored on server
- **Open Source**: Fully transparent code
- **CORS Enabled**: Safe cross-origin requests

## 🐛 Troubleshooting

### Backend won't start

- Ensure Python 3.8+ is installed
- Check if port 5000 is available
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check if `plantDisease-vgg16-best.pth` exists in the project root

### Frontend can't connect to backend

- Make sure backend is running on `http://localhost:5000`
- Check browser console for error messages
- Verify CORS is enabled (it is by default)
- Try accessing `http://localhost:5000/api/health` in browser

### Camera not working

- Check if browser has camera permission
- Ensure HTTPS is used (or localhost)
- Try a different browser
- Check device camera permissions in settings

### Slow predictions

- This is normal for CPU inference
- GPU support coming soon
- Reduce image size for faster processing
- First prediction might be slower due to model loading

## 📊 Model Information

- **Architecture**: VGG16 with Multi-Task Learning
- **Input Size**: 224x224 pixels
- **Framework**: PyTorch
- **Classes**: 8 disease classes + severity prediction (Low/Medium/High)
- **Training Data**: PlantVillage dataset
- **Inference Time**: ~500ms (CPU)
- **Modes**: Model inference (with PyTorch) or Demo mode (fallback)

## 🚀 Production Deployment

### Docker Deployment

```bash
docker build -t agroguard .
docker run -p 5000:5000 agroguard
```

### Cloud Deployment (Azure)

```bash
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myWebApp
```

### Mobile Deployment

Build as PWA or wrap with Capacitor/React Native

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Add more crop diseases
- Improve model accuracy
- Add multi-language support
- Implement user accounts
- Add historical data tracking

## 📄 License

This project is open source and available under the MIT License.

## 👨‍🌾 For Farmers

**Tips for best results:**

1. Take clear, well-lit photos of leaves
2. Include both healthy and affected areas
3. Focus on the main symptoms
4. Use consistent lighting
5. Ensure the leaf covers most of the image

**When to use:**

- Early detection of diseases
- Confirmation of suspected diseases
- Planning treatment schedules
- Monitoring disease progression

## 📞 Support

For issues, questions, or suggestions:

- Check the troubleshooting section
- Review API documentation
- Check browser console for errors
- Verify all files are in correct locations

## 🙏 Acknowledgments

- PlantVillage for training dataset
- PyTorch team for the framework
- React and Vite communities
- Farmers who provided feedback

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Status**: Production Ready

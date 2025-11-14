# AgroGuard API Documentation

## Base URL

```
http://localhost:5000
```

## Overview

The AgroGuard API provides endpoints for crop disease detection, disease information retrieval, and system health monitoring.

---

## Endpoints

### 1. Health Check

Check if the server and model are running correctly.

**Endpoint**: `GET /api/health`

**Response** (200 OK):

```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2024-10-26T10:30:45.123456"
}
```

**Use Case**: Verify backend is operational before sending predictions

---

### 2. Disease Prediction

Predict disease from a plant leaf image.

**Endpoint**: `POST /api/predict`

**Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD..."
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "disease": "Tomato Early Blight",
  "disease_key": "Tomato_Early_Blight",
  "confidence": 92.5,
  "severity": "High",
  "description": "Fungal disease caused by Alternaria solani",
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
  "affected_crops": ["Tomato"],
  "timestamp": "2024-10-26T10:31:12.654321"
}
```

**Error Response** (400 Bad Request):

```json
{
  "success": false,
  "error": "No image provided"
}
```

**Error Response** (500 Server Error):

```json
{
  "success": false,
  "error": "Error during prediction: [error details]"
}
```

**Parameters**:

- `image` (required, string): Base64 encoded image with optional data URI prefix

**Accepted Image Formats**:

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

**Image Size Recommendations**:

- Minimum: 100x100 pixels
- Maximum: 5MB
- Optimal: 224x224 to 512x512 pixels

**Processing Time**: 0.5 - 3 seconds (CPU dependent)

**Example JavaScript**:

```javascript
const fileInput = document.querySelector("#imageInput");
const file = fileInput.files[0];
const reader = new FileReader();

reader.onload = async (event) => {
  const base64Image = event.target.result;

  const response = await fetch("http://localhost:5000/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: base64Image,
    }),
  });

  const result = await response.json();
  console.log(result);
};

reader.readAsDataURL(file);
```

---

### 3. Get All Diseases

Retrieve list of all recognizable diseases in the system.

**Endpoint**: `GET /api/diseases`

**Response** (200 OK):

```json
{
  "success": true,
  "diseases": [
    {
      "id": "Tomato_Early_Blight",
      "name": "Tomato Early Blight",
      "severity": "High",
      "description": "Fungal disease caused by Alternaria solani"
    },
    {
      "id": "Tomato_Late_Blight",
      "name": "Tomato Late Blight",
      "severity": "Critical",
      "description": "Oomycete pathogen causing rapid leaf and fruit damage"
    },
    {
      "id": "Tomato_Bacterial_Spot",
      "name": "Tomato Bacterial Spot",
      "severity": "High",
      "description": "Bacterial infection affecting leaves and fruits"
    },
    {
      "id": "Tomato_Spider_Mites",
      "name": "Tomato Spider Mites",
      "severity": "Medium",
      "description": "Pest causing yellowing and webbing on leaves"
    },
    {
      "id": "Potato_Early_Blight",
      "name": "Potato Early Blight",
      "severity": "High",
      "description": "Fungal disease affecting potato foliage"
    },
    {
      "id": "Corn_Gray_Leaf_Spot",
      "name": "Corn Gray Leaf Spot",
      "severity": "High",
      "description": "Fungal disease affecting corn leaves"
    },
    {
      "id": "Corn_Common_Rust",
      "name": "Corn Common Rust",
      "severity": "Medium",
      "description": "Fungal rust disease on corn leaves"
    },
    {
      "id": "Apple_Scab",
      "name": "Apple Scab",
      "severity": "High",
      "description": "Fungal disease causing lesions on apples"
    },
    {
      "id": "Healthy_Leaf",
      "name": "Healthy Leaf",
      "severity": "None",
      "description": "Plant appears to be healthy"
    }
  ]
}
```

**Use Case**: Display available diseases in UI dropdown or list

---

### 4. Get Disease Information

Retrieve detailed information about a specific disease.

**Endpoint**: `GET /api/disease/<disease_key>`

**URL Parameters**:

- `disease_key` (required): Disease identifier (e.g., `Tomato_Early_Blight`)

**Response** (200 OK):

```json
{
  "success": true,
  "disease": "Tomato Early Blight",
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
}
```

**Error Response** (404 Not Found):

```json
{
  "success": false,
  "error": "Disease 'InvalidDisease' not found"
}
```

**Example URL**:

```
http://localhost:5000/api/disease/Tomato_Early_Blight
```

**Use Case**: Show detailed disease information on a dedicated page

---

## Response Fields

### Disease Prediction Response

| Field          | Type    | Description                                    |
| -------------- | ------- | ---------------------------------------------- |
| success        | boolean | Whether prediction was successful              |
| disease        | string  | Common name of detected disease                |
| disease_key    | string  | Unique identifier for disease                  |
| confidence     | float   | Prediction confidence (0-100)                  |
| severity       | string  | Severity level (None/Low/Medium/High/Critical) |
| description    | string  | Disease description                            |
| treatments     | array   | List of recommended treatments                 |
| prevention     | array   | Prevention strategies                          |
| affected_crops | array   | Crops susceptible to this disease              |
| timestamp      | string  | ISO format timestamp of prediction             |

### Error Response

| Field   | Type    | Description                        |
| ------- | ------- | ---------------------------------- |
| success | boolean | Always false on error              |
| error   | string  | Error message explaining the issue |

---

## Confidence Levels

Interpretation of confidence scores:

| Confidence | Interpretation                            |
| ---------- | ----------------------------------------- |
| 90-100%    | Very High - High confidence in prediction |
| 80-89%     | High - Good confidence                    |
| 70-79%     | Medium-High - Moderate confidence         |
| 60-69%     | Medium - Use with caution                 |
| 50-59%     | Low - Not reliable for single prediction  |
| <50%       | Very Low - Not recommended to trust       |

---

## Severity Levels

| Level    | Description                | Action                          |
| -------- | -------------------------- | ------------------------------- |
| None     | No disease detected        | Continue monitoring             |
| Low      | Minor disease indicators   | Preventive measures             |
| Medium   | Moderate disease presence  | Apply treatments soon           |
| High     | Significant disease spread | Immediate treatment needed      |
| Critical | Severe disease outbreak    | Emergency intervention required |

---

## Rate Limiting

Currently no rate limiting is implemented. For production:

- Implement rate limiting: 100 requests/minute
- Use API keys for authentication
- Monitor abuse and block as needed

---

## Error Codes

| Code | Meaning      | Solution             |
| ---- | ------------ | -------------------- |
| 200  | Success      | Request processed    |
| 400  | Bad Request  | Check request format |
| 404  | Not Found    | Verify disease_key   |
| 500  | Server Error | Check server logs    |

---

## CORS Headers

Requests include CORS headers for cross-origin requests:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Usage Examples

### Example 1: Python

```python
import requests
import base64

# Read and encode image
with open('leaf.jpg', 'rb') as f:
    image_data = base64.b64encode(f.read()).decode('utf-8')

# Make prediction request
response = requests.post(
    'http://localhost:5000/api/predict',
    json={'image': f'data:image/jpeg;base64,{image_data}'},
    headers={'Content-Type': 'application/json'}
)

result = response.json()
print(f"Disease: {result['disease']}")
print(f"Confidence: {result['confidence']}%")
```

### Example 2: cURL

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d @request.json
```

Where `request.json` contains the base64 image.

### Example 3: JavaScript/Fetch

```javascript
async function predictDisease(imageFile) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      try {
        const response = await fetch("http://localhost:5000/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: e.target.result }),
        });

        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsDataURL(imageFile);
  });
}
```

---

## Performance Metrics

### Response Times (CPU)

- Healthy check: <10ms
- Disease list: <20ms
- Disease info: <5ms
- Prediction: 500ms - 3s (first request slower)

### Memory Usage

- Model loading: ~500MB
- Per prediction: ~50MB
- Minimum RAM required: 2GB

### Supported Concurrent Requests

- Single-threaded: 1 request at a time
- With threading: Multiple concurrent requests
- Production: Use gunicorn with multiple workers

---

## Best Practices

1. **Image Quality**

   - Clear, well-lit photos
   - Focus on leaf details
   - Include affected areas
   - Avoid shadows

2. **Error Handling**

   - Check `success` field first
   - Retry on server errors
   - Implement timeout (30s)

3. **Performance**

   - Cache disease list
   - Batch multiple predictions
   - Use connection pooling

4. **Security**
   - Validate image size
   - Implement authentication
   - Use HTTPS in production
   - Sanitize error messages

---

## Troubleshooting API

### Connection Refused

```
Problem: Cannot connect to http://localhost:5000
Solution: Ensure backend server is running
```

### 400 Bad Request

```
Problem: Invalid image format
Solution: Use base64 encoded JPEG/PNG/WebP
```

### 500 Server Error

```
Problem: Model prediction failed
Solution: Check server logs, verify model file exists
```

### Slow Responses

```
Problem: Predictions taking >5 seconds
Solution: Normal for CPU, consider GPU, reduce image size
```

---

## Version History

- **v1.0.0** (Oct 2024): Initial release with 9 disease classes
- Future: GPU support, batch processing, model versioning

---

## Support

For issues or questions:

1. Check this documentation
2. Review error messages
3. Check server console output
4. Verify network connectivity

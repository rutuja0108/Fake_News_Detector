from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import os
from pymongo import MongoClient
import datetime

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Attempt MongoDB Connection
MONGO_URI = "mongodb://localhost:27017" # Default local Mongo URI
db = None
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
    client.server_info() # Trigger exception if unavailable
    db = client['fake_news_db']
    print("✅ Connected to MongoDB successfully!")
except Exception as e:
    print("⚠️ MongoDB not found or connection failed. Proceeding without database logging. Let's keep going.")

# Load Model
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'model')
model_path = os.path.join(MODEL_DIR, 'model.pkl')
vectorizer_path = os.path.join(MODEL_DIR, 'vectorizer.pkl')

try:
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    print("✅ Machine Learning Models loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models. Please ensure you run 'python ../model/train.py' first: {str(e)}")
    model, vectorizer = None, None

def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not vectorizer:
        return jsonify({'error': 'Machine learning model not loaded. Run train.py first.'}), 500

    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided.'}), 400

    text = data['text']
    
    # We require some length for a somewhat meaningful prediction
    if len(text.strip()) < 20: 
        return jsonify({'error': 'Text is too short for a reliable prediction.'}), 400

    cleaned_text = preprocess_text(text)

    # ML Inference
    X_tfidf = vectorizer.transform([cleaned_text])
    prediction = model.predict(X_tfidf)[0]
    probabilities = model.predict_proba(X_tfidf)[0]
    
    # In our train.py, 1 = Real, 0 = Fake
    is_real = int(prediction) == 1
    confidence = float(max(probabilities))
    
    result = {
        'prediction': 'Real' if is_real else 'Fake',
        'confidence': confidence,
        'text': text
    }

    # Asynchronous-ish MongoDB Logging
    if db is not None:
        try:
            log_entry = {
                'text': text,
                'prediction': result['prediction'],
                'confidence': result['confidence'],
                'timestamp': datetime.datetime.utcnow()
            }
            db.history.insert_one(log_entry)
        except Exception as e:
            print(f"Failed to log to MongoDB: {e}")

    return jsonify(result)

if __name__ == '__main__':
    print("\n🚀 Starting Fake News Detector Backend on port 5000...")
    app.run(debug=True, port=5000)

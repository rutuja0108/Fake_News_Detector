import pandas as pd
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

# Create model directory if it doesn't exist
os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)

def train_model():
    print("Starting ML Training Process...")
    
    # Check if a real dataset exists, otherwise use a synthetic one for setup validation
    csv_path = os.path.join(os.path.dirname(__file__), 'news_dataset.csv')
    
    if os.path.exists(csv_path):
        print(f"Loading dataset from {csv_path}")
        df = pd.read_csv(csv_path)
        # Expected columns: 'text', 'label' (0 for Fake, 1 for Real)
        X = df['text']
        y = df['label']
    else:
        print("Dataset not found. Generating a small synthetic dataset for initial out-of-the-box demonstration.")
        # Dummy data for demonstration purposes
        real_news = [
            "Scientists have discovered a new exoplanet within the habitable zone of its star using the James Webb Space Telescope.",
            "The stock market saw a significant increase today following the Federal Reserve's decision to maintain current interest rates.",
            "Local authorities have approved the construction of a new public library in the downtown area, scheduled to open next year.",
            "A new study published in a leading medical journal suggests a strong link between regular exercise and improved cognitive function in older adults.",
            "Tech giant unveils its latest smartphone featuring an advanced camera system and improved battery life."
        ] * 10 
        
        fake_news = [
            "Doctors are hiding this secret exotic fruit that cures all diseases instantly in just three days without any medicine!",
            "Aliens have landed in Central Park and are currently negotiating with the mayor, according to an anonymous source.",
            "You won't believe what happens if you drink this glowing green liquid! It gives you superpowers immediately.",
            "BREAKING: The moon is actually a giant projection created by the government to hide a massive space station.",
            "Earn a million dollars a week working from home just by clicking on these links! No skills required!"
        ] * 10

        all_text = real_news + fake_news
        labels = [1] * len(real_news) + [0] * len(fake_news) # 1 = Real, 0 = Fake
        
        df = pd.DataFrame({'text': all_text, 'label': labels})
        X = df['text']
        y = df['label']

    def preprocess_text(text):
        if not isinstance(text, str):
            return ""
        # Lowercase
        text = text.lower()
        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        return text

    print("Preprocessing text...")
    X_clean = X.apply(preprocess_text)

    print("Vectorizing text using TF-IDF...")
    vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
    X_tfidf = vectorizer.fit_transform(X_clean)

    print("Training Logistic Regression Model...")
    model = LogisticRegression(random_state=42)
    model.fit(X_tfidf, y)
    
    # Save the models
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    vectorizer_path = os.path.join(os.path.dirname(__file__), 'vectorizer.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(vectorizer, vectorizer_path)
    
    print(f"Training Complete! Models saved to:\n- {model_path}\n- {vectorizer_path}")
    print("\nNote: For higher accuracy in a real-world scenario, replace 'news_dataset.csv' with a large labeled dataset (e.g., ISOT Fake News Dataset) and run this script again.")

if __name__ == "__main__":
    train_model()

# 🛡️ Fake News Detection System (Full Stack)

A completely modernized, responsive, and beautiful full-stack college project integrating React, Tailwind CSS v4, Python Flask, and Scikit-Learn to detect the authenticity of news articles.

## ✨ Features

- **Modern Glassmorphism UI**: High quality interfaces with dynamic animations and gradients using Framer Motion.
- **Dark Mode Support**: Context-aware styling adapting perfectly to system preferences.
- **Machine Learning Integration**: Robust TF-IDF and Logistic Regression pipeline accurately identifying fabricated articles.
- **Optional Database Integration**: Automatically logs queries to MongoDB (if running locally) with zero crash risk if it's offline.

---

## 🚀 Running the Project

### 1. Train the ML Model
First, generate the initial machine learning models (`.pkl` files) using the provided training script. It features an automated synthetic dataset generation specifically mapped to handle demonstration testing out-of-the-box.

```bash
# Set up a virtual environment (Optional but Recommended)
python -m venv venv
venv\Scripts\activate   # (Windows)
# source venv/bin/activate (Mac/Linux)

# Install Dependencies
pip install -r backend/requirements.txt

# Train the model
python model/train.py
```

### 2. Start the Backend API
Keep your terminal in the same environment and run:

```bash
python backend/app.py
```
*The Flask server will start on `http://127.0.0.1:5000`.*

### 3. Start the Frontend
Open a **new separate terminal** window/tab, navigate to the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

*Your frontend will be accessible at `http://localhost:5173`. Open this URL in your browser!*

---

## 🗄️ Optional: MongoDB Setup
If you would like to track query history internally:
1. Download & Install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. Start the local server natively (it runs on port `27017`).
3. The Flask Backend will automatically detect it and create a database called `fake_news_db`.

---

## 👩‍💻 Built With
* Frontend: React (Vite), Tailwind CSS v4, Framer Motion, React Icons (Lucide)
* Backend: Python Flask, Flask-CORS, PyMongo
* Machine Learning: Scikit-learn, Pandas, Joblib

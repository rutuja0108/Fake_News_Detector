# 📰 Fake News Detection System

A **Full Stack Machine Learning Web Application** that detects whether a news article is **REAL ✅ or FAKE ❌** using Natural Language Processing (NLP) techniques.

---

## 🚀 Project Overview

This project allows users to input news content and get an instant prediction of its authenticity. It combines **Machine Learning**, **Backend APIs**, and a **Modern UI** to create a real-world solution for detecting misinformation.

---

## 🧠 Features

- 📝 Enter news text for analysis  
- 🤖 Machine Learning prediction (Fake / Real)  
- 📊 Confidence score display  
- ⚡ Fast and responsive UI  
- 🎨 Clean and modern user interface  
- 🌐 Full stack integration (Frontend + Backend)  

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js  
- Tailwind CSS  
- JavaScript  

### 🔧 Backend
- Python  
- Flask  
- Flask-CORS  

### 🤖 Machine Learning
- Scikit-learn  
- TF-IDF Vectorizer  
- Logistic Regression  

### 🗄️ Database (Optional)
- MongoDB  

---

## 📁 Project Structure

```
Fake News Detector/
│
├── frontend/        # React UI  
├── backend/         # Flask API  
├── model/           # ML training scripts  
├── README.md  
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/fake-news-detector.git
cd fake-news-detector
```

---

### 2️⃣ Install Backend Dependencies

```bash
pip install -r backend/requirements.txt
```

---

### 3️⃣ Train the Machine Learning Model

```bash
python model/train.py
```

---

### 4️⃣ Run Backend Server

```bash
python backend/app.py
```

Backend will run on:  
👉 http://127.0.0.1:5000  

---

### 5️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:  
👉 http://localhost:5173  

---

## 🧪 Sample Input

**Input:**
```
Breaking news: Government is giving ₹10 lakh to every citizen.
```

**Output:**
```
Prediction: FAKE ❌  
Confidence: 92%
```

---

## 🔄 How It Works

1. User enters news text  
2. Frontend sends request to backend  
3. Backend processes text using ML model  
4. Model predicts Fake or Real  
5. Result is displayed on UI  

---

## 📌 Future Enhancements

- 📄 PDF upload support  
- 🎥 Video/news analysis  
- 🔐 User authentication  
- 📊 Analytics dashboard  

---

## 🎯 Conclusion

This project demonstrates how **Machine Learning + Full Stack Development** can be combined to solve real-world problems like fake news detection.

---

## ⭐ Show Your Support

If you like this project, please ⭐ star the repository!

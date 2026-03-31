import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DetectionForm from './components/DetectionForm';
import ResultCard from './components/ResultCard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePredict = async (text) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setShowHistory(false);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', { text }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const newResult = response.data;
      setResult(newResult);
      
      // Update local history array
      setHistory((prev) => [newResult, ...prev].slice(0, 5)); // Keep last 5

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to connect to the prediction server. Please ensure the backend API is running.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative font-sans">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-400/20 dark:bg-primary-600/10 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-[120px]" />
      </div>

      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        toggleHistory={() => setShowHistory(!showHistory)} 
      />

      <main className="container mx-auto px-4 py-8 pb-20 relative z-10 flex flex-col items-center">
        
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto my-8"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-800 dark:text-slate-100">
            Verify the Truth in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-600 dark:from-primary-400 dark:to-indigo-500">Milliseconds</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Advanced Machine Learning dissects news articles to detect subtle fake news patterns and manipulation. Input text below to begin.
          </p>
        </motion.div>

        {/* Main Interface */}
        <div className="w-full flex-1">
          <DetectionForm onSubmit={handlePredict} isLoading={isLoading} />
          
          <AnimatePresence mode="wait">
            {showHistory && history.length > 0 ? (
              <motion.div
                key="history"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-3xl mx-auto mt-6"
              >
                <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-300">Recent Checks</h3>
                <div className="space-y-3">
                  {history.map((item, idx) => (
                    <div key={idx} className="glass-card p-4 flex items-center justify-between text-sm md:text-base">
                      <p className="truncate w-2/3 italic text-slate-600 dark:text-slate-400">"{item.text.substring(0, 50)}..."</p>
                      <span className={`px-3 py-1 rounded-full font-bold ${item.prediction === 'Real' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {item.prediction} ({(item.confidence * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : showHistory ? (
              <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="text-center text-slate-500 mt-6"
              >
                No history available yet.
              </motion.div>
            ) : null}

            {!showHistory && (error || result) && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <ResultCard result={result} error={error} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      <footer className="w-full py-6 text-center text-sm text-slate-500 dark:text-slate-400 mt-auto border-t border-slate-200 dark:border-slate-800 absolute bottom-0">
        <p>Fake News Detection System &copy; {new Date().getFullYear()} - Final Year Project</p>
      </footer>
    </div>
  );
}

export default App;

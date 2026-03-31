import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const DetectionForm = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < 20) {
      setError('Please enter at least 20 characters for a reliable prediction.');
      return;
    }
    setError('');
    onSubmit(text);
  };

  const clearForm = () => {
    setText('');
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto mt-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="h-6 w-6 text-primary-500" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-100 dark:to-slate-400">
          Analyze News Content
        </h2>
      </div>
      
      <p className="text-slate-500 dark:text-slate-400 mb-6 pb-2">
        Paste the article text below. Our AI model will analyze linguistics and patterns to determine authenticity.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error && e.target.value.length >= 20) setError('');
            }}
            placeholder="Enter the news text here (e.g., 'Scientists discover new element on Mars...')"
            className={`glass-input w-full min-h-[180px] p-5 resize-none ${error ? 'border-red-400 dark:border-red-500 focus:ring-red-400' : ''}`}
            disabled={isLoading}
          />
          {text && !isLoading && (
            <button
              type="button"
              onClick={clearForm}
              className="absolute top-4 right-4 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              CLEAR
            </button>
          )}
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800/30"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        <div className="flex justify-end pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !text.trim()}
            className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px] transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Processing AI...
              </>
            ) : (
              <>
                <Search className="-ml-1 mr-2 h-5 w-5" />
                Analyze AI
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default DetectionForm;

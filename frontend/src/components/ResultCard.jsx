import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BarChart3, Clock, AlertTriangle } from 'lucide-react';

const ResultCard = ({ result, error }) => {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto mt-6 bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Analysis Failed</h3>
          <p className="text-slate-600 dark:text-slate-300">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const isReal = result.prediction.toLowerCase() === 'real';
  const confidence = (result.confidence * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`glass-card p-6 md:p-8 w-full max-w-3xl mx-auto mt-6 border-t-4 ${isReal ? 'border-t-green-500' : 'border-t-red-500'}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Prediction Status Badge */}
        <div className="flex items-center gap-4">
          {isReal ? (
            <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-full shadow-inner shadow-green-500/20">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
          ) : (
            <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full shadow-inner shadow-red-500/20">
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              AI Assessment
            </p>
            <h3 className={`text-3xl font-extrabold tracking-tight ${isReal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isReal ? "REAL NEWS" : "FAKE NEWS"}
            </h3>
          </div>
        </div>

        {/* Confidence Progress Bar */}
        <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="flex items-center text-slate-600 dark:text-slate-300">
              <BarChart3 className="h-4 w-4 mr-2 text-primary-500" /> 
              Confidence
            </span>
            <span className={isReal ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {confidence}%
            </span>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className={`h-3 rounded-full ${isReal ? "bg-green-500" : "bg-red-500"}`}
            />
          </div>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50 pt-2">
         {/* Original Text Snippet */}
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Excerpt Analyzed:
        </p>
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic border-l-2 border-primary-500 pl-4 bg-slate-50 dark:bg-slate-900/30 py-2 rounded-r">
          "{result.text.length > 200 ? `${result.text.substring(0, 200)}...` : result.text}"
        </p>
      </div>

    </motion.div>
  );
};

export default ResultCard;

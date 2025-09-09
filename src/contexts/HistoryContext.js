import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider = ({ children }) => {
  const [consultHistory, setConsultHistory] = useState(() => {
    const saved = localStorage.getItem('consultHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('consultHistory', JSON.stringify(consultHistory));
  }, [consultHistory]);

  const addToHistory = (item) => {
    const historyItem = {
      ...item,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setConsultHistory(prev => {
      const filtered = prev.filter(h => 
        !(h.type === item.type && h.name === item.name)
      );
      const newHistory = [historyItem, ...filtered];
      return newHistory.slice(0, 50); // Mantener solo los últimos 50
    });
  };

  const clearHistory = () => {
    setConsultHistory([]);
  };

  const removeFromHistory = (id) => {
    setConsultHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <HistoryContext.Provider value={{
      consultHistory,
      addToHistory,
      clearHistory,
      removeFromHistory
    }}>
      {children}
    </HistoryContext.Provider>
  );
};
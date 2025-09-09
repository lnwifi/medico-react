import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      // Modo oscuro
      background: '#121212',
      surface: '#1e1e1e',
      surfaceVariant: '#2d2d2d',
      primary: '#4CAF50',
      primaryVariant: '#2E7D32',
      secondary: '#2196F3',
      text: '#ffffff',
      textSecondary: '#b3b3b3',
      border: '#404040',
      shadow: 'rgba(0,0,0,0.5)',
      error: '#f44336',
      warning: '#ff9800',
      success: '#4caf50',
      info: '#2196f3'
    } : {
      // Modo claro
      background: '#f5f5f5',
      surface: '#ffffff',
      surfaceVariant: '#f9f9f9',
      primary: '#4CAF50',
      primaryVariant: '#2E7D32',
      secondary: '#2196F3',
      text: '#333333',
      textSecondary: '#666666',
      border: '#e0e0e0',
      shadow: 'rgba(0,0,0,0.1)',
      error: '#f44336',
      warning: '#ff9800',
      success: '#4caf50',
      info: '#2196f3'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
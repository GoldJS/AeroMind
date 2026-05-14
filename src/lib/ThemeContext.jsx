import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aeromind-theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('aeromind-theme', theme);
    const root = document.documentElement;
    root.classList.remove('dark', 'aero');
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'aero') root.classList.add('aero');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
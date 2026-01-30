import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, hsl(156, 45%, 35%) 0%, hsl(156, 40%, 25%) 100%)'
          : 'linear-gradient(135deg, hsl(156, 50%, 72%) 0%, hsl(156, 45%, 65%) 100%)',
        boxShadow: isDark 
          ? '0 4px 20px -4px hsla(156, 40%, 30%, 0.4)'
          : '0 4px 20px -4px hsla(156, 50%, 60%, 0.4)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Leaf 
        className={`w-6 h-6 transition-transform duration-300 ${isDark ? 'text-primary-foreground rotate-180' : 'text-primary-foreground'}`}
      />
    </button>
  );
};

export default ThemeToggle;

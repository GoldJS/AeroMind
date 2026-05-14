import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { Sun, Moon, Leaf, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const THEMES = [
  { id: 'light', label: 'Light Mode', icon: Sun, desc: 'Clean and bright' },
  { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'Easy on the eyes' },
  { id: 'aero', label: 'Frutiger Aero', icon: Leaf, desc: 'Vista nostalgia' },
];

export default function SettingsPanel() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground mb-8">Customize your AeroMind experience</p>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Theme</p>
          {THEMES.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setTheme(t.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                theme === t.id
                  ? 'border-primary/50 bg-accent shadow-md'
                  : 'border-border/50 bg-card/50 hover:bg-accent/40'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                theme === t.id ? 'bg-primary text-primary-foreground' : 'bg-accent text-muted-foreground'
              }`}>
                <t.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              {theme === t.id && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-10 space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">About</p>
          <div className="p-4 rounded-xl border border-border/50 bg-card/50">
            <div className="flex items-center gap-3 mb-3">
              <Monitor className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">AeroMind v1.0</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A premium AI chat experience with Frutiger Aero aesthetics. 
              Inspired by the glossy, optimistic design language of Windows Vista and Windows 7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
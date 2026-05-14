import React, { useState } from 'react';
import { ChevronDown, Plus, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MODELS = ['ChatGPT', 'Claude', 'Gemini', 'LLaMA'];

export default function ModelSwitcher({ selectedModel, onModelChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
      {/* Model selector */}
      <div className="flex-1 flex justify-center">
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl hover:bg-accent/50 transition-all duration-200"
          >
            <Bot className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">{selectedModel}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50 glass"
              >
                {MODELS.map((model) => (
                  <button
                    key={model}
                    onClick={() => { onModelChange(model); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                      model === selectedModel
                        ? 'bg-accent text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* New chat */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <span>new chat</span>
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <Plus className="w-3 h-3 text-primary" />
        </div>
      </motion.button>
    </div>
  );
}
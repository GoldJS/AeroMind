import React, { useState } from 'react';
import { Plus, CornerDownLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-6 pb-5 pt-3">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border/60 shadow-lg aero-shine transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-xl"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full bg-accent/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </motion.button>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type something..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm outline-none"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          className="w-9 h-9 rounded-full bg-accent/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
        >
          <CornerDownLeft className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

export default function MessageBubble({ message, index }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
        isUser 
          ? 'bg-green-500/20 border border-green-500/30' 
          : 'bg-blue-500/20 border border-blue-500/30'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed aero-shine ${
          isUser
            ? 'bg-foreground/90 text-background rounded-tr-md'
            : 'bg-card border border-border/60 text-foreground rounded-tl-md shadow-sm'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-blue-500/20 border border-blue-500/30">
        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="bg-card border border-border/60 rounded-2xl rounded-tl-md px-5 py-3.5 shadow-sm">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 typing-dot" />
        </div>
      </div>
    </div>
  );
}
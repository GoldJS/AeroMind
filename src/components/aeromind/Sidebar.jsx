import React from 'react';
import { Home, Box, Settings, ChevronRight, HardDrive, Cpu, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: Home, label: 'homepage', active: true },
  { icon: Box, label: 'models' },
  { icon: Settings, label: 'settings' },
];

const RECENT_CHATS = [
  'Do this math equation',
  'How do planets spin?',
  'What animals are going extinct?',
  'How to bake cookies in 15 mins?',
];

export default function Sidebar({ activeNav, onNavChange, onSelectChat }) {
  return (
    <div className="w-52 flex-shrink-0 flex flex-col h-full border-r border-border bg-card/80 glass-subtle">
      {/* Logo */}
      <div className="px-5 pt-5 pb-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          aeromind <span className="text-muted-foreground font-light">&lt;/&gt;</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavChange(item.label)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              activeNav === item.label
                ? 'text-foreground font-medium bg-accent/60'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/40'
            }`}
          >
            {activeNav === item.label && (
              <ChevronRight className="w-3 h-3" />
            )}
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Recent Chats */}
      <div className="mt-8 px-5 flex-1 overflow-hidden">
        <p className="text-xs text-muted-foreground mb-3 tracking-wide">recent chats</p>
        <div className="space-y-1.5">
          {RECENT_CHATS.map((chat, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectChat(chat)}
              className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border/60 bg-card/50 text-foreground/80 hover:bg-accent/50 hover:border-border transition-all duration-200 truncate"
            >
              {chat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="px-5 py-3 space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <HardDrive className="w-3 h-3" />
          <span>6.7 gb / 128 gb</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <Cpu className="w-3 h-3" />
          <span>3 models installed</span>
        </div>
      </div>

      {/* Profile */}
      <div className="px-3 pb-4 pt-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-accent/60 border border-border/50 cursor-pointer transition-all duration-200 hover:bg-accent"
        >
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">usergold</span>
        </motion.div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Trash2, MemoryStick, Cpu, HardDrive, Zap, CheckCircle2 } from 'lucide-react';

export default function InstalledManager({ models, runningId, onRun, onUninstall }) {
  if (models.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-base font-medium text-foreground mb-1">No models installed</p>
        <p className="text-sm text-muted-foreground">Head to Browse to download your first model.</p>
      </div>
    );
  }

  const runningModel = models.find((m) => m.id === runningId);

  return (
    <div className="space-y-6">
      {/* Active model banner */}
      <AnimatePresence>
        {runningModel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-4 p-4 rounded-2xl border border-green-500/30 bg-green-500/5"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {runningModel.name} <span className="font-normal text-muted-foreground">{runningModel.version}</span> is running
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Using {runningModel.ram} RAM · {runningModel.vram} VRAM
              </p>
            </div>
            <button
              onClick={() => onRun(runningModel.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-medium hover:bg-orange-500/20 transition-colors"
            >
              <Square className="w-3 h-3" />
              Stop
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_80px_80px_80px_120px] gap-4 px-4 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>Model</span>
        <span>Size</span>
        <span>RAM</span>
        <span>VRAM</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Model rows */}
      <div className="space-y-2">
        {models.map((model, i) => {
          const isRunning = runningId === model.id;
          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ delay: i * 0.06 }}
              className={`grid grid-cols-[1fr_80px_80px_80px_120px] gap-4 items-center px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                isRunning
                  ? 'border-green-500/30 bg-green-500/5'
                  : 'border-border/50 bg-card/60 hover:bg-card/80'
              }`}
            >
              {/* Name */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {isRunning && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />}
                  <span className="text-sm font-medium text-foreground truncate">{model.name}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-accent text-muted-foreground whitespace-nowrap">
                    {model.version}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{model.creator} · {model.source}</p>
              </div>

              {/* Specs */}
              <div className="flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-foreground">{model.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <MemoryStick className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-foreground">{model.ram}</span>
              </div>
              <div className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-foreground">{model.vram}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => onRun(model.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isRunning
                      ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                      : 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20'
                  }`}
                  title={isRunning ? 'Stop' : 'Run'}
                >
                  {isRunning ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => onUninstall(model.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-destructive/8 text-destructive border border-destructive/15 hover:bg-destructive/15 transition-colors"
                  title="Uninstall"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary footer */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/40 border border-border/40 mt-2">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <span className="text-xs text-muted-foreground">
          {models.length} model{models.length !== 1 ? 's' : ''} installed
          {runningId ? ` · 1 running` : ''}
        </span>
      </div>
    </div>
  );
}
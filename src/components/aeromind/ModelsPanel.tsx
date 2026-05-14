import React, { useState, useMemo } from 'react';
import InstalledManager from './InstalledManager';
import { Search, ChevronDown, Download, Play, Square, Trash2, CheckCircle2, X, HardDrive, MemoryStick, Cpu, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Model {
  id: string;
  name: string;
  version: string;
  creator: string;
  source: string;
  size: string;
  ram: string;
  vram: string;
  desc: string;
  tags: string[];
  installed: boolean;
}

interface DownloadState {
  phase: 'downloading' | 'installing' | 'done';
  progress: number;
}

interface ModelRowProps {
  model: Model;
  index: number;
  isInstalled: boolean;
  isRunning: boolean;
  downloadState: DownloadState | undefined;
  onDownload: () => void;
  onRun: () => void;
  onUninstall: () => void;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const SOURCES = ['All Sources', 'Hugging Face', 'Ollama', 'Custom URL'];

const ALL_MODELS: Model[] = [
  {
    id: 'llama-3-70b',
    name: 'LLaMA 3',
    version: '70B',
    creator: 'Meta AI',
    source: 'Hugging Face',
    size: '42 GB',
    ram: '64 GB',
    vram: '48 GB',
    desc: 'Flagship open-source LLM. Excellent for reasoning and code.',
    tags: ['chat', 'code', 'reasoning'],
    installed: false,
  },
  {
    id: 'mistral-7b',
    name: 'Mistral',
    version: '7B Instruct',
    creator: 'Mistral AI',
    source: 'Ollama',
    size: '4.1 GB',
    ram: '8 GB',
    vram: '6 GB',
    desc: 'Lightweight and fast. Great for everyday tasks on consumer hardware.',
    tags: ['chat', 'fast'],
    installed: true,
  },
  {
    id: 'phi-3-mini',
    name: 'Phi-3',
    version: 'Mini 3.8B',
    creator: 'Microsoft',
    source: 'Hugging Face',
    size: '2.3 GB',
    ram: '4 GB',
    vram: '3 GB',
    desc: 'Small but surprisingly capable. Ideal for edge and low-resource devices.',
    tags: ['lightweight', 'edge'],
    installed: true,
  },
  {
    id: 'qwen2-72b',
    name: 'Qwen2',
    version: '72B',
    creator: 'Alibaba Cloud',
    source: 'Hugging Face',
    size: '48 GB',
    ram: '80 GB',
    vram: '64 GB',
    desc: 'Top-tier multilingual model with strong coding and math capabilities.',
    tags: ['multilingual', 'code', 'math'],
    installed: false,
  },
  {
    id: 'gemma-2-27b',
    name: 'Gemma 2',
    version: '27B',
    creator: 'Google',
    source: 'Hugging Face',
    size: '18 GB',
    ram: '32 GB',
    vram: '24 GB',
    desc: "Google's open model with excellent instruction following and safety.",
    tags: ['chat', 'safe'],
    installed: false,
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    version: '8B',
    creator: 'DeepSeek',
    source: 'Ollama',
    size: '5.2 GB',
    ram: '10 GB',
    vram: '8 GB',
    desc: 'Chain-of-thought reasoning powerhouse. Excels at complex problem solving.',
    tags: ['reasoning', 'math'],
    installed: false,
  },
  {
    id: 'codellama-34b',
    name: 'CodeLLaMA',
    version: '34B',
    creator: 'Meta AI',
    source: 'Ollama',
    size: '20 GB',
    ram: '32 GB',
    vram: '20 GB',
    desc: 'Specialized for code generation, completion, and debugging tasks.',
    tags: ['code'],
    installed: true,
  },
  {
    id: 'custom-url',
    name: 'Custom Model',
    version: 'GGUF',
    creator: 'You',
    source: 'Custom URL',
    size: 'Variable',
    ram: 'Variable',
    vram: 'Variable',
    desc: 'Load any GGUF or Safetensors model from a direct URL or local path.',
    tags: ['custom'],
    installed: false,
  },
];

const SOURCE_DOT: Record<string, string> = {
  'Hugging Face': 'bg-yellow-400',
  'Ollama':       'bg-blue-400',
  'Custom URL':   'bg-purple-400',
};

// ── Info Modal ────────────────────────────────────────────────────────────────

function InfoModal({ model, onClose }: { model: Model; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-2xl
            bg-card/80 backdrop-blur-2xl
            border border-white/15
            shadow-[0_24px_64px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]
            p-6 space-y-4"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground/50
              hover:text-foreground hover:bg-white/10 transition-all duration-150"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title */}
          <div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${SOURCE_DOT[model.source] ?? 'bg-muted-foreground'}`} />
              <h3 className="text-base font-semibold text-foreground">{model.name}</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/8 border border-white/10 text-muted-foreground font-medium">
                {model.version}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <User className="w-3 h-3 text-muted-foreground/50" />
              <span className="text-xs text-muted-foreground">{model.creator}</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">{model.source}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed">{model.desc}</p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: HardDrive,   label: 'Disk',  value: model.size },
              { icon: MemoryStick, label: 'RAM',   value: model.ram  },
              { icon: Cpu,         label: 'VRAM',  value: model.vram },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-3 rounded-xl
                  bg-white/5 border border-white/10 text-center"
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                <span className="text-sm font-semibold text-foreground">{value}</span>
                <span className="text-[10px] text-muted-foreground/50">{label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {model.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-1 rounded-full bg-white/8 border border-white/10 text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── ModelRow ──────────────────────────────────────────────────────────────────

function ModelRow({
  model, index, isInstalled, isRunning,
  downloadState, onDownload, onRun, onUninstall,
}: ModelRowProps) {
  const [showInfo, setShowInfo] = useState(false);

  const phase         = downloadState?.phase;
  const progress      = downloadState?.progress ?? 0;
  const isDownloading = phase === 'downloading';
  const isInstalling  = phase === 'installing';

  return (
    <>
      {showInfo && <InfoModal model={model} onClose={() => setShowInfo(false)} />}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.045, duration: 0.28 }}
        className="group relative mx-4 my-1.5"
      >
        <div className="relative flex items-center gap-4 px-4 py-3 rounded-2xl
          border border-white/10 bg-white/5
          backdrop-blur-md
          shadow-[0_2px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]
          hover:bg-white/10 hover:border-white/20
          hover:shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.18)]
          transition-all duration-300"
        >
          {/* Running glow */}
          {isRunning && (
            <motion.div
              className="absolute inset-0 rounded-2xl border border-green-400/30 bg-green-400/5"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Source dot */}
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${SOURCE_DOT[model.source] ?? 'bg-muted-foreground'}`} />

          {/* Name + creator — clickable capsule expands to modal */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInfo(true)}
            className="flex flex-col items-start min-w-0 text-left"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-foreground leading-none">{model.name}</span>
              {isInstalled && !isDownloading && !isInstalling && (
                <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-muted-foreground/70">{model.version}</span>
              <span className="text-muted-foreground/30 text-[10px]">·</span>
              <span className="text-[10px] text-muted-foreground/50">{model.creator}</span>
            </div>
          </motion.button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Floating specs */}
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground/60 flex-shrink-0">
            <span><span className="text-foreground/80 font-medium">{model.size}</span> disk</span>
            <span><span className="text-foreground/80 font-medium">{model.ram}</span> RAM</span>
            <span><span className="text-foreground/80 font-medium">{model.vram}</span> VRAM</span>
          </div>

          {/* Download progress */}
          {(isDownloading || isInstalling) && (
            <div className="w-24 flex-shrink-0 space-y-1">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isInstalling ? '100%' : `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                {isInstalling ? 'Installing…' : `${Math.round(progress)}%`}
              </p>
            </div>
          )}

          {/* Actions */}
          {!isDownloading && !isInstalling && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {!isInstalled ? (
                /* Download icon button — theme-aware blue */
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={onDownload}
                  title="Download"
                  className="w-8 h-8 rounded-xl flex items-center justify-center
                    bg-blue-500/20 border border-blue-400/30 text-blue-400
                    hover:bg-blue-500/35 hover:border-blue-400/50
                    dark:bg-blue-600/20 dark:border-blue-500/30 dark:text-blue-400
                    dark:hover:bg-blue-600/35
                    aero:bg-sky-400/25 aero:border-sky-300/40 aero:text-sky-300
                    aero:hover:bg-sky-400/40
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
                    transition-all duration-200"
                >
                  <Download className="w-3.5 h-3.5" />
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRun}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                      text-[11px] font-medium border
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                      transition-all duration-200 ${
                      isRunning
                        ? 'bg-orange-500/15 border-orange-400/25 text-orange-400'
                        : 'bg-green-500/12 border-green-400/25 text-green-500 hover:bg-green-500/20'
                    }`}
                  >
                    {isRunning
                      ? <><Square className="w-3 h-3" />&nbsp;Stop</>
                      : <><Play   className="w-3 h-3" />&nbsp;Run</>}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onUninstall}
                    className="p-1.5 rounded-xl border border-transparent
                      text-muted-foreground/30
                      hover:text-red-400 hover:bg-red-500/10 hover:border-red-400/20
                      opacity-0 group-hover:opacity-100
                      transition-all duration-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </motion.button>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

// ── ModelsPanel ───────────────────────────────────────────────────────────────

export default function ModelsPanel() {
  const [search, setSearch]         = useState('');
  const [source, setSource]         = useState('All Sources');
  const [sourceOpen, setSourceOpen] = useState(false);
  const [activeTab, setActiveTab]   = useState('browse');
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({});
  const [installedIds, setInstalledIds]     = useState<string[]>(
    ALL_MODELS.filter(m => m.installed).map(m => m.id)
  );
  const [runningId, setRunningId] = useState<string | null>(null);

  const filtered = useMemo(() => ALL_MODELS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.creator.toLowerCase().includes(search.toLowerCase()) ||
      m.version.toLowerCase().includes(search.toLowerCase());
    const matchSource = source === 'All Sources' || m.source === source;
    return matchSearch && matchSource;
  }), [search, source]);

  const installedModels = ALL_MODELS.filter((m) => installedIds.includes(m.id));

  const handleDownload = (model: Model) => {
    if (downloadStates[model.id]?.phase === 'downloading') return;
    setDownloadStates((prev) => ({ ...prev, [model.id]: { phase: 'downloading', progress: 0 } }));
    const interval = setInterval(() => {
      setDownloadStates((prev) => {
        const current = prev[model.id]?.progress ?? 0;
        const next    = Math.min(current + Math.random() * 8 + 3, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadStates((p) => ({ ...p, [model.id]: { phase: 'installing', progress: 100 } }));
            setTimeout(() => {
              setDownloadStates((p) => ({ ...p, [model.id]: { phase: 'done', progress: 100 } }));
              setInstalledIds((p) => [...p, model.id]);
            }, 1200);
          }, 300);
          return { ...prev, [model.id]: { phase: 'downloading', progress: 100 } };
        }
        return { ...prev, [model.id]: { phase: 'downloading', progress: next } };
      });
    }, 180);
  };

  const handleUninstall = (modelId: string) => {
    setInstalledIds((prev) => prev.filter((id) => id !== modelId));
    setDownloadStates((prev) => { const n = { ...prev }; delete n[modelId]; return n; });
    if (runningId === modelId) setRunningId(null);
  };

  const handleRun = (modelId: string) => {
    setRunningId((prev) => (prev === modelId ? null : modelId));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-8 pt-7 pb-5 border-b border-white/8">
        <h2 className="text-lg font-semibold text-foreground tracking-tight">Models</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Browse, download and manage AI models</p>

        <div className="flex gap-1 mt-5 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
          {['browse', 'installed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white/10 border border-white/15 shadow-sm text-foreground backdrop-blur-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'installed' ? `Installed (${installedIds.length})` : 'Browse'}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'browse' ? (
          <motion.div
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Filter bar */}
            <div className="flex items-center gap-3 px-8 py-3 border-b border-white/8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search models..."
                  className="pl-8 pr-4 py-1.5 rounded-xl
                    bg-white/5 border border-white/10
                    text-xs text-foreground placeholder:text-muted-foreground/40
                    outline-none focus:border-white/25 focus:bg-white/8
                    transition-all duration-200 w-56"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setSourceOpen(!sourceOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                    bg-white/5 border border-white/10
                    text-xs text-foreground hover:bg-white/10
                    transition-all duration-200"
                >
                  {source !== 'All Sources' && (
                    <div className={`w-1.5 h-1.5 rounded-full ${SOURCE_DOT[source] ?? 'bg-muted-foreground'}`} />
                  )}
                  <span>{source}</span>
                  <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${sourceOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sourceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-0 top-full mt-1.5 w-40
                        bg-card/80 backdrop-blur-xl
                        border border-white/12 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {SOURCES.map((s) => (
                        <button
                          key={s}
                          onClick={() => { setSource(s); setSourceOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 transition-colors ${
                            source === s
                              ? 'bg-white/10 text-foreground font-medium'
                              : 'text-muted-foreground hover:bg-white/8 hover:text-foreground'
                          }`}
                        >
                          {s !== 'All Sources' && (
                            <div className={`w-1.5 h-1.5 rounded-full ${SOURCE_DOT[s] ?? 'bg-muted-foreground'}`} />
                          )}
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-[11px] text-muted-foreground/50 ml-auto">
                {filtered.length} model{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Rows */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="max-w-3xl mx-auto">
                {filtered.map((model, i) => (
                  <ModelRow
                    key={model.id}
                    model={model}
                    index={i}
                    isInstalled={installedIds.includes(model.id)}
                    isRunning={runningId === model.id}
                    downloadState={downloadStates[model.id]}
                    onDownload={() => handleDownload(model)}
                    onRun={() => handleRun(model.id)}
                    onUninstall={() => handleUninstall(model.id)}
                  />
                ))}
                {filtered.length === 0 && (
                  <div className="py-20 text-center text-muted-foreground/50 text-xs">
                    No models match your search.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="installed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-y-auto"
          >
            <InstalledManager
              models={installedModels}
              runningId={runningId}
              onRun={handleRun}
              onUninstall={handleUninstall}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
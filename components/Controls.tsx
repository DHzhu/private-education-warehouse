import React from 'react';
import { Play, Pause, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  zoom: number;
  onZoomChange: (delta: number) => void;
  onResetTime: () => void;
}

const SPEED_OPTIONS = [1, 10, 50, 100];

const Controls: React.FC<ControlsProps> = ({ 
  isPlaying, 
  onPlayPause, 
  speed, 
  onSpeedChange,
  zoom,
  onZoomChange,
  onResetTime
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center gap-4 z-10">
      
      {/* Main Control Bar */}
      <div className="flex items-center bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl">
        
        {/* Playback Controls */}
        <div className="flex items-center gap-2 pr-4 border-r border-white/10">
            <button 
                onClick={onResetTime}
                className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                title="重置时间"
            >
                <RotateCcw size={18} />
            </button>
            <button 
                onClick={onPlayPause}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
                    isPlaying ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
            >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1 px-4">
            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mr-2 hidden sm:block">速度</span>
            <div className="flex bg-slate-950/50 rounded-lg p-1 border border-white/5">
                {SPEED_OPTIONS.map((s) => (
                    <button
                        key={s}
                        onClick={() => onSpeedChange(s)}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                            speed === s 
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                        }`}
                    >
                        {s}x
                    </button>
                ))}
            </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 pl-4 border-l border-white/10">
            <button 
                onClick={() => onZoomChange(-0.2)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="缩小"
            >
                <ZoomOut size={18} />
            </button>
            <button 
                onClick={() => onZoomChange(0.2)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="放大"
            >
                <ZoomIn size={18} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default Controls;
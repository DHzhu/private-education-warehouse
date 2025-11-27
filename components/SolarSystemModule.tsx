import React, { useState, useEffect } from 'react';
import SolarSystem from './SolarSystem';
import InfoPanel from './InfoPanel';
import Controls from './Controls';
import { CelestialBody } from '../types';
import { Info, ArrowLeft } from 'lucide-react';

interface SolarSystemModuleProps {
  onBack: () => void;
}

const SolarSystemModule: React.FC<SolarSystemModuleProps> = ({ onBack }) => {
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(0.8);
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  
  // Robust Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let previousTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isPlaying) {
         previousTime = currentTime;
         animationFrameId = requestAnimationFrame(animate);
         return;
      }

      const deltaTime = currentTime - previousTime;
      previousTime = currentTime;

      const BASE_RATE = 0.00002; 
      setTime((prevTime) => prevTime + (deltaTime * BASE_RATE * speed));
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, speed]);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(0.1, Math.min(10, prev + delta)));
  };

  const handleBodySelect = (body: CelestialBody) => {
    setSelectedBody(body);
  };

  const handleResetTime = () => {
    setTime(0);
  };

  return (
    <div className="relative w-full h-full bg-slate-950 flex overflow-hidden">
      
      {/* Main Visualization Area */}
      <div className="flex-1 relative h-full">
        {/* Top Overlay UI */}
        <div className="absolute top-6 left-6 z-10 flex flex-col items-start gap-4 pointer-events-none">
            {/* Back Button (Pointer events enabled) */}
            <button 
                onClick={onBack}
                className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full border border-white/10 backdrop-blur-md transition-all text-sm group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                返回主菜单
            </button>

            <div className="mt-2">
                <h1 className="text-4xl font-display font-bold text-white tracking-tight drop-shadow-lg">
                    SOLARIS
                </h1>
                <p className="text-slate-400 text-sm tracking-wide">太阳系交互式探索</p>
            </div>
        </div>

        {/* Info Hint */}
        {!selectedBody && (
            <div className="absolute top-6 right-6 z-10 animate-fade-in hidden md:flex items-center gap-2 text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm pointer-events-none">
                <Info size={14} />
                <span className="text-xs">点击行星查看详情，拖拽画布移动视图</span>
            </div>
        )}

        {/* The Solar System Canvas */}
        <SolarSystem 
            time={time} 
            zoom={zoom} 
            onBodySelect={handleBodySelect}
            selectedBodyId={selectedBody?.id || null}
        />

        {/* Controls */}
        <Controls 
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            speed={speed}
            onSpeedChange={setSpeed}
            zoom={zoom}
            onZoomChange={handleZoom}
            onResetTime={handleResetTime}
        />
      </div>

      {/* Sidebar */}
      {selectedBody && (
        <InfoPanel 
            body={selectedBody} 
            onClose={() => setSelectedBody(null)} 
        />
      )}
      
      {/* Footer Credit */}
      <div className="absolute bottom-4 right-6 pointer-events-none opacity-30 text-[10px] text-white font-mono z-0">
        v1.2.0 • Powered by Google Gemini
      </div>
    </div>
  );
};

export default SolarSystemModule;
import React, { useEffect, useState } from 'react';
import { CelestialBody } from '../types';
import { fetchCelestialInfo } from '../services/geminiService';
import { X, Sparkles, Rocket, Loader2, Globe, Scale, Clock, RotateCw } from 'lucide-react';

interface InfoPanelProps {
  body: CelestialBody | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ body, onClose }) => {
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiContent, setAiContent] = useState<string>('');

  useEffect(() => {
    if (body) {
      setDescription(body.description);
      setAiContent(''); // Reset AI content
      
      const loadAiData = async () => {
        setLoading(true);
        const data = await fetchCelestialInfo(body);
        setAiContent(data);
        setLoading(false);
      };

      loadAiData();
    }
  }, [body]);

  if (!body) return null;

  return (
    <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[450px] bg-slate-900/90 backdrop-blur-lg border-l border-white/10 flex flex-col shadow-2xl transition-all duration-300 z-50 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden bg-black relative">
                 {body.textureUrl ? (
                    <img src={body.textureUrl} alt={body.name} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full" style={{ backgroundColor: body.color }}></div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40"></div>
            </div>
            <div>
                <h2 className="text-3xl font-display font-bold text-white leading-none">{body.name}</h2>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                  {body.type === 'star' ? '恒星' : body.type === 'planet' ? '行星' : '卫星'}
                </span>
            </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white cursor-pointer z-50"
        >
          <X size={24} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        
        {/* Physical Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1 hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Scale size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-bold">质量</span>
                </div>
                <p className="text-sm font-medium text-white break-words">{body.mass}</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1 hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Globe size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-bold">平均半径</span>
                </div>
                <p className="text-sm font-medium text-white">{body.realRadius}</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1 hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Clock size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-bold">公转周期</span>
                </div>
                <p className="text-sm font-medium text-white">
                    {body.period === 0 ? 'N/A' : `${body.period} 地球年`}
                </p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1 hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <RotateCw size={14} />
                    <span className="text-[10px] uppercase tracking-wider font-bold">自转周期</span>
                </div>
                <p className="text-sm font-medium text-white">{body.rotationPeriod}</p>
            </div>
        </div>

        {/* Moons Count Badge if applicable */}
        {(body.moons && body.moons.length > 0) && (
             <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/20 px-4 py-3 rounded-lg">
                <span className="text-indigo-200 text-sm font-medium">主要卫星</span>
                <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg shadow-indigo-500/20">{body.moons.length}</span>
             </div>
        )}

        {/* Description */}
        <div className="prose prose-invert prose-sm">
          <h3 className="text-slate-200 font-display text-lg mb-2">概览</h3>
          <p className="text-slate-400 leading-relaxed text-justify">
            {description}
          </p>
        </div>

        {/* AI Insight Section */}
        <div className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 p-5 rounded-xl border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-3 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Sparkles size={100} />
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-indigo-300">
                <Sparkles size={16} className="animate-pulse" />
                <h3 className="font-semibold text-xs uppercase tracking-widest">Gemini 智能百科</h3>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-6 space-y-3">
                    <Loader2 size={24} className="animate-spin text-indigo-400" />
                    <p className="text-xs text-indigo-300/70">正在分析天体数据...</p>
                </div>
            ) : (
                <p className="text-sm text-indigo-100/90 leading-relaxed font-light text-justify">
                    {aiContent}
                </p>
            )}
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 bg-slate-900/80">
        <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center gap-2 transition-all group hover:border-white/20 active:scale-95">
            <Rocket size={16} className="text-slate-400 group-hover:text-white transition-colors"/>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">交互模式 (即将推出)</span>
        </button>
      </div>
    </div>
  );
};

export default InfoPanel;
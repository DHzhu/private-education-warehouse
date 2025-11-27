import React, { useState } from 'react';
import { Telescope, Atom, Globe, Calculator, ArrowRight, Lock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

type Category = 'astronomy' | 'physics' | 'geography' | 'math';

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const categories = [
    {
      id: 'astronomy',
      name: '天文',
      icon: Telescope,
      color: 'from-indigo-500 to-purple-600',
      description: '探索宇宙的奥秘，从太阳系到深空星系。',
      apps: [
        { id: 'solar-system', name: 'Solaris Explorer', desc: '太阳系实时交互模拟', available: true },
        { id: 'star-map', name: '星座图谱', desc: '全天星图可视化 (开发中)', available: false }
      ]
    },
    {
      id: 'physics',
      name: '物理',
      icon: Atom,
      color: 'from-emerald-500 to-teal-600',
      description: '揭示物质与能量的法则，模拟力学与光学实验。',
      apps: [
        { id: 'mechanics', name: '经典力学实验室', desc: '碰撞与运动模拟', available: false },
        { id: 'optics', name: '光学棱镜', desc: '光的折射与反射', available: false }
      ]
    },
    {
      id: 'geography',
      name: '地理',
      icon: Globe,
      color: 'from-blue-500 to-cyan-600',
      description: '研究地球的构造、气候与自然现象。',
      apps: [
        { id: 'tectonics', name: '板块构造', desc: '地壳运动与地震模拟', available: false }
      ]
    },
    {
      id: 'math',
      name: '数学',
      icon: Calculator,
      color: 'from-pink-500 to-rose-600',
      description: '可视化抽象概念，探索几何与分形的魅力。',
      apps: [
        { id: 'fractals', name: '分形几何', desc: 'Mandelbrot 集探索', available: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
          科学视界
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          一个沉浸式的科学教育平台。选择感兴趣的学科，开启您的探索之旅。
        </p>
      </div>

      {/* Main Menu Grid */}
      <div className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <div 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`
                    relative p-6 rounded-2xl cursor-pointer transition-all duration-500 border
                    ${isActive 
                        ? 'bg-slate-900 border-white/20 shadow-2xl scale-105 z-10' 
                        : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10 hover:shadow-lg'
                    }
                `}
              >
                {/* Card Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 ${isActive ? 'opacity-10' : 'group-hover:opacity-5'} transition-opacity duration-500`}></div>

                {/* Icon & Title */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${cat.color} shadow-lg`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">{cat.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 h-10">{cat.description}</p>

                {/* Apps List (Visible when active) */}
                <div className={`space-y-3 transition-all duration-500 overflow-hidden ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="h-px w-full bg-white/10 my-4"></div>
                  <h4 className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-3">可用应用</h4>
                  
                  {cat.apps.map((app) => (
                    <button
                      key={app.id}
                      disabled={!app.available}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (app.available) onNavigate(app.id);
                      }}
                      className={`
                        w-full text-left p-3 rounded-lg flex items-center justify-between group/btn border border-transparent
                        ${app.available 
                            ? 'bg-white/5 hover:bg-white/10 hover:border-white/10 cursor-pointer' 
                            : 'bg-transparent opacity-50 cursor-not-allowed'
                        }
                      `}
                    >
                      <div>
                        <div className="font-medium text-sm text-slate-200 group-hover/btn:text-white transition-colors">
                            {app.name}
                        </div>
                        <div className="text-[10px] text-slate-500">{app.desc}</div>
                      </div>
                      {app.available ? (
                        <ArrowRight size={16} className="text-slate-500 group-hover/btn:text-white transition-colors" />
                      ) : (
                        <Lock size={14} className="text-slate-600" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Indicator if not active */}
                {!isActive && (
                    <div className="absolute bottom-6 right-6 text-slate-600">
                        <ArrowRight size={20} />
                    </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
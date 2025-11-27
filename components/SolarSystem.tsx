import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CelestialBody } from '../types';
import { SOLAR_SYSTEM_DATA } from '../constants';

interface SolarSystemProps {
  time: number;
  zoom: number;
  onBodySelect: (body: CelestialBody) => void;
  selectedBodyId: string | null;
}

// Factor to flatten tilted satellite orbits to simulate perspective
const FLATTEN_RATIO = 0.4;

const SolarSystem: React.FC<SolarSystemProps> = ({ time, zoom, onBodySelect, selectedBodyId }) => {
  // Initialize with window dimensions to prevent initial (0,0) render issue
  const [dimensions, setDimensions] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const dragDistanceRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately to ensure correct size
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Center coordinates
  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;

  // Render Stars Background
  const stars = useMemo(() => {
    const starCount = 300;
    return Array.from({ length: starCount }).map((_, i) => ({
      x: Math.random() * 4000 - 2000,
      y: Math.random() * 4000 - 2000,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2
    }));
  }, []);

  const calculatePosition = (orbitRadius: number, period: number, offsetTime: number) => {
    if (period === 0) return { x: 0, y: 0 }; // Sun
    const angle = (offsetTime / period) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * orbitRadius,
      y: Math.sin(angle) * orbitRadius
    };
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    lastMousePos.current = { x: clientX, y: clientY };
    dragDistanceRef.current = 0; // Reset drag distance
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    // Track total distance moved to distinguish click from drag
    dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);

    setPan(prev => ({
      x: prev.x + deltaX / zoom,
      y: prev.y + deltaY / zoom
    }));

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleBodyClick = (e: React.MouseEvent | React.TouchEvent, body: CelestialBody) => {
      // Only select if the drag distance was very small (a click)
      if (dragDistanceRef.current < 5) {
          e.stopPropagation();
          onBodySelect(body);
      }
  };

  // ViewBox Calculation to keep (0,0) [Sun] centered initially
  const viewBoxMinX = -cx / zoom - pan.x;
  const viewBoxMinY = -cy / zoom - pan.y;
  const viewBoxWidth = dimensions.width / zoom;
  const viewBoxHeight = dimensions.height / zoom;

  return (
    <div 
        ref={containerRef} 
        className={`w-full h-full relative overflow-hidden bg-slate-950 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`}
        className="absolute inset-0 block touch-none"
      >
        <g>
          {/* Stars */}
          {stars.map((star, i) => (
            <circle 
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.size / zoom}
              fill="white"
              opacity={star.opacity}
            />
          ))}

          {/* Orbits */}
          {SOLAR_SYSTEM_DATA.map((body) => {
            if (body.type === 'star') return null;
            return (
              <circle
                key={`orbit-${body.id}`}
                cx={0}
                cy={0}
                r={body.orbitRadius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={1 / zoom}
                strokeDasharray={body.id === selectedBodyId ? "0" : "4 4"}
              />
            );
          })}

          {/* Celestial Bodies */}
          {SOLAR_SYSTEM_DATA.map((body) => {
            const pos = calculatePosition(body.orbitRadius, body.period, time);
            const isSelected = selectedBodyId === body.id;
            
            // Apply axial tilt for specific planets
            // Saturn ~27deg, Earth ~23.5deg
            const tilt = body.id === 'saturn' ? 27 : (body.id === 'earth' ? 23 : 0);
            
            // Define ring gradient logic if body has rings (e.g. Saturn)
            const ringGradientId = `ring-gradient-${body.id}`;
            const hasRings = !!body.rings;
            
            // NOTE: We no longer render rings manually if the 'rings' property is missing.
            // This allows us to use an image that already contains rings for better realism.

            return (
              <g 
                key={body.id} 
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={(e) => handleBodyClick(e, body)}
                style={{ cursor: 'pointer' }}
              >
                {/* Definitions (Gradients/Clips) */}
                <defs>
                   <clipPath id={`clip-${body.id}`}>
                      <circle r={body.radius} cx="0" cy="0" />
                   </clipPath>
                   
                   {/* Ring Gradient for SVG Rings (if enabled in constants) */}
                   {hasRings && body.rings && (
                      <radialGradient 
                        id={ringGradientId} 
                        cx="0" cy="0" r={body.rings.outerRadius} 
                        gradientUnits="userSpaceOnUse" 
                        gradientTransform={`scale(1, ${FLATTEN_RATIO})`}
                      >
                         <stop offset={`${body.rings.innerRadius / body.rings.outerRadius}`} stopColor={body.rings.color} stopOpacity={body.rings.opacity} />
                         <stop offset="1.0" stopColor={body.rings.color} stopOpacity="0.0" />
                      </radialGradient>
                   )}
                </defs>

                {/* Selection Ring */}
                {isSelected && (
                  <circle
                    r={body.radius + 8 / zoom}
                    fill="none"
                    stroke="white"
                    strokeWidth={2 / zoom}
                    strokeOpacity={0.6}
                    className="animate-pulse"
                  />
                )}

                {/* Sun Glow */}
                {body.type === 'star' && (
                  <>
                     {/* Outer Atmosphere (Corona) - Large, slow pulse */}
                     <circle
                        r={body.radius * 4}
                        fill="url(#sun-corona)"
                        style={{ mixBlendMode: 'screen' }}
                     >
                        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="6s" repeatCount="indefinite" />
                        <animate attributeName="r" values={`${body.radius * 3.8};${body.radius * 4.2};${body.radius * 3.8}`} dur="8s" repeatCount="indefinite" />
                     </circle>

                     {/* Inner Core Glow - Intense, faster pulse */}
                     <circle
                        r={body.radius * 1.6}
                        fill="url(#sun-core)"
                        style={{ mixBlendMode: 'screen' }}
                     >
                        <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="r" values={`${body.radius * 1.5};${body.radius * 1.7};${body.radius * 1.5}`} dur="3s" repeatCount="indefinite" />
                     </circle>
                  </>
                )}
                
                {body.type === 'star' && (
                    <defs>
                        {/* Core Gradient: White-Hot Center to Yellow */}
                        <radialGradient id="sun-core">
                            <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.95"/>
                            <stop offset="60%" stopColor="#fcd34d" stopOpacity="0.5"/>
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                        </radialGradient>
                        
                        {/* Corona Gradient: Orange/Red Haze */}
                        <radialGradient id="sun-corona">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4"/>
                            <stop offset="40%" stopColor="#ea580c" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
                        </radialGradient>
                    </defs>
                )}

                {/* 
                  ROTATED GROUP
                  Groups the Planet Body and Moons so they share the same axial tilt.
                */}
                <g transform={`rotate(${tilt})`}>
                    
                    {/* Planet Body */}
                    {body.textureUrl ? (
                        <image 
                            href={body.textureUrl} 
                            x={-body.radius} 
                            y={-body.radius} 
                            width={body.radius * 2} 
                            height={body.radius * 2}
                            // Only clip if it's not a square image that needs to show rings outside the radius
                            // But here we generally treat the body radius as the image boundary for consistency
                            clipPath={`url(#clip-${body.id})`}
                            preserveAspectRatio="xMidYMid slice"
                        />
                    ) : (
                        <circle r={body.radius} fill={body.color} />
                    )}

                    {/* SVG Rings - Only rendered if defined in constants (Removed for Saturn now) */}
                    {hasRings && body.rings && (
                        <path
                            d={`M ${body.rings.outerRadius} 0 A ${body.rings.outerRadius} ${body.rings.outerRadius * FLATTEN_RATIO} 0 1 0 -${body.rings.outerRadius} 0 A ${body.rings.outerRadius} ${body.rings.outerRadius * FLATTEN_RATIO} 0 1 0 ${body.rings.outerRadius} 0
                               M ${body.rings.innerRadius} 0 A ${body.rings.innerRadius} ${body.rings.innerRadius * FLATTEN_RATIO} 0 1 0 -${body.rings.innerRadius} 0 A ${body.rings.innerRadius} ${body.rings.innerRadius * FLATTEN_RATIO} 0 1 0 ${body.rings.innerRadius} 0`}
                            fill={`url(#${ringGradientId})`}
                            fillRule="evenodd"
                        />
                    )}
                    
                    {/* Atmosphere/Shadow overlay for depth */}
                    <circle 
                        r={body.radius} 
                        fill="url(#sphere-shadow)" 
                        style={{ pointerEvents: 'none' }}
                    />

                    {/* Moons - Inside rotated group so they orbit the equator */}
                    {body.moons && body.moons.map((moon) => {
                        // For planets with tilted rings (Saturn), moons should orbit in the ring plane.
                        // The ring plane is flattened by FLATTEN_RATIO.
                        // So the moon's Y position must also be flattened.
                        
                        const angle = (time / moon.period) * 2 * Math.PI;
                        const moonX = Math.cos(angle) * moon.orbitRadius;
                        
                        // Apply flattening if parent is tilted (Saturn) to match the perspective
                        // We check the tilt variable directly or body.id
                        const effectiveYScale = tilt !== 0 ? FLATTEN_RATIO : 1.0; 
                        const moonY = Math.sin(angle) * moon.orbitRadius * effectiveYScale;

                        return (
                            <g 
                                key={moon.id} 
                                transform={`translate(${moonX}, ${moonY})`}
                                onClick={(e) => handleBodyClick(e, moon)}
                            >
                                {/* Moon Orbit Path */}
                                <ellipse
                                    rx={moon.orbitRadius}
                                    ry={moon.orbitRadius * effectiveYScale}
                                    cx={-moonX} 
                                    cy={-moonY}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.15)"
                                    strokeWidth={0.5 / zoom}
                                    style={{ pointerEvents: 'none' }}
                                />
                                
                                <defs>
                                    <clipPath id={`clip-${moon.id}`}>
                                        <circle r={moon.radius} cx="0" cy="0" />
                                    </clipPath>
                                </defs>
                                
                                {moon.textureUrl ? (
                                    <image 
                                        href={moon.textureUrl} 
                                        x={-moon.radius} 
                                        y={-moon.radius} 
                                        width={moon.radius * 2} 
                                        height={moon.radius * 2}
                                        clipPath={`url(#clip-${moon.id})`}
                                    />
                                ) : (
                                    <circle
                                        r={moon.radius}
                                        fill={moon.color}
                                    />
                                )}
                            </g>
                        )
                    })}
                </g>

                {/* Label (Outside rotation so it stays horizontal) */}
                <text
                  y={body.radius + (body.rings ? 25 : 12) / zoom + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={Math.max(10, 14 / zoom)}
                  opacity={0.9}
                  style={{ pointerEvents: 'none', userSelect: 'none', textShadow: '0px 2px 4px black' }}
                >
                  {body.name}
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Shared Sphere Shadow Gradient */}
        <defs>
            <radialGradient id="sphere-shadow" cx="30%" cy="30%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="80%" stopColor="black" stopOpacity="0.2" />
                <stop offset="100%" stopColor="black" stopOpacity="0.6" />
            </radialGradient>
        </defs>
      </svg>

      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.2)_100%)]"></div>
    </div>
  );
};

export default SolarSystem;
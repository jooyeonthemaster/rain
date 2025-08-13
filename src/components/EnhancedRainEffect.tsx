'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface RainDrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  size: number;
  speed: number;
}

interface Lightning {
  id: number;
  active: boolean;
  intensity: number;
}

interface Cloud {
  id: number;
  left: number;
  size: number;
  opacity: number;
  speed: number;
}

interface WindowDrop {
  id: number;
  left: number;
  height: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
}

interface RippleEffect {
  id: number;
  left: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
}

export default function EnhancedRainEffect() {
  const [isClient, setIsClient] = useState(false);
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [lightning, setLightning] = useState<Lightning>({ id: 0, active: false, intensity: 0 });
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [windowDrops, setWindowDrops] = useState<WindowDrop[]>([]);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [intensity, setIntensity] = useState<'light' | 'medium' | 'heavy'>('medium');

  // 클라이언트 측 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 빗방울 생성
  useEffect(() => {
    if (!isClient) return;
    
    const dropCount = intensity === 'light' ? 80 : intensity === 'medium' ? 120 : 200;
    const drops: RainDrop[] = [];

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 1 + (intensity === 'heavy' ? 1.5 : 2.5),
        animationDelay: Math.random() * 5,
        opacity: Math.random() * 0.4 + (intensity === 'heavy' ? 0.6 : 0.3),
        size: Math.random() * 2 + (intensity === 'heavy' ? 3 : 1),
        speed: Math.random() * 0.5 + 1,
      });
    }

    setRainDrops(drops);
  }, [intensity, isClient]);

  // 구름 생성
  useEffect(() => {
    if (!isClient) return;
    
    const cloudCount = 5;
    const newClouds: Cloud[] = [];

    for (let i = 0; i < cloudCount; i++) {
      newClouds.push({
        id: i,
        left: Math.random() * 120 - 10,
        size: Math.random() * 40 + 60,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 20 + 30,
      });
    }

    setClouds(newClouds);
  }, [isClient]);

  // 창문 빗방울 생성
  useEffect(() => {
    if (!isClient) return;
    
    const drops: WindowDrop[] = [];
    for (let i = 0; i < 15; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        height: Math.random() * 200 + 100,
        top: Math.random() * 50,
        animationDuration: Math.random() * 3 + 4,
        animationDelay: Math.random() * 2,
      });
    }
    setWindowDrops(drops);
  }, [isClient]);

  // 물방울 번짐 효과 생성
  useEffect(() => {
    if (!isClient) return;
    
    const rippleEffects: RippleEffect[] = [];
    for (let i = 0; i < 8; i++) {
      rippleEffects.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: Math.random() * 2 + 3,
        animationDelay: Math.random() * 5,
      });
    }
    setRipples(rippleEffects);
  }, [isClient]);

  // 번개 효과
  const triggerLightning = useCallback(() => {
    if (!isClient) return;
    
    if (Math.random() < 0.1) {
      setLightning({
        id: Date.now(),
        active: true,
        intensity: Math.random() * 0.8 + 0.2,
      });

      setTimeout(() => {
        setLightning(prev => ({ ...prev, active: false }));
      }, 150);

      // 두 번째 번개 (가끔)
      if (Math.random() < 0.3) {
        setTimeout(() => {
          setLightning({
            id: Date.now(),
            active: true,
            intensity: Math.random() * 0.6 + 0.1,
          });
          setTimeout(() => {
            setLightning(prev => ({ ...prev, active: false }));
          }, 100);
        }, 300);
      }
    }
  }, [isClient]);

  // 번개 트리거
  useEffect(() => {
    if (!isClient) return;
    
    const lightningInterval = setInterval(triggerLightning, 8000 + Math.random() * 15000);
    return () => clearInterval(lightningInterval);
  }, [triggerLightning, isClient]);

  // 강도 변화 (시간에 따라)
  useEffect(() => {
    if (!isClient) return;
    
    const intensityTimer = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.2) setIntensity('light');
      else if (rand < 0.7) setIntensity('medium');
      else setIntensity('heavy');
    }, 20000);

    return () => clearInterval(intensityTimer);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* 구름 레이어 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute -top-10 rounded-full bg-gradient-to-b from-gray-400 to-gray-600 blur-sm"
            style={{
              left: `${cloud.left}%`,
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              opacity: cloud.opacity,
              animation: `cloudMove ${cloud.speed}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* 빗방울 레이어 */}
      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute bg-gradient-to-b from-transparent via-blue-200 to-transparent rounded-full"
            style={{
              left: `${drop.left}%`,
              width: `${drop.size}px`,
              height: `${drop.size * 20}px`,
              animation: `rainDrop ${drop.animationDuration}s linear ${drop.animationDelay}s infinite`,
              opacity: drop.opacity,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* 창문 빗방울 효과 */}
      <div className="fixed inset-0 pointer-events-none z-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50 opacity-5" />
        {windowDrops.map((drop) => (
          <div
            key={`window-drop-${drop.id}`}
            className="absolute w-1 bg-gradient-to-b from-blue-300 to-transparent rounded-full opacity-30"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              top: `${drop.top}%`,
              animation: `windowDrop ${drop.animationDuration}s ease-in-out ${drop.animationDelay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* 물방울 번짐 효과 */}
      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={`ripple-${ripple.id}`}
            className="absolute rounded-full border border-blue-200 opacity-20"
            style={{
              left: `${ripple.left}%`,
              top: `${ripple.top}%`,
              animation: `rippleEffect ${ripple.animationDuration}s ease-out ${ripple.animationDelay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* 번개 효과 */}
      {lightning.active && (
        <div
          className="fixed inset-0 pointer-events-none z-50 bg-white mix-blend-screen"
          style={{
            opacity: lightning.intensity,
            animation: 'lightningFlash 0.1s ease-out',
          }}
        />
      )}

      {/* 폭우 오버레이 (강도가 높을 때) */}
      {intensity === 'heavy' && (
        <div className="fixed inset-0 pointer-events-none z-1 bg-gradient-to-b from-gray-900 via-transparent to-gray-800 opacity-20" />
      )}

      {/* CSS 애니메이션 정의 */}
      <style jsx>{`
        @keyframes cloudMove {
          from {
            transform: translateX(-100px);
          }
          to {
            transform: translateX(calc(100vw + 100px));
          }
        }

        @keyframes windowDrop {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes rippleEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        @keyframes lightningFlash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
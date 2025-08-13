'use client';

import React, { useEffect, useState, useRef } from 'react';

interface WindowDrop {
  id: number;
  x: number;
  y: number;
  speed: number;
  path: { x: number; y: number }[];
  life: number;
  maxLife: number;
}

export default function WindowRainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowDrops, setWindowDrops] = useState<WindowDrop[]>([]);
  const [isClient, setIsClient] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // 물방울 생성
    const createDrop = (): WindowDrop => ({
      id: Math.random(),
      x: Math.random() * canvas.width,
      y: -10,
      speed: Math.random() * 2 + 1,
      path: [],
      life: 0,
      maxLife: Math.random() * 200 + 100,
    });

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그라데이션 (창문 효과)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(135, 157, 195, 0.05)');
      gradient.addColorStop(0.5, 'rgba(135, 157, 195, 0.02)');
      gradient.addColorStop(1, 'rgba(135, 157, 195, 0.08)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 새로운 물방울 생성
      if (Math.random() < 0.1) {
        setWindowDrops(prev => [...prev.slice(-20), createDrop()]);
      }

      // 물방울 업데이트 및 그리기
      setWindowDrops(prev => 
        prev.map(drop => {
          // 위치 업데이트
          drop.y += drop.speed;
          drop.life++;

          // 지그재그 움직임
          drop.x += (Math.sin(drop.y * 0.01) * 0.5);

          // 경로 추가
          if (drop.path.length > 0) {
            const lastPoint = drop.path[drop.path.length - 1];
            if (Math.abs(lastPoint.x - drop.x) > 1 || Math.abs(lastPoint.y - drop.y) > 1) {
              drop.path.push({ x: drop.x, y: drop.y });
            }
          } else {
            drop.path.push({ x: drop.x, y: drop.y });
          }

          // 경로 길이 제한
          if (drop.path.length > 50) {
            drop.path.shift();
          }

          // 물방울 그리기
          ctx.strokeStyle = `rgba(184, 197, 214, ${0.6 * (1 - drop.life / drop.maxLife)})`;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';

          if (drop.path.length > 1) {
            ctx.beginPath();
            ctx.moveTo(drop.path[0].x, drop.path[0].y);
            
            for (let i = 1; i < drop.path.length; i++) {
              const opacity = (i / drop.path.length) * (1 - drop.life / drop.maxLife);
              ctx.strokeStyle = `rgba(184, 197, 214, ${opacity * 0.6})`;
              ctx.lineTo(drop.path[i].x, drop.path[i].y);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(drop.path[i].x, drop.path[i].y);
            }
          }

          // 물방울 머리 부분
          ctx.fillStyle = `rgba(184, 197, 214, ${0.8 * (1 - drop.life / drop.maxLife)})`;
          ctx.beginPath();
          ctx.ellipse(drop.x, drop.y, 1.5, 3, 0, 0, Math.PI * 2);
          ctx.fill();

          return drop;
        }).filter(drop => drop.y < canvas.height + 10 && drop.life < drop.maxLife)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'multiply'
      }}
    />
  );
}

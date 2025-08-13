'use client';

import React, { useEffect, useState } from 'react';

interface RainDrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
}

export default function RainEffect() {
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    const drops: RainDrop[] = [];
    const dropCount = 30;

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 2 + 3,
        animationDelay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }

    setRainDrops(drops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-[2px] h-[80px] bg-gradient-to-b from-transparent via-rain-light to-transparent"
          style={{
            left: `${drop.left}%`,
            animation: `rainDrop ${drop.animationDuration}s linear ${drop.animationDelay}s infinite`,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
}

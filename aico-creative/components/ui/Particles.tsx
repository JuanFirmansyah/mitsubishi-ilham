"use client";

import { useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
};

export default function Particles() {

  useEffect(() => {

    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
      });
    }

    const draw = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

  }, []);

  return (
    <canvas
      id="canvas"
      className="fixed inset-0 -z-10"
    />
  );
}
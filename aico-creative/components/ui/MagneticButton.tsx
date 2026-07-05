"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function MagneticButton({ children }: Props) {

  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {

    const rect = ref.current!.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current!.style.transform =
      `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const reset = () => {
    ref.current!.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="px-8 py-4 bg-yellow-400 text-black rounded-full font-semibold transition-transform"
    >
      {children}
    </button>
  );
}
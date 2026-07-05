"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor") as HTMLElement;

    document.addEventListener("mousemove", (e) => {
      cursor.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }, []);

  return (
    <div className="cursor fixed w-5 h-5 bg-yellow-400 rounded-full pointer-events-none mix-blend-difference z-50" />
  );
}
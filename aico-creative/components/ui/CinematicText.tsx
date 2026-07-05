"use client";

import { useEffect } from "react";
import gsap from "@/lib/gsap";

export default function CinematicText() {

  useEffect(() => {

    gsap.from(".cinematic", {

      y: 100,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",

    });

  }, []);

  return (
    <h1 className="cinematic text-7xl font-bold">
      Build Something Amazing
    </h1>
  );
}
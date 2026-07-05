"use client";

import { useEffect } from "react";
import gsap from "@/lib/gsap";

export default function Parallax() {

  useEffect(() => {

    gsap.to(".parallax", {
      y: 200,

      scrollTrigger: {
        trigger: ".parallax",
        start: "top bottom",
        scrub: true,
      },
    });

  }, []);

  return (
    <div className="h-200 flex items-center justify-center">

      <h2 className="text-7xl parallax">
        Creative Experience
      </h2>

    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {

  const ref = useRef(null);

  useEffect(() => {

    gsap.from(".project", {
      y: 100,
      opacity: 0,
      stagger: 0.2,

      scrollTrigger: {
        trigger: ref.current,
        start: "top 70%",
      },
    });

  }, []);

  return (
    <section ref={ref} className="p-24">

      <h2 className="text-6xl mb-16">Our Work</h2>

      <div className="grid grid-cols-3 gap-10">

        <div className="project h-80 bg-neutral-800 rounded-2xl"></div>
        <div className="project h-80 bg-neutral-800 rounded-2xl"></div>
        <div className="project h-80 bg-neutral-800 rounded-2xl"></div>

      </div>

    </section>
  );
}